import { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { CamelCasedProperties } from 'type-fest';
import { UsersService } from '../services';
import { AuthenticateAnAction } from '../services/UsersService';
import { AxiosErrorResponse } from '../services/interfaces';
import { User } from '../types';

export const useUsersAuthenticate = () =>
	useMutation<
		AxiosResponse<User>,
		AxiosErrorResponse,
		CamelCasedProperties<AuthenticateAnAction>
	>(({ login, password, description }) =>
		UsersService.authenticateAnAction({
			login,
			password,
			description,
		}),
	);
