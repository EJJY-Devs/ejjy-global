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

type PinFormValues = {
	pin: string;
	login: string;
	password: string;
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
	style?: React.CSSProperties;
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
	style,
	onSuccess,
	onCancel,
}: Props) => {
	const {
		mutateAsync: authenticateUser,
		isLoading: isAuthenticating,
		error: authenticateUserError,
	} = useUserAuthenticate(undefined, baseURL);

	// REFS
	const pinRef = useRef<InputRef | null>(null);

	// METHODS
	useEffect(() => {
		if (pinRef && pinRef.current) {
			setTimeout(() => {
				pinRef.current?.focus();
			}, 500);
		}
	}, [pinRef]);

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

	return (
		<Modal
			footer={null}
			title={title}
			centered
			closable
			open
			width={350}
			style={style}
			onCancel={onCancel}
		>
			<Formik<PinFormValues>
				key="pin"
				initialValues={pinFormDetails.defaultValues}
				validationSchema={pinFormDetails.schema}
				onSubmit={async (values, { setFieldError }) => {
					const response = await authenticateUser(values);

					if (response.status !== 200) {
						setFieldError('pin', 'Incorrect credentials.');
						return;
					}

					if (
						userTypes.length &&
						!userTypes.includes(String(response.data.user_type))
					) {
						setFieldError('pin', 'User is not allowed.');
						return;
					}

					onSuccess?.(response.data);
				}}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<Row gutter={[16, 16]}>
							<Col span={24}>
								<Typography.Text>PIN</Typography.Text>
								<Input.Password
									maxLength={6}
									placeholder="Enter PIN"
									size="middle"
									ref={pinRef}
									value={values.pin}
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
