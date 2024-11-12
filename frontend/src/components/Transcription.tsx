import React, { useState } from "react";
import Button from "../ui-components/Button";
import InputField from "../ui-components/InputField";
import TextEditor from "../ui-components/text-editor/TextEditor";

const Transcription: React.FC = () => {
	const [url, setUrl] = useState<string>("");
	const [transcriptData, setTranscriptData] = useState<string | null>(null);

	const handleFetchTranscript = async () => {
		const videoId = url.split("v=")[1];
		try {
			const response = await fetch(
				`http://localhost:8000/transcript/?video_id=${videoId}&language_codes=en`
			);
			if (!response.ok) throw new Error("Failed to fetch transcript");

			const data = await response.json();
			setTranscriptData(
				data.transcript.map((item: { text: string }) => item.text).join(" ")
			);
		} catch (error) {
			setTranscriptData("This video is not supported or has no transcript.");
		}
	};

	return (
		<div>
			<div className="center-container">
				<InputField value={url} onChange={(e) => setUrl(e.target.value)} />
				<Button onClick={handleFetchTranscript}>Transcript</Button>
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
