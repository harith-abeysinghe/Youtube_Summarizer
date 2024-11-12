import { Editor } from "primereact/editor";
import React, { useEffect, useState } from "react";
import "../../styles/textEditor.css";

interface TextEditorProps {
	value: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ value }) => {
	const [content, setContent] = useState<string>(value);

	useEffect(() => {
		setContent(value);
	}, [value]);

	const handleContentChange = (e: any) => {
		setContent(e.htmlValue);
	};

	return (
		<div className="text-editor-container">
			<h3>Transcription</h3>
			<Editor
				value={content}
				onTextChange={handleContentChange}
				style={{ height: "200px" }}
			/>
			<p>Content Output:</p>
			<div className="output" dangerouslySetInnerHTML={{ __html: content }} />
		</div>
	);
};

export default TextEditor;
