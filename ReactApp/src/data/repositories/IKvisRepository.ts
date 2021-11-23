import {Kvis} from "../../models/Kvis";

export interface IKvisRepository {
    addKvis(kvis: Kvis): Promise<any>
    getKvisses(): Promise<Kvis[]>
    getKvissesForUser(userId: string): Promise<Kvis[]>
    updateKvis(id: string, newKvis: Kvis): Promise<Kvis>
    deleteKvis(id: string): Promise<boolean>
}