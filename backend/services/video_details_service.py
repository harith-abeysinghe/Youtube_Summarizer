from googleapiclient.discovery import build
import isodate

def format_duration(duration: str) -> str:
    """
    Convert ISO 8601 duration into a readble format.
    :param duration: ISO 8601 duration string (e.g., PT1H2M3S).
    :return: Human-readable duration string (e.g., "1 hour(s) 2 minute(s) 3 second(s)").
    """
    try:
        parsed_duration = isodate.parse_duration(duration)

        # Extract hours, minutes, and seconds
        hours, remainder = divmod(parsed_duration.total_seconds(), 3600)
        minutes, seconds = divmod(remainder, 60)

        # Format into a readable string
        result = []
        if hours > 0:
            result.append(f"{int(hours)} hour(s)")
        if minutes > 0:
            result.append(f"{int(minutes)} minute(s)")
        if seconds > 0:
            result.append(f"{int(seconds)} second(s)")

        return " ".join(result)
    except Exception as e:
        return f"Error formatting duration: {e}"

def fetch_video_details(video_id: str, api_key: str):
    """
    Fetch YouTube video details such as title, duration, and thumbnail URL.

    :param video_id: The ID of the YouTube video.
    :param api_key: API key for accessing the YouTube Data API.
    :return: A dictionary with video details.
    :raises: Exception if the video is not found or if the API fails.
    """
    try:
        # Build the YouTube API client
        youtube = build("youtube", "v3", developerKey=api_key)

        # Request video details
        response = youtube.videos().list(
            part="snippet,contentDetails",
            id=video_id
        ).execute()

        if "items" not in response or len(response["items"]) == 0:
            raise Exception("Video not found")

        video_data = response["items"][0]
        snippet = video_data["snippet"]
        content_details = video_data["contentDetails"]

        # Extract details
        video_details = {
            "title": snippet["title"],
            "thumbnail_url": snippet["thumbnails"]["high"]["url"],
            "duration": format_duration(content_details["duration"])
        }

        return video_details
    except Exception as e:
        raise Exception(f"Failed to fetch video details: {str(e)}")
