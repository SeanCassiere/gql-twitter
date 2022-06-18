import React from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "@mantine/form";
import Image from "next/image";
import Link from "next/link";

import { UserTimePostsQuery } from "../graphql/queries";
import { CreatePostFormMutation, CreatePostFormMutationVariables } from "../graphql/schema.generated";
import { FormButton } from "./FormComponents";
import { CreatePostMutation } from "../graphql/mutations";

const MESSAGE_MAX_LENGTH = 280;

interface Props {
	onSuccess?: () => void;
	onFail?: () => void;
}

const CreatePost: React.FC<Props> = (props) => {
	const [createPost] = useMutation<CreatePostFormMutation, CreatePostFormMutationVariables>(CreatePostMutation, {
		fetchPolicy: "network-only",
		refetchQueries: [{ query: UserTimePostsQuery }],
	});

	const form = useForm({
		initialValues: {
			body: "",
		},
		validate: {
			body: (value) => {
				if (value.length < 1 || value.length > MESSAGE_MAX_LENGTH) {
					return "must be between 1 and 280 characters";
				}
				return null;
			},
		},
	});
	return (
		<form
			onSubmit={form.onSubmit((values) => {
				console.log(values);
				createPost({
					variables: {
						input: values,
					},
				})
					.then((res) => {
						if (props.onSuccess) {
							props.onSuccess();
						}
						form.reset();
					})
					.catch((e) => {
						if (props.onFail) {
							props.onFail();
						}
					})
					.finally(() => {});
			})}
		>
			<div className='flex flex-row'>
				<div className='flex justify-center w-20'>
					<div className='mt-3 w-14 h-14 overflow-hidden rounded-full flex items-center justify-center relative'>
						<Link href='/'>
							<a>
								<Image
									src='https://icon-library.com/images/black-facebook-icon-png/black-facebook-icon-png-2.jpg'
									alt=''
									className='w-14 h-14 object-cover'
									layout='fill'
								/>
							</a>
						</Link>
					</div>
				</div>
				<div className='flex-1'>
					<div className='mt-3 px-2 pb-2 flex flex-col'>
						<div>
							<textarea
								rows={3}
								className='p-2 w-full text-sm text-gray-900 border rounded border-gray-50 bg-white placeholder:text-lg'
								placeholder="What's happening?"
								maxLength={MESSAGE_MAX_LENGTH}
								required
								id='body'
								style={{ resize: "none" }}
								{...form.getInputProps("body")}
							></textarea>
						</div>
						<div className='flex justify-between pt-1'>
							<span className='text-xs'>
								{form.values.body.length}/{MESSAGE_MAX_LENGTH}
							</span>
							<FormButton type='submit'>Post</FormButton>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

export default CreatePost;
