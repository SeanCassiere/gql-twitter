import React from "react";
import { TextInput, Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@apollo/client";

import { RegisterFromFormMutation, RegisterFromFormMutationVariables } from "../graphql/schema.generated";
import { RegisterMutation } from "../graphql/mutations";

interface Props {
	onSuccess?: () => void;
	onFail?: () => void;
}

const RegisterForm = (props: Props) => {
	const [register] = useMutation<RegisterFromFormMutation, RegisterFromFormMutationVariables>(RegisterMutation);
	const form = useForm({
		initialValues: {
			email: "",
			fullName: "",
			username: "",
			password: "",
			confirmPassword: "",
		},

		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
			password: (value) => {
				if (value.length < 3 || value.length > 58) {
					return "must be between 3 and 58 characters";
				}
				return null;
			},
			confirmPassword: (value, values) => (value === values.password ? null : "Passwords do not match"),
		},
	});
	return (
		<form
			onSubmit={form.onSubmit(async (values) => {
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
								form.setFieldError("email", "Already is in use");
							}
							if (message.includes("username") && message.includes("unique")) {
								form.setFieldError("username", "Already taken");
							}
							if (message.includes("password")) {
								form.setFieldError("password", "Must be between 3 and 58 characters");
							}
							console.log(message);
						} else {
							console.log(e);
						}
					});
			})}
			autoComplete='off'
		>
			<div className='flex flex-col space-y-3'>
				<TextInput
					required
					label='Full Name'
					placeholder='John Doe'
					id='register-full-name'
					{...form.getInputProps("fullName")}
				/>

				<TextInput
					required
					label='Email'
					placeholder='your@email.com'
					id='register-email'
					{...form.getInputProps("email")}
				/>

				<TextInput
					required
					label='Username'
					placeholder='MyUsername'
					id='register-username'
					{...form.getInputProps("username")}
				/>

				<TextInput
					required
					label='Password'
					placeholder='A secure password'
					type='password'
					id='register-password'
					{...form.getInputProps("password")}
				/>

				<TextInput
					required
					label='Confirm Password'
					placeholder='Retype your password from above'
					type='password'
					id='register-confirm-password'
					{...form.getInputProps("confirmPassword")}
				/>
			</div>

			<Group position='left' mt='md'>
				<Button type='submit' className='bg-sky-600'>
					Sign Up
				</Button>
			</Group>
		</form>
	);
};

export default RegisterForm;
