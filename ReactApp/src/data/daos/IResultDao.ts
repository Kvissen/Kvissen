import {ResultDTO} from "../../models/Result";

export interface IResultDao {
    addResults(kvisResult: ResultDTO): Promise<ResultDTO>
}