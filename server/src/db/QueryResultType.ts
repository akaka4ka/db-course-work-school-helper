import { Status } from './../Types/ResultType.js';

export interface QueryResultType<T> {
    readonly status: Status,
    readonly message: string,
    readonly data: T,
}
