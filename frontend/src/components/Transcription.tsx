import React, { useState } from "react";

const Transcription: React.FC = () => {
	const [url, setUrl] = useState<string>(""); // Define state as string
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
		<div style={{ padding: "20px", fontFamily: "Arial" }}>
			<h3>Youtube URL:</h3>
			<input
				type="text"
				value={url}
				onChange={(e) => setUrl(e.target.value)}
				placeholder="Enter YouTube URL"
				style={{ padding: "10px", width: "80%", backgroundColor: "#FFFF88" }}
			/>
			<button
				onClick={handleFetchTranscript}
				style={{
					padding: "10px",
					backgroundColor: "#D3D3D3",
					marginTop: "10px",
				}}
			>
				Transcript
			</button>
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
