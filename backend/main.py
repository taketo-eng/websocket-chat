from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from router import websocket

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


app.include_router(websocket.router)
