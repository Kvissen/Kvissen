import {IHttpClient, IRequestOption} from "./IHttpClient";

class HttpClient implements IHttpClient {

    request(requestOption: IRequestOption): Promise<any> {
        const option: RequestInit = { method: requestOption.method }

        if(requestOption?.headers) option.headers = new Headers(requestOption.headers)
        if(requestOption?.body) option.body = JSON.stringify(requestOption.body)

        return fetch(requestOption.url, option)
            .then(res => {
                if (res.status == 201){
                    return true
                } else {
                    return res.json()
                }
            })
            .catch((e) => console.log(e))
    }

}

export default HttpClient