export interface IRequestOption {
    readonly method: string;
    readonly url: string;
    readonly headers?: any;
    readonly body?: any;
}

export interface IHttpClient {
    request(requestOption: IRequestOption): Promise<any>;
}