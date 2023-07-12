from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import json
from typing import List

app = FastAPI()

origins = [
    'http://localhost:3000',
    'https://websocket-chat-two.vercel.app/'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, data, websocket: WebSocket, client_name:str = None):
        await websocket.send_json({
            'message': data['message'],
            'name': client_name,
            'sendTime': data['sendTime']
        })

    async def broadcast(self, data, websocket: WebSocket, client_name: str = None):

        for connection in self.active_connections:
            if websocket != connection:
                await connection.send_json({
                    'message': data['message'],
                    'name': client_name,
                    'sendTime': data['sendTime']
                })

manager = ConnectionManager()

@app.websocket('/ws/{client_name}')
async def websocket_endpoint(websocket: WebSocket, client_name: str):
    await manager.connect(websocket)
    try:
        while True:
            json_data = await websocket.receive_text()
            data = json.loads(json_data)
            if data['messageType'] == 'system':
                await manager.send_personal_message(data, websocket)
                await manager.broadcast(data, websocket)
            else:
                await manager.send_personal_message(data, websocket, client_name)
                await manager.broadcast(data, websocket, client_name)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast({"message": f'{client_name} left the room'})
    print('Bye Bye')
