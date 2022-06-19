import React from "react";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";

import { Form, Formik, Field } from "formik";
import * as yup from "yup";

import FormButton from "./FormButton";
import { FormikTextareaInput } from "./FormTextareaInput";

import { UserTimePostsQuery } from "../graphql/queries";
import { CreatePostFormMutation, CreatePostFormMutationVariables } from "../graphql/schema.generated";
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

	return (
		<Formik
			initialValues={{ body: "" }}
			validationSchema={yup.object().shape({
				body: yup.string().min(1, "Message is too short").max(MESSAGE_MAX_LENGTH, "Message is too long"),
			})}
			onSubmit={(values, { resetForm }) => {
				createPost({
					variables: {
						input: values,
					},
				})
					.then((res) => {
						if (props.onSuccess) {
							props.onSuccess();
						}
						resetForm();
					})
					.catch((e) => {
						if (props.onFail) {
							props.onFail();
						}
					})
					.finally(() => {});
			}}
		>
			{({ values }) => (
				<Form>
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
									<Field
										name='body'
										as={FormikTextareaInput}
										rows={3}
										className='p-2 w-full text-sm text-gray-900 dark:bg-slate-800 border rounded border-gray-50 dark:border-gray-600 placeholder:text-lg'
										placeholder="What's happening?"
										maxLength={MESSAGE_MAX_LENGTH}
										required
										id='body'
										style={{ resize: "none" }}
									/>
								</div>
								<div className='flex justify-between pt-1'>
									<span className='text-xs'>
										{values.body.length}/{MESSAGE_MAX_LENGTH}
									</span>
									<FormButton type='submit'>Post</FormButton>
								</div>
							</div>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default CreatePost;
