import {IKvisDao} from "./IKvisDao";
import {Kvis} from "../../models/Kvis";
import {IHttpClient} from "../infrastructure/IHttpClient";
import HttpClient from "../infrastructure/HttpClient";
import {defaultJwtHeaders} from "../headers/urlHeaders";
import {KvisActivate} from "../../models/KvisActivate";

class KvisDao implements IKvisDao{

    private static _instance : KvisDao

    private httpClient : IHttpClient

    private constructor() {
        this.httpClient = new HttpClient();
    }

    public static getInstance(): KvisDao {
        if (this._instance == null) {
            this._instance = new KvisDao();
        }
        return this._instance;
    }

    // REST methods

    async addKvis(kvis: Kvis): Promise<boolean>{
        const url = process.env.REACT_APP_BASE_URL! + process.env.REACT_APP_API_CREATE_KVIS
        return await this.httpClient.request({
            method: 'POST',
            url: url,
            headers: defaultJwtHeaders(),
            body: kvis
        })
    }

    async deleteKvis(id: string): Promise<boolean> {
        // TODO: Implement me
        return Promise.resolve(false)
    }

    async getKvisses(): Promise<Kvis[]> {
        const url = process.env.REACT_APP_BASE_URL! + process.env.REACT_APP_API_GET_ALL_KVIS
        return await this.httpClient.request({
            method: 'GET',
            url: url,
            headers: defaultJwtHeaders()
        }).then(data => {
            return data as Kvis[];
        });
    }

    async getKvissesForUser(userId: string): Promise<Kvis[]> {
        const url = process.env.REACT_APP_BASE_URL! + process.env.REACT_APP_API_GET_KVIS_BY_USERID + "/" + userId
        return await this.httpClient.request({
            method: 'GET',
            headers: defaultJwtHeaders(), // Headers that allow access to play the game
            url: url
        }).then(data => {
            return data as Kvis[];
        });
    }

    async updateKvis(id: string, newKvis: Kvis): Promise<Kvis> {
        // TODO: Implement me
        return Promise.resolve(new Kvis(""))
    }

    async activateKvis(kvisActivate: KvisActivate): Promise<String> {
        const url = process.env.REACT_APP_BASE_URL! + process.env.REACT_APP_API_ACTIVATE_KVIS
        return await this.httpClient.request({
            method: 'PUT',
            url: url,
            headers: defaultJwtHeaders(),
            body: kvisActivate
        }).then(data => {
            return data
        })
    }

    async getActivatedKvis(findId: string): Promise<Kvis> {
        const url = process.env.REACT_APP_BASE_URL! + process.env.REACT_APP_API_ACTIVATE_KVIS + "/" + findId
        return await this.httpClient.request({
            method: 'GET',
            url: url,
            headers: defaultJwtHeaders()
        }).then(data => {
            return data as Kvis;
        });
    }

    async getActivatedKvisses(): Promise<KvisActivate[]> {
        const url = process.env.REACT_APP_BASE_URL! + process.env.REACT_APP_API_ACTIVATE_KVIS
        return await this.httpClient.request({
            method: 'GET',
            url: url,
            headers: defaultJwtHeaders()
        }).then(data => {
            return data
        });
    }

    async deactivateKvis(id: string): Promise<boolean> {
        const url = process.env.REACT_APP_BASE_URL! + process.env.REACT_APP_API_DEACTIVATE_KVIS + "/" + id;
        return await this.httpClient.request({
            method: 'PUT',
            url: url,
            headers: defaultJwtHeaders()
        }).then(data => {
            return data;
        });
    }



}
export default KvisDao