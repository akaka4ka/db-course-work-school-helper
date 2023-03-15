export enum Status {
    SUCCESS,
    FAILURE,
}

export interface ResultType<T> {
    readonly status: Status,
    readonly message: string,
    readonly data: T,
}
