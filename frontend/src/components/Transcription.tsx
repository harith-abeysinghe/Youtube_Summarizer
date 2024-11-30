import React, { useState } from "react";
import Button from "../ui-components/Button";
import TextEditor from "../ui-components/text-editor/TextEditor";

interface TranscriptionProps {
	url: string;
}

const Transcription: React.FC<TranscriptionProps> = ({ url }) => {
	const [transcriptData, setTranscriptData] = useState<string | null>(null);
	console.log("URL", url);
	const handleFetchTranscript = async () => {
		const videoId = url.split("v=")[1]; // Extract video ID from URL
		console.log(videoId);
		setTranscriptData(null); // Clear previous transcript data

		try {
			const response = await fetch(
				`http://localhost:8000/transcript/?video_id=${videoId}&language_codes=en`
			);
			if (!response.ok) throw new Error("Failed to fetch transcript");

			const data = await response.json();
			setTranscriptData(
				data.transcript.map((item: { text: string }) => item.text).join(" ")
			); // Combine transcript texts
		} catch (error) {
			setTranscriptData("This video is not supported or has no transcript.");
		}
	};

	return (
		<div>
			<div className="center-container">
				<Button onClick={handleFetchTranscript}>Fetch Transcript</Button>
			</div>

			<div className="editor-container">
				<TextEditor
					value={transcriptData || "Fetched data will appear here..."}
				/>
			</div>
		</div>
	);
};

export default Transcription;
