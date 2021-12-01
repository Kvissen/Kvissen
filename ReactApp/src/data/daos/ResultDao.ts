import {IHttpClient} from "../infrastructure/IHttpClient";
import HttpClient from "../infrastructure/HttpClient";
import {defaultJwtHeaders} from "../headers/urlHeaders";
import {ResultDTO} from "../../models/Result";
import {IResultDao} from "./IResultDao";

class ResultDao implements IResultDao {

    private static _instance: ResultDao

    private httpClient: IHttpClient

    private constructor() {
        this.httpClient = new HttpClient();
    }

    public static getInstance(): ResultDao {
        if (this._instance == null) {
            this._instance = new ResultDao();
        }
        return this._instance;
    }

    // REST methods

    // Store results after the quiz, before displaying results.
    // Argument: a resultDto without ID and result values,
    // Returns: Promise of finished resultDto from server
    async addResults(kvisResult: ResultDTO): Promise<ResultDTO> {
        const url = process.env.REACT_APP_BASE_URL! + process.env.REACT_APP_API_CREATE_RESULT
        return await this.httpClient.request({
            method: 'POST',
            url: url,
            headers: defaultJwtHeaders(),
            body: kvisResult
        }).then((result) => {
            // Debug log
            console.log("ResultDao.addResults: " + result)

            return this.httpClient.request({
                method: 'GET',
                url: result, // Use the returned url from the PUT operation
                headers: defaultJwtHeaders(),
            })
        })
    }
}

export default ResultDao