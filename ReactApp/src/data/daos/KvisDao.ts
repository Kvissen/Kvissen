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
        if (this._instance === null) {
            this._instance = new KvisDao();
        }
        return this._instance;
    }

    async addKvis(kvis: Kvis): Promise<boolean> {
        return await this.httpClient.request({
            method: 'POST',
            url: 'http://localhost:7777/kvis',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                kvis,
            }
        })
    }

    async deleteKvis(id: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    async getKvisses(): Promise<Kvis[]> {
        const response = await this.httpClient.request({
            method: 'GET',
            url: 'http://localhost:7777/kvisses'
        })

        if (response?.kvisses) {
            return response.kvisses
        }
        return Promise.resolve([]);
    }

    async getKvissesForUser(userId: string): Promise<Kvis[]> {
        return Promise.resolve([]);
    }

    async updateKvis(id: string, newKvis: Kvis): Promise<Kvis> {
        return Promise.resolve(new Kvis(""));
    }

}
export default KvisDao