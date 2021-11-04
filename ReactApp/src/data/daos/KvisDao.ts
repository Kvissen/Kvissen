import {IKvisDao} from "./IKvisDao";
import {Kvis} from "../../models/Kvis";
import {IHttpClient} from "../infrastructure/IHttpClient";
import HttpClient from "../infrastructure/HttpClient";

class KvisDao implements IKvisDao{

    private static _instance : KvisDao

    private httpClient : IHttpClient

    private constructor() {
        this.httpClient = new HttpClient();
    }

    public static getInstance(): KvisDao{
        if (this._instance == null) {
            this._instance = new KvisDao();
        }
        return this._instance;
    }

    async addKvis(kvis: Kvis): Promise<boolean> {
        const url = process.env.REACT_APP_BASE_URL! + process.env.REACT_APP_API_CREATE_KVIS
        return await this.httpClient.request({
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                kvis,
            }
        })
    }

    async deleteKvis(id: string): Promise<boolean> {
        return await this.httpClient.request({
            method: 'DELETE',
            url: 'http://localhost:7777/kvis/' + id
        })
    }

    async getKvisses(): Promise<Kvis[]> {
        const url = process.env.REACT_APP_BASE_URL! + process.env.REACT_APP_API_GET_ALL_KVIS
        return await this.httpClient.request({
            method: 'GET',
            url: url
        }).then(data => {
            return data as Kvis[];
        });
    }

    async getKvissesForUser(userId: string): Promise<Kvis[]> {
        const response = await this.httpClient.request({
            method: 'GET',
            url: 'http://localhost:7777/kvisses/' + userId
        })

        if (response?.kvisses) {
            return response.kvisses
        }
        // Empty array if no kvisses were found
        return Promise.resolve([]);
    }

    async updateKvis(id: string, newKvis: Kvis): Promise<Kvis> {
        return await this.httpClient.request({
            method: 'PUT',
            url: 'http://localhost:7777/kvis/' + id,
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                newKvis,
            }
        })
    }

}
export default KvisDao