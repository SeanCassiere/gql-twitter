import React from "react";
import { useMutation } from "@apollo/client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";

import FormButton from "./FormButton";
import { FormikTextInput } from "./FormTextInput";

import { RegisterFromFormMutation, RegisterFromFormMutationVariables } from "../graphql/schema.generated";
import { RegisterMutation } from "../graphql/mutations";

interface Props {
	onSuccess?: () => void;
	onFail?: () => void;
}

const RegisterForm = (props: Props) => {
	const [register] = useMutation<RegisterFromFormMutation, RegisterFromFormMutationVariables>(RegisterMutation);

	return (
		<Formik
			initialValues={{ fullName: "", email: "", username: "", password: "", confirmPassword: "" }}
			validationSchema={yup.object().shape({
				username: yup.string().required("Need your username"),
				email: yup.string().email("Must be a valid email").required("Need your email"),
				password: yup.string().required("Need your password").required("Need your password"),
			})}
			onSubmit={async (values, { setFieldError }) => {
				const { confirmPassword, ...inputValues } = values;
				await register({
					variables: {
						input: inputValues,
					},
				})
					.then((res) => {
						if (res.data?.userCreate?.id) {
							if (props.onSuccess) {
								props.onSuccess();
							}
						}
					})
					.catch((e) => {
						if (e.message) {
							const message = e.message.toLowerCase();

							if (message.includes("email") && message.includes("unique constraint")) {
								console.log("here");
								setFieldError("email", "Already is in use");
							}
							if (message.includes("username") && message.includes("unique")) {
								setFieldError("username", "Already taken");
							}
							if (message.includes("password")) {
								setFieldError("password", "Must be between 3 and 58 characters");
							}
							console.log(message);
						} else {
							console.log(e);
						}
					});
			}}
		>
			{() => (
				<Form>
					<div className='flex flex-col space-y-3'>
						<Field name='fullName' type='text' placeholder='full name' as={FormikTextInput} required />

						<Field name='email' type='text' placeholder='email' as={FormikTextInput} required />

						<Field name='username' type='text' placeholder='username' as={FormikTextInput} required />

						<Field name='password' type='password' placeholder='password' as={FormikTextInput} required />

						<Field
							name='confirmPassword'
							type='password'
							placeholder='confirm password'
							as={FormikTextInput}
							required
						/>
					</div>

					<FormButton type='submit' className='bg-sky-600'>
						Sign Up
					</FormButton>
				</Form>
			)}
		</Formik>
	);
};

export default RegisterForm;
