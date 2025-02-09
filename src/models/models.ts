export interface IScanDto {
    id: string,
    domain: string,
    status: ScanStatus,
    start_time: Date,
    end_time: Date | null,
}

export interface IScanWithDetailsDto extends IScanDto {
    logs: string[],
}

export enum ScanStatus {
    Processing = 'PROCESSING',
    Success = 'SUCCESS',
    Failed = 'FAILED',
    Terminated = 'TERMINATED',
}