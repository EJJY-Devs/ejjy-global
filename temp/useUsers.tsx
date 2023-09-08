import { actions } from 'ducks/users';
import { request } from 'ejjy-global';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { UsersService } from 'services';
import { modifiedExtraCallback } from 'utils';
import { useActionDispatch } from './useActionDispatch';

export const useUsers = () => {
	// STATES
	const [status, setStatus] = useState<any>(request.NONE);
	const [errors, setErrors] = useState<any>([]);

	// Actions
	const authenticateUserAction = useActionDispatch(actions.authenticateUser);
	const listOfflineUsersAction = useActionDispatch(actions.listOfflineUsers);

	// METHODS
	const reset = () => {
		setErrors([]);
		setStatus(request.NONE);
	};

	const authenticateUser = (data, extraCallback = null) => {
		authenticateUserAction({
			...data,
			callback: modifiedExtraCallback(callback, extraCallback),
		});
	};

	const listOfflineUsers = (extraCallback = null) => {
		listOfflineUsersAction({
			callback: modifiedExtraCallback(callback, extraCallback),
		});
	};

	const callback = ({
		status: responseStatus,
		errors: responseErrors = [],
	}) => {
		setStatus(responseStatus);
		setErrors(responseErrors);
	};

	return {
		authenticateUser,
		listOfflineUsers,
		status,
		errors,
		reset,
	};
};

export const useUsersAuthenticate = () =>
	useMutation<any, any, any>(({ login, password, description }: any) =>
		UsersService.authenticateAnAction({
			login,
			password,
			description,
		}),
	);
