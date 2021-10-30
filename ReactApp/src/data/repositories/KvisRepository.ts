import {IKvisRepository} from "./IKvisRepository";
import {Kvis} from "../../models/Kvis";
import {IKvisDao} from "../daos/IKvisDao";
import KvisDao from "../daos/KvisDao";

class KvisRepository implements IKvisRepository {

    private kvisDao : IKvisDao = new KvisDao();

    async addKvis(kvis: Kvis): Promise<boolean> {
        return Promise.resolve(false);
    }

    async deleteKvis(id: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    async getKvisses(): Promise<Kvis[]> {
        return Promise.resolve([]);
    }

    async getKvissesForUser(userId: string): Promise<Kvis[]> {
        return Promise.resolve([]);
    }

    async updateKvis(id: string, newKvis: Kvis): Promise<Kvis> {
        return Promise.resolve(new Kvis(""));
    }

}