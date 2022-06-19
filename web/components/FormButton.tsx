import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

const FormButton = (props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
	const { children, className: classNameOverrides, ...rest } = props;
	return (
		<button
			{...rest}
			className={`px-4 py-2 rounded transition bg-sky-500 hover:bg-sky-600 focus:bg-sky-600 focus:ring focus:ring-sky-500 text-gray-50 ${classNameOverrides}`}
		>
			{children}
		</button>
	);
};

export default FormButton;
