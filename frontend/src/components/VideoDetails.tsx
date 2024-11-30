import React, { useEffect, useState } from "react";
import "../styles/videoDetails.css";

interface VideoDetailsProps {
	url: string;
}

const VideoDetails: React.FC<VideoDetailsProps> = ({ url }) => {
	const [title, setTitle] = useState<string>("");
	const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
	const [duration, setDuration] = useState<string>("");

	useEffect(() => {
		const fetchVideoDetails = async () => {
			const videoId = url.split("v=")[1]; // Extract video ID from URL
			if (!videoId) {
				setTitle("Enter URL");
				return;
			}

			setTitle("");
			setThumbnailUrl("");
			setDuration("");

			try {
				const response = await fetch(
					`http://localhost:8000/video-details/?video_id=${videoId}`
				);
				if (!response.ok) throw new Error("Failed to fetch video details");

				const data = await response.json();
				setTitle(data.title);
				setThumbnailUrl(data.thumbnail_url);
				setDuration(data.duration);
			} catch (error) {
				setTitle("This video is not supported or has no details.");
			}
		};

		fetchVideoDetails();
	}, [url]);

	return (
		<div className="video-details">
			<img src={thumbnailUrl} alt={"Thumbnail"} className="video-thumbnail" />
			<div className="video-info">
				<h2 className="video-title">{title || "Loading..."}</h2>
				<p className="video-duration">Duration: {duration}</p>
			</div>
		</div>
	);
};

export default VideoDetails;
