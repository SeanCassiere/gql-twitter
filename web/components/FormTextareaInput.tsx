import { useField } from "formik";
import React from "react";

type TextAreaInputProps = React.DetailedHTMLProps<
	React.TextareaHTMLAttributes<HTMLTextAreaElement>,
	HTMLTextAreaElement
>;

const FormTextareaInput = (props: TextAreaInputProps) => {
	return <textarea {...props} />;
};

export const FormikTextareaInput = (props: TextAreaInputProps) => {
	const [_, meta] = useField(props.name ?? "");
	return (
		<>
			<textarea {...props} />
			{meta.touched && meta.error && <div>{meta.error}</div>}
		</>
	);
};

export default FormTextareaInput;
