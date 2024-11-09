from youtube_transcript_api import YouTubeTranscriptApi, _errors
# # url = "https://www.youtube.com/watch?v=mjsI9e4R1Tc"
# url = "https://www.youtube.com/watch?v=nF6wuaTg3wo"
# video_id = url.split("=")[1]
#
# def get_transcript(video_id, language_codes = ['en']):
#     try:
#         transcript_data = YouTubeTranscriptApi.get_transcript(video_id, language_codes)
#         for transcript in transcript_data:
#             print(transcript)
#     except _errors.NoTranscriptFound:(
#         print("No transcripts were found for any of the requested language codes: {}".format(language_codes)))
#
# try:
#     get_transcript(video_id)
# except _errors.TranscriptsDisabled:
#     print("This video is not supported.")
from fastapi import FastAPI, HTTPException
# from youtube_transcript_api import YouTubeTranscriptApi, _errors

app = FastAPI()

@app.get("/transcript/")
async def get_transcript(video_id: str, language_codes: str = "en"):
    try:
        transcript_data = YouTubeTranscriptApi.get_transcript(video_id, [language_codes])
        return {"transcript": transcript_data}
    except _errors.NoTranscriptFound:
        raise HTTPException(status_code=404, detail="No transcripts found for the requested language.")
    except _errors.TranscriptsDisabled:
        raise HTTPException(status_code=400, detail="Transcripts are disabled for this video.")
