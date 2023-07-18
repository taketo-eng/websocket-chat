from fastapi import WebSocket
from typing import List

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

