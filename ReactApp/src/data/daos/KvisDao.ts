import {IKvisDao} from "./IKvisDao";
import {Kvis} from "../../models/Kvis";

class KvisDao implements IKvisDao{

    private static _instance : KvisDao

    public static getInstance(): KvisDao{
        if (this._instance === null) {
            this._instance = new KvisDao()
        }
        return this._instance
    }

    addKvis(kvis: Kvis): Promise<boolean> {
        return Promise.resolve(false);
    }

    deleteKvis(id: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    getKvisses(): Promise<Kvis[]> {
        return Promise.resolve([]);
    }

    getKvissesForUser(userId: string): Promise<Kvis[]> {
        return Promise.resolve([]);
    }

    updateKvis(id: string, newKvis: Kvis): Promise<Kvis> {
        return Promise.resolve(new Kvis(""));
    }

}
export default KvisDao