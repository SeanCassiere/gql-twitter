import React from "react";
import { useField } from "formik";

type TextAreaInputProps = React.DetailedHTMLProps<
	React.TextareaHTMLAttributes<HTMLTextAreaElement>,
	HTMLTextAreaElement
>;

const FormTextareaInput = (props: TextAreaInputProps) => {
	const { className, name, ...rest } = props;
	return <textarea name={name} {...rest} className={`dark:text-gray-100 ${className}`} />;
};

export const FormikTextareaInput = (props: TextAreaInputProps & { label?: "string" }) => {
	const { label, ...rest } = props;
	const [_, meta] = useField(props.name ?? "");

	return (
		<>
			{label && (
				<label className='block text-sm text-gray-700 dark:text-gray-300' htmlFor={props.name}>
					{label}
				</label>
			)}
			<FormTextareaInput {...rest} />
			{meta.touched && meta.error && <span className='text-sm text-red-500'>{meta.error}</span>}
		</>
	);
};

export default FormTextareaInput;
