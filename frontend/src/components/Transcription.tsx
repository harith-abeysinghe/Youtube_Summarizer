import React, { useState } from "react";
import Button from "../ui-components/Button";
import InputField from "../ui-components/InputField";

const Transcription: React.FC = () => {
	const [url, setUrl] = useState<string>("");
	const [transcriptData, setTranscriptData] = useState<string | null>(null);

	const handleFetchTranscript = async () => {
		const videoId = url.split("v=")[1]; // Extract video ID from URL
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
		<div
		// style={ { padding: "20px", fontFamily: "Arial" } }
		>
			<div className="center-container">
				<InputField value={url} onChange={(e) => setUrl(e.target.value)} />
				<Button onClick={handleFetchTranscript}>Transcript</Button>
			</div>

			<div
				style={{
					backgroundColor: "#90EE90",
					padding: "20px",
					marginTop: "10px",
				}}
			>
				<p>{transcriptData || "Fetched data will appear here..."}</p>
			</div>
		</div>
	);
};

export default Transcription;
