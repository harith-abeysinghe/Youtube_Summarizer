from openai import OpenAI
import openai

def process_transcript_with_openai(transcript: str, prompt: str, api_key: str):
    client = OpenAI(
        api_key=api_key,  # This is the default and can be omitted
    )
    try:
        # Set the API key for OpenAI
        messages = [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": f"{prompt}\n\n{transcript}"}
        ]
        # Make a request to OpenAI's API for a chat completion (or other model endpoint)
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",  # You can choose the appropriate model here
            messages=messages
        )

        # Return the generated text as a summary
        return response['choices'][0]['text'].strip()  # Clean up response and return
    except Exception as e:
        raise Exception(f"OpenAI API Error: {str(e)}")
