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
import { useUsersAuthenticate } from '../../../hooks';
import { FieldError } from '../../elements';

type Props = {
	title?: string;
	description?: string;
	userTypes?: string[];
	onSuccess: () => void;
	onCancel: () => void;
};

export const AuthorizationModal = ({
	title = 'Authorization',
	description = 'Authorize',
	userTypes = [],
	onSuccess,
	onCancel,
}: Props) => {
	const {
		mutateAsync: authenticateUser,
		isLoading: isAuthenticating,
		error: authenticateUserError,
	} = useUsersAuthenticate();

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
			title="Cashiering Details"
			centered
			closable
			open
			width={300}
			onCancel={onCancel}
		>
			<Formik
				initialValues={{
					login: '',
					password: '',
					description,
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
					}
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<Row gutter={[16, 16]}>
							<Col span={24}>
								<Typography.Text>Username</Typography.Text>
								<Input
									size="small"
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
									size="small"
									value={values['password']}
									onChange={(e) => setFieldValue('password', e.target.value)}
								/>
								<ErrorMessage
									name="password"
									render={(error) => <FieldError message={error} />}
								/>
							</Col>

							<Col span={24}>
								<Space className="w-full justify-center">
									<Button disabled={isAuthenticating} block size="small">
										Cancel
									</Button>
									<Button
										htmlType="submit"
										loading={isAuthenticating}
										type="primary"
										block
										size="small"
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
