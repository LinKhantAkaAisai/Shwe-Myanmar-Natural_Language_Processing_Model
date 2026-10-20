from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.analysis import (
    router as analysis_router,
)


app = FastAPI(
    title="Shwe Myanmar API",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(analysis_router)


@app.get("/")
def root():
    return {
        "message": "Shwe Myanmar API is running"
    }