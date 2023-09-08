"use strict";
// import { actions } from 'ducks/cashiering-assignments';
// import { request } from 'ejjy-global';
// import { useState } from 'react';
// import { modifiedExtraCallback } from 'utils';
// import { useActionDispatch } from './useActionDispatch';
// export const useCashieringAssignments = () => {
// 	// STATES
// 	const [status, setStatus] = useState<any>(request.NONE);
// 	const [errors, setErrors] = useState<any>([]);
// 	// Actions
// 	const listOfflineCashieringAssignmentsAction = useActionDispatch(
// 		actions.listOfflineCashieringAssignments,
// 	);
// 	// METHODS
// 	const reset = () => {
// 		setErrors([]);
// 		setStatus(request.NONE);
// 	};
// 	const listOfflineCashieringAssignments = (extraCallback = null) => {
// 		listOfflineCashieringAssignmentsAction({
// 			callback: modifiedExtraCallback(callback, extraCallback),
// 		});
// 	};
// 	const callback = ({
// 		status: responseStatus,
// 		errors: responseErrors = [],
// 	}) => {
// 		setStatus(responseStatus);
// 		setErrors(responseErrors);
// 	};
// 	return {
// 		listOfflineCashieringAssignments,
// 		status,
// 		errors,
// 		reset,
// 	};
// };
