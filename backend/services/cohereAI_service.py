import cohere
from typing import Optional


def split_into_paragraphs(text: str, max_length: int = 400) -> list[str]:
    """
    Splits a given text into paragraphs of specified max_length,
    ensuring that words are not cut in the middle.
    """
    paragraphs = []
    words = text.split()
    current_paragraph = []

    for word in words:
        # Check if adding the next word exceeds the max length
        if len(" ".join(current_paragraph + [word])) <= max_length:
            current_paragraph.append(word)
        else:
            # Save the current paragraph and start a new one
            paragraphs.append(" ".join(current_paragraph))
            current_paragraph = [word]

    # Add the last paragraph if there are remaining words
    if current_paragraph:
        paragraphs.append(" ".join(current_paragraph))

    return paragraphs


def process_transcript_with_cohere(
        transcript: str,
        prompt: str,
        cohere_api_key: str,
        model: Optional[str] = "command-xlarge-nightly",
        temperature: Optional[float] = 0.7,
        max_tokens: Optional[int] = 300,
) -> str:
    """
    Process the transcript using Cohere AI's generate API. The transcript is split into smaller chunks
    to avoid exceeding input length limits.

    Args:
        transcript (str): The text transcript to process.
        prompt (str): Instruction prompt for the AI model.
        cohere_api_key (str): Your Cohere API key.
        model (str): The Cohere model to use (default: "command-xlarge-nightly").
        temperature (float): Sampling temperature (default: 0.7).
        max_tokens (int): Maximum tokens for the response (default: 300).

    Returns:
        str: The processed output from Cohere AI.
    """
    # Initialize Cohere client
    co = cohere.Client(cohere_api_key)

    # Split the transcript into chunks of up to 400 characters
    paragraphs = split_into_paragraphs(transcript, max_length=400)

    # Store processed paragraphs
    processed_paragraphs = []

    for paragraph in paragraphs:
        # Create the full input prompt for each paragraph
        full_prompt = f"{prompt}\n\n{paragraph}"

        try:
            # Generate response for each chunk
            response = co.generate(
                model=model,
                prompt=full_prompt,
                max_tokens=max_tokens,
                temperature=temperature,
                stop_sequences=["\n"],
            )

            # Append the processed result for the current paragraph
            processed_paragraphs.append(response.generations[0].text.strip())

        except Exception as e:
            raise RuntimeError(f"Error while processing with Cohere: {str(e)}")

    # Combine the processed paragraphs into the final result
    return " ".join(processed_paragraphs)
