import {IKvisRepository} from "./IKvisRepository";
import {Kvis} from "../../models/Kvis";

class KvisRepository implements IKvisRepository {

    

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