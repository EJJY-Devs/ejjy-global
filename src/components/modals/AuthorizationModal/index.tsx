import {
	Button,
	Col,
	Input,
	InputRef,
	Modal,
	Row,
	Space,
	Tooltip,
	Typography,
} from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { ErrorMessage, Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { useUserAuthenticate } from '../../../hooks';
import { User } from '../../../types';
import { convertIntoArray } from '../../../utils';
import { FieldError } from '../../elements';
import { RequestErrors } from '../../RequestErrors';

type PinFormValues = {
	pin: string;
	login: string;
	password: string;
	description: string;
	branchMachineId?: number;
	branchId?: number;
};

type UsernamePasswordFormValues = {
	login: string;
	password: string;
	pin: string;
	description: string;
	branchMachineId?: number;
	branchId?: number;
};

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
	const [usePin, setUsePin] = useState(true);

	const {
		mutateAsync: authenticateUser,
		isLoading: isAuthenticating,
		error: authenticateUserError,
	} = useUserAuthenticate(undefined, baseURL);

	// REFS
	const usernameRef = useRef<InputRef | null>(null);
	const pinRef = useRef<InputRef | null>(null);

	// METHODS
	useEffect(() => {
		if (usePin && pinRef && pinRef.current) {
			setTimeout(() => {
				pinRef.current?.focus();
			}, 500);
		} else if (!usePin && usernameRef && usernameRef.current) {
			setTimeout(() => {
				usernameRef.current?.focus();
			}, 500);
		}
	}, [usernameRef, pinRef, usePin]);

	const pinFormDetails = {
		defaultValues: {
			pin: '',
			login: '',
			password: '',
			description,
			branchMachineId,
			branchId,
		},
		schema: Yup.object().shape({
			pin: Yup.string()
				.required()
				.label('PIN')
				.min(4)
				.max(6)
				.matches(/^\d+$/, 'PIN must contain only numbers'),
		}),
	};

	const usernamePasswordFormDetails = {
		defaultValues: {
			login: '',
			password: '',
			pin: '',
			description,
			branchMachineId,
			branchId,
		},
		schema: Yup.object().shape({
			login: Yup.string().required().label('Username'),
			password: Yup.string().required().label('Password'),
		}),
	};

	const currentFormDetails = usePin
		? pinFormDetails
		: usernamePasswordFormDetails;

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
			<Formik<PinFormValues | UsernamePasswordFormValues>
				key={usePin ? 'pin' : 'username-password'}
				initialValues={currentFormDetails.defaultValues}
				validationSchema={currentFormDetails.schema}
				onSubmit={async (values, { setFieldError }) => {
					const response = await authenticateUser(values);

					if (response.status !== 200) {
						setFieldError(
							usePin ? 'pin' : 'password',
							'Incorrect credentials.',
						);
						return;
					}

					if (
						userTypes.length &&
						!userTypes.includes(String(response.data.user_type))
					) {
						setFieldError(usePin ? 'pin' : 'password', 'User is not allowed.');
						return;
					}

					onSuccess?.(response.data);
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<Row gutter={[16, 16]}>
							{usePin ? (
								<Col span={24}>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: '8px',
											marginBottom: '8px',
										}}
									>
										<Typography.Text>PIN</Typography.Text>
										<Tooltip title="Switch to Username/Password">
											<Button
												icon={<SyncOutlined />}
												size="small"
												style={{
													border: '1px solid #1890ff',
													color: '#1890ff',
													borderRadius: '4px',
												}}
												onClick={() => setUsePin(false)}
											/>
										</Tooltip>
									</div>
									<Input.Password
										maxLength={6}
										placeholder="Enter PIN"
										size="middle"
										ref={pinRef}
										value={'pin' in values ? values.pin : ''}
										onChange={(e) => {
											// Only allow numbers
											const value = e.target.value.replace(/\D/g, '');
											setFieldValue('pin', value);
										}}
									/>
									<ErrorMessage
										name="pin"
										render={(error) => <FieldError message={error} />}
									/>

									<RequestErrors
										errors={convertIntoArray(authenticateUserError?.errors)}
									/>
								</Col>
							) : (
								<>
									<Col span={24}>
										<div
											style={{
												display: 'flex',
												alignItems: 'center',
												gap: '8px',
												marginBottom: '8px',
											}}
										>
											<Typography.Text>Username</Typography.Text>
											<Tooltip title="Switch to PIN">
												<Button
													icon={<SyncOutlined />}
													size="small"
													style={{
														border: '1px solid #1890ff',
														color: '#1890ff',
														borderRadius: '4px',
													}}
													onClick={() => setUsePin(true)}
												/>
											</Tooltip>
										</div>
										<Input
											placeholder="Enter username"
											size="middle"
											ref={usernameRef}
											value={'login' in values ? values.login : ''}
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
											placeholder="Enter password"
											type="password"
											size="middle"
											value={'password' in values ? values.password : ''}
											onChange={(e) =>
												setFieldValue('password', e.target.value)
											}
										/>
										<ErrorMessage
											name="password"
											render={(error) => <FieldError message={error} />}
										/>

										<RequestErrors
											errors={convertIntoArray(authenticateUserError?.errors)}
										/>
									</Col>
								</>
							)}

							<Col span={24}>
								<Space className="w-full justify-end">
									<Button
										disabled={isAuthenticating}
										size="middle"
										onClick={onCancel}
									>
										Cancel
									</Button>
									<Button
										htmlType="submit"
										loading={isAuthenticating}
										type="primary"
										size="middle"
									>
										Authorize
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
