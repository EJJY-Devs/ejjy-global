export interface BranchTransfer {
    id: number;
    datetime_updated: string;
    to_be_uploaded: boolean;
    online_id?: number;
    datetime_created: string;
    online_transferred_by_id?: number;
    transferred_by?: number;
}
