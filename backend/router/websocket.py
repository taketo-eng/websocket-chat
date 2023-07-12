from fastapi import APIRouter, WebSocket
import json

router = APIRouter(
    prefix='/ws'
)

@router.websocket('/')
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