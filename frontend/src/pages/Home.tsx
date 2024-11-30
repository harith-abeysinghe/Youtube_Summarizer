import React, { useState } from "react";
import VideoDetails from "../components//VideoDetails";
import Transcription from "../components/Transcription";
import UrlInputField from "../components/UrlInputField";

const Home: React.FC = () => {
	const [url, setUrl] = useState<string>("");

	return (
		<div>
			<UrlInputField value={url} onChange={setUrl} />
			<VideoDetails url={url} />
			<Transcription url={url} />
		</div>
	);
};

export default Home;
