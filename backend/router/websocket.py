from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import json

from utils import gpt_translator, websocket


router = APIRouter(
    prefix="/ws"
)

manager = websocket.ConnectionManager()

@router.websocket('/{client_name}')
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
                if data['isTranslate']:
                    print(data['message'])
                    print(data['toLang'])
                    data['message'] = gpt_translator.translate(data['message'], data['toLang'])

                await manager.send_personal_message(data, websocket, client_name)
                await manager.broadcast(data, websocket, client_name)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast({"message": f'{client_name} left the room'})
    print('Bye Bye')