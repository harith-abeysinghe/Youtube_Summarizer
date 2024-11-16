from youtube_transcript_api import YouTubeTranscriptApi, _errors


def fetch_transcript(video_id: str, language_codes: list[str] = ["en"]):
    """
    Fetch the transcript for a given YouTube video ID and language codes.

    :param video_id: The ID of the YouTube video.
    :param language_codes: List of language codes to fetch the transcript for.
    :return: Transcript data.
    :raises: Exception if no transcript is found or if transcripts are disabled.
    """
    try:
        transcript_data = YouTubeTranscriptApi.get_transcript(video_id, language_codes)
        return transcript_data
    except _errors.NoTranscriptFound:
        raise Exception("No transcripts found for the requested language.")
    except _errors.TranscriptsDisabled:
        raise Exception("Transcripts are disabled for this video.")
