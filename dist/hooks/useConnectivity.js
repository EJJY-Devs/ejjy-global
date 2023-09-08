"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNetwork = void 0;
const antd_1 = require("antd");
const ejjy_global_1 = require("ejjy-global");
const helper_1 = require("hooks/helper");
const react_1 = require("react");
const react_query_1 = require("react-query");
const services_1 = require("services");
const utils_1 = require("utils");
const serverUrl = (0, utils_1.getBranchServerUrl)();
const branchMachineId = Number((0, utils_1.getBranchMachineId)());
const useConnectivity = () => {
    const [isEnabled, setIsEnabled] = (0, react_1.useState)(false);
    const [isConnected, setIsConnected] = (0, react_1.useState)(null);
    const isConnectedRef = (0, react_1.useRef)(null);
    (0, react_query_1.useQuery)(['useConnectivity', isEnabled], () => (0, helper_1.wrapServiceWithCatch)(services_1.SiteSettingsService.get(serverUrl)), {
        enabled: isEnabled,
        refetchInterval: 5000,
        select: (query) => query.data,
        onSettled: (_data, error) => {
            const isConnectedNew = !error;
            if (isConnectedRef.current !== isConnectedNew) {
                services_1.ConnectivityLogsService.create({
                    branch_machine_id: branchMachineId,
                    type: isConnectedNew
                        ? ejjy_global_1.connectivityTypes.OFFLINE_TO_ONLINE
                        : ejjy_global_1.connectivityTypes.ONLINE_TO_OFFLINE,
                });
            }
            isConnectedRef.current = isConnectedNew;
            setIsConnected(isConnectedNew);
        },
    });
    (0, react_1.useEffect)(() => {
        if (serverUrl) {
            setIsEnabled(true);
        }
        else {
            antd_1.message.warning('Please set a Branch Server URL in the app settings.');
        }
    }, []);
    return { isConnected };
};
const useNetwork = ({ options }) => (0, react_query_1.useQuery)(['useNetwork'], () => services_1.SiteSettingsService.get(services_1.LOCAL_API_URL), options);
exports.useNetwork = useNetwork;
exports.default = useConnectivity;
