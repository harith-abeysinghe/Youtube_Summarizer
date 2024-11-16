from fastapi.middleware.cors import CORSMiddleware
# # url = "https://www.youtube.com/watch?v=mjsI9e4R1Tc"

from fastapi import FastAPI, HTTPException

from services.transcription_service import fetch_transcript
from services.video_details_service import fetch_video_details
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI()
# Allow cross-origin requests from your frontend (localhost:3000)
# Add CORS middleware to allow requests from localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from this origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

@app.get("/video-details/")
async def get_video_details(video_id: str):
    try:
        video_details = fetch_video_details(video_id, YOUTUBE_API_KEY)
        return video_details
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/transcript/")
async def get_transcript(video_id: str, language_codes: str = "en"):
    try:
        transcript_data = fetch_transcript(video_id, [language_codes])
        return {"transcript": transcript_data}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
