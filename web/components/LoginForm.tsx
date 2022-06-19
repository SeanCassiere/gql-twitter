import React from "react";
import { useMutation } from "@apollo/client";

import { Field, Form, Formik } from "formik";
import * as yup from "yup";

import { useAuthContext } from "../context/authContext";
import { LoginFromFormMutation, LoginFromFormMutationVariables } from "../graphql/schema.generated";
import { LoginMutation } from "../graphql/mutations";

import FormButton from "./FormButton";
import { FormikTextInput } from "./FormTextInput";

interface Props {
	onSuccess?: () => void;
	onFail?: () => void;
}

const LoginForm: React.FC<Props> = (props) => {
	const { signIn } = useAuthContext();
	const [login] = useMutation<LoginFromFormMutation, LoginFromFormMutationVariables>(LoginMutation);

	return (
		<Formik
			initialValues={{ identifier: "", password: "" }}
			validationSchema={yup.object().shape({
				identifier: yup.string().required("Need your username or email"),
				password: yup.string().required("Need your password"),
			})}
			onSubmit={async (values, { setFieldError }) => {
				console.log(values);
				await login({
					variables: {
						input: values,
					},
				})
					.then((data) => {
						if (data.data?.userLogin?.accessToken) {
							signIn(data.data?.userLogin?.accessToken);
							if (props.onSuccess) {
								props.onSuccess();
							}
						}
					})
					.catch((error) => {
						if (
							error.message &&
							error.message?.toLowerCase().includes("invalid") &&
							error.message?.toLowerCase().includes("credentials")
						) {
							setFieldError("identifier", "Invalid email or password");
							setFieldError("password", "Invalid email or password");
						}
					});
			}}
			validateOnBlur={false}
		>
			{() => (
				<Form>
					<div className='flex flex-col space-y-3'>
						<Field name='identifier' type='text' placeholder='username or email' as={FormikTextInput} required />
						<Field name='password' type='password' placeholder='password' as={FormikTextInput} required />
					</div>

					<FormButton type='submit' className='bg-sky-600'>
						Sign In
					</FormButton>
				</Form>
			)}
		</Formik>
	);
};

export default LoginForm;
