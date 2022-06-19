import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

const primaryStyle = `
bg-sky-500 dark:bg-sky-700
hover:bg-sky-600 dark:hover:bg-sky-800
focus:bg-sky-600 dark:focus:bg-sky-800
focus:ring-sky-500 dark:focus:ring-sky-700
`;

const FormButton = (
	props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
		variant?: "primary" | "secondary";
	}
) => {
	const { children, className: classNameOverrides, variant, ...rest } = props;

	const currentVariant = !variant ? "primary" : variant;

	const variantStyle = currentVariant === "primary" ? primaryStyle : "bg-gray-500";

	return (
		<button
			{...rest}
			className={`px-3 py-1 rounded transition focus:ring ${variantStyle} text-gray-50 ${classNameOverrides}`}
		>
			{children}
		</button>
	);
};

export default FormButton;
