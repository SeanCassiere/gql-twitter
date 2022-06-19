import React from "react";
import { useField } from "formik";

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const FormTextInput = (props: InputProps) => {
	const { className, ...rest } = props;
	return <input {...rest} className={`rounded-md border-slate-400 dark:bg-slate-900 w-full ${className}`} />;
};

export const FormikTextInput = (props: InputProps & { label?: string }) => {
	const { label, ...rest } = props;
	const [_, meta] = useField(props.name || "");

	return (
		<>
			{label && (
				<label className='block text-sm text-gray-700' htmlFor={props.name}>
					{label}
				</label>
			)}
			<FormTextInput {...rest} />
			{meta.touched && meta.error && <div className='error'>{meta.error}</div>}
		</>
	);
};

export default FormTextInput;
