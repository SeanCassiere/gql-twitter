import React from "react";
import { useField } from "formik";

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const FormTextInput = (props: InputProps) => {
	const { className, ...rest } = props;
	return <input {...rest} className={`${className}`} />;
};

export const FormikTextInput = (props: InputProps) => {
	const [_, meta] = useField(props.name || "");

	return (
		<>
			<FormTextInput {...props} />
			{meta.touched && meta.error && <div className='error'>{meta.error}</div>}
		</>
	);
};

export default FormTextInput;
