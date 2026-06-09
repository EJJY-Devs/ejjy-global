export interface DiscountOption {
    id: number;
    online_id?: number;
    datetime_created: string;
    name: string;
    type: 'amount' | 'percentage';
    percentage?: string;
    additional_fields?: string;
    code?: string;
    is_vat_inclusive: boolean;
    is_special_discount: boolean;
}
