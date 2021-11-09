import {Kvis} from "../../models/Kvis";

export interface IKvisDao {
    addKvis(kvis: Kvis): Promise<boolean>
    getKvisses(): Promise<Kvis[]>
    getKvissesForUser(userId: string): Promise<Kvis[]>
    updateKvis(id: string, newKvis: Kvis): Promise<Kvis>
    deleteKvis(id: string): Promise<boolean>
}