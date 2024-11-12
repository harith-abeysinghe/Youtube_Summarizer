import React from "react";
import "../styles/inputField.css";

interface InputFieldProps {
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
	value,
	onChange,
	className = "input-field",
}) => {
	return (
		<input
			type="text"
			value={value}
			onChange={onChange}
			placeholder="Enter YouTube URL"
			className={className}
		/>
	);
};

export default InputField;
