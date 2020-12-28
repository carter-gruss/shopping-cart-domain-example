export declare type DataAccessStatus = 'success' | 'failure';
export interface DeleteDataResult {
    affected: number | null;
    status: DataAccessStatus;
}
