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
					<div className='flex flex-col space-y-4'>
						<div className='w-full flex-1'>
							<Field
								name='identifier'
								label='Username or Email'
								type='text'
								placeholder='username or email'
								as={FormikTextInput}
								required
							/>
						</div>
						<div className='w-full flex-1'>
							<Field
								name='password'
								label='Password'
								type='password'
								placeholder='password'
								as={FormikTextInput}
								required
							/>
						</div>

						<div className='min-w-12 flex-none'>
							<FormButton type='submit'>Sign In</FormButton>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default LoginForm;
