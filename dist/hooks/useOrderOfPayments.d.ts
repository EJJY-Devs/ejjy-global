import { CamelCasedProperties } from 'type-fest';
import { Params } from '../services/OrderOfPaymentsService';
import { QueryResponse } from '../services/interfaces';
import { OrderOfPayment } from '../types';
import { UseListQuery } from './inteface';
declare const useOrderOfPayments: (data?: UseListQuery<OrderOfPayment, CamelCasedProperties<Params>>) => import("react-query").UseQueryResult<QueryResponse<OrderOfPayment>, Error>;
export default useOrderOfPayments;
