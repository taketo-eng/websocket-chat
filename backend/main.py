from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import json

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

@app.websocket('/ws')
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        try:
            json_data = await websocket.receive_text()
            data = json.loads(json_data)
            print(data)
            await websocket.send_json(data)
        except Exception as e:
            print('error', e)
            break
    print('Bye Bye')
