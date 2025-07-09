export interface ResponseDTO<T = any> {
    status: number;
    message: string;
    object?: T;
}
