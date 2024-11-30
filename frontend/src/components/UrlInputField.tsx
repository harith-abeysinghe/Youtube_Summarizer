import React from "react";
import "../styles/urlInputField.css";

interface UrlInputFieldProps {
	value: string;
	onChange: (value: string) => void;
}

const UrlInputField: React.FC<UrlInputFieldProps> = ({ value, onChange }) => {
	return (
		<div className="center-container">
			<input
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder="Enter YouTube video URL"
				style={{ padding: "10px", width: "100%", boxSizing: "border-box" }}
			/>
		</div>
	);
};

export default UrlInputField;
