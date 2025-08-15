export interface ResponseDTO<T = any> {
    status: string;
    message: string;
    object?: T;
}
