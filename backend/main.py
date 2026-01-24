from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import composers, works, recordings

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://localhost:5173", # Vite default port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(composers.router, prefix="/api/composers", tags=["composers"])
app.include_router(works.router, prefix="/api/works", tags=["works"])
app.include_router(recordings.router, prefix="/api/recordings", tags=["recordings"])

@app.get("/")
def read_root():
    return {"message": "SML Backend is running"}
