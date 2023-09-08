import { message } from 'antd';
import { connectivityTypes } from 'ejjy-global';
import { wrapServiceWithCatch } from 'hooks/helper';
import { UseListQuery } from 'hooks/inteface';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import {
	ConnectivityLogsService,
	LOCAL_API_URL,
	SiteSettingsService,
} from 'services';
import { getBranchMachineId, getBranchServerUrl } from 'utils';

const serverUrl = getBranchServerUrl();
const branchMachineId = Number(getBranchMachineId());

const useConnectivity = () => {
	const [isEnabled, setIsEnabled] = useState(false);
	const [isConnected, setIsConnected] = useState(null);
	const isConnectedRef = useRef(null);

	useQuery(
		['useConnectivity', isEnabled],
		() => wrapServiceWithCatch(SiteSettingsService.get(serverUrl)),
		{
			enabled: isEnabled,
			refetchInterval: 5000,
			select: (query) => query.data,
			onSettled: (_data, error) => {
				const isConnectedNew = !error;

				if (isConnectedRef.current !== isConnectedNew) {
					ConnectivityLogsService.create({
						branch_machine_id: branchMachineId,
						type: isConnectedNew
							? connectivityTypes.OFFLINE_TO_ONLINE
							: connectivityTypes.ONLINE_TO_OFFLINE,
					});
				}

				isConnectedRef.current = isConnectedNew;
				setIsConnected(isConnectedNew);
			},
		},
	);

	useEffect(() => {
		if (serverUrl) {
			setIsEnabled(true);
		} else {
			message.warning('Please set a Branch Server URL in the app settings.');
		}
	}, []);

	return { isConnected };
};

export const useNetwork = ({ options }: UseListQuery) =>
	useQuery<any>(
		['useNetwork'],
		() => SiteSettingsService.get(LOCAL_API_URL),
		options,
	);

export default useConnectivity;
