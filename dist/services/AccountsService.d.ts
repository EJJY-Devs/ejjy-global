import { ServiceType } from '../globals/enums';
import { Account } from '../types';
import { ListQueryParams, ListResponseData } from './interfaces';
export interface Params extends ListQueryParams {
    account_code?: string;
    type?: string;
    with_credit_registration?: boolean;
    with_supplier_registration?: boolean;
}
interface Modify {
    biodata_image?: string;
    birthday: string;
    business_address?: string;
    business_name?: string;
    civil_status?: string;
    contact_number: string;
    email_address?: string;
    father_name?: string;
    first_name: string;
    gender: string;
    home_address: string;
    is_point_system_eligible: boolean;
    last_name: string;
    middle_name?: string;
    mother_maiden_name?: string;
    nationality?: string;
    place_of_birth?: string;
    religion?: string;
    tin: string;
    type: string;
}
interface RedeemPoints {
    redeemed_points: number;
    redeem_authorizer_id: number;
    redeem_remarks: string;
}
declare const service: {
    list: (params: Params, baseURL?: string, serviceType?: ServiceType) => Promise<ListResponseData<Account>>;
    retrieve: (id: number, baseURL?: string) => Promise<Account>;
    create: (body: Modify, baseURL: string) => Promise<import("axios").AxiosResponse<any>>;
    edit: (id: number, body: Modify, baseURL: string) => Promise<import("axios").AxiosResponse<any>>;
    redeemPoints: (id: number, body: RedeemPoints, baseURL: string) => Promise<import("axios").AxiosResponse<any>>;
};
export default service;
