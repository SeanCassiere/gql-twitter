import React from "react";
import { TextInput, Group, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { gql, useMutation } from "@apollo/client";
import { useAuthContext } from "../context/authContext";
import { LoginFromFormMutation, LoginFromFormMutationVariables } from "../graphql/schema.generated";

interface Props {
	onSuccess?: () => void;
}

const LoginMutation = gql`
	mutation LoginFromForm($input: LoginUserInput!) {
		userLogin(input: $input) {
			accessToken
		}
	}
`;

const LoginForm: React.FC<Props> = (props) => {
	const { signIn } = useAuthContext();
	const [login] = useMutation<LoginFromFormMutation, LoginFromFormMutationVariables>(LoginMutation);

	const form = useForm({
		initialValues: {
			identifier: "",
			password: "",
		},

		validate: {
			// identifier: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
		},
	});

	return (
		<form
			onSubmit={form.onSubmit(async (values) => {
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
							form.setFieldError("identifier", "Invalid email or password");
							form.setFieldError("password", "Invalid email or password");
						}
					});
			})}
			autoComplete='off'
		>
			<div className='flex flex-col space-y-3'>
				<TextInput
					required
					label='Username or Email'
					placeholder='Your username or email'
					id='identifier'
					type='text'
					{...form.getInputProps("identifier")}
				/>

				<TextInput
					required
					label='Password'
					placeholder='Your super secret password'
					id='password'
					type='password'
					{...form.getInputProps("password")}
				/>
			</div>

			<Group position='left' mt='md'>
				<Button type='submit' className='bg-sky-600'>
					Sign In
				</Button>
			</Group>
		</form>
	);
};

export default LoginForm;
