import {
	Button,
	Col,
	Input,
	InputRef,
	Modal,
	Row,
	Space,
	Typography,
} from 'antd';
import { ErrorMessage, Form, Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import * as Yup from 'yup';
import { useUserAuthenticate } from '../../../hooks';
import { User } from '../../../types';
import { convertIntoArray } from '../../../utils';
import { FieldError } from '../../elements';
import { RequestErrors } from '../../RequestErrors';

export type Props = {
	baseURL?: string;
	title?: string;
	description?: string;
	userTypes?: string[];
	branchMachineId?: number;
	branchId?: number;
	onSuccess?: (user: User) => void;
	onCancel?: () => void;
};

export const AuthorizationModal = ({
	baseURL,
	title = 'Authorization',
	description = 'Authorize',
	branchMachineId,
	branchId,
	userTypes = [],
	onSuccess,
	onCancel,
}: Props) => {
	const {
		mutateAsync: authenticateUser,
		isLoading: isAuthenticating,
		error: authenticateUserError,
	} = useUserAuthenticate(undefined, baseURL);

	// REFS
	const usernameRef = useRef<InputRef | null>(null);

	// METHODS
	useEffect(() => {
		if (usernameRef && usernameRef.current) {
			setTimeout(() => {
				usernameRef.current?.focus();
			}, 500);
		}
	}, [usernameRef]);

	return (
		<Modal
			footer={null}
			title={title}
			centered
			closable
			open
			width={350}
			onCancel={onCancel}
		>
			<Formik
				initialValues={{
					login: '',
					password: '',
					description,
					branchMachineId,
					branchId,
				}}
				validationSchema={Yup.object().shape({
					login: Yup.string().required().label('Username'),
					password: Yup.string().required().label('Password'),
				})}
				onSubmit={async (values, { setFieldError }) => {
					const response = await authenticateUser(values);

					if (response.status !== 200) {
						setFieldError('password', 'Incorrect username or password.');
						return;
					}

					if (
						userTypes.length &&
						!userTypes.includes(String(response.data.user_type))
					) {
						setFieldError('password', 'User is not allowed.');
						return;
					}

					onSuccess?.(response.data);
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<Row gutter={[16, 16]}>
							<Col span={24}>
								<Typography.Text>Username</Typography.Text>
								<Input
									size="middle"
									ref={usernameRef}
									value={values['login']}
									onChange={(e) => setFieldValue('login', e.target.value)}
								/>
								<ErrorMessage
									name="login"
									render={(error) => <FieldError message={error} />}
								/>
							</Col>

							<Col span={24}>
								<Typography.Text>Password</Typography.Text>
								<Input.Password
									type="password"
									size="middle"
									value={values['password']}
									onChange={(e) => setFieldValue('password', e.target.value)}
								/>
								<ErrorMessage
									name="password"
									render={(error) => <FieldError message={error} />}
								/>

								<RequestErrors
									errors={convertIntoArray(authenticateUserError?.errors)}
								/>
							</Col>

							<Col span={24}>
								<Space className="w-full justify-center">
									<Button
										disabled={isAuthenticating}
										block
										size="middle"
										onClick={onCancel}
									>
										Cancel
									</Button>
									<Button
										htmlType="submit"
										loading={isAuthenticating}
										type="primary"
										block
										size="middle"
									>
										Submit
									</Button>
								</Space>
							</Col>
						</Row>
					</Form>
				)}
			</Formik>
		</Modal>
	);
};
