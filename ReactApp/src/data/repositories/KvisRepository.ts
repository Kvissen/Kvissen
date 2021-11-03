import {IKvisRepository} from "./IKvisRepository";
import {Kvis} from "../../models/Kvis";
import {IKvisDao} from "../daos/IKvisDao";
import KvisDao from "../daos/KvisDao";

export class KvisRepository implements IKvisRepository {

    private static _instance : KvisRepository
    private kvisDao : IKvisDao;



    constructor() {
        this.kvisDao = new KvisDao();
    }

    public static getInstance(): KvisRepository {
        if (this._instance === null) {
            this._instance = new KvisRepository();
        }
        return this._instance;
    }

    async addKvis(kvis: Kvis): Promise<boolean> {
        return await this.kvisDao.addKvis(kvis);
    }

    async deleteKvis(id: string): Promise<boolean> {
        return await this.kvisDao.deleteKvis(id);
    }

    async getKvisses(): Promise<Kvis[]> {
        return await this.kvisDao.getKvisses();
    }

    async getKvissesForUser(userId: string): Promise<Kvis[]> {
        return await this.kvisDao.getKvissesForUser(userId);
    }

    async updateKvis(id: string, newKvis: Kvis): Promise<Kvis> {
        return await this.kvisDao.updateKvis(id,newKvis);
    }

}