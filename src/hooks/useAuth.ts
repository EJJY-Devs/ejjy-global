import { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { AuthService } from '../services';
import { Login } from '../services/AuthService';
import { AxiosErrorResponse } from '../services/interfaces';
import { User } from '../types';

export const useAuthLogin = () =>
	useMutation<
		AxiosResponse<User>,
		AxiosErrorResponse,
		CamelCasedProperties<Login>
	>(({ login, password }) =>
		AuthService.login({
			login,
			password,
		}),
	);
