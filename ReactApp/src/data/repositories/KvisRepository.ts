import {IKvisRepository} from "./IKvisRepository";
import {Kvis} from "../../models/Kvis";
import {IKvisDao} from "../daos/IKvisDao";
import KvisDao from "../daos/KvisDao";

class KvisRepository implements IKvisRepository {

    private kvisDao : IKvisDao = KvisDao.getInstance();

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