import {Kvis} from "../../models/Kvis";
import {KvisActivate} from "../../models/KvisActivate";

export interface IKvisRepository {
    addKvis(kvis: Kvis): Promise<boolean>
    getKvisses(): Promise<Kvis[]>
    getKvissesForUser(userId: string): Promise<Kvis[]>
    updateKvis(id: string, newKvis: Kvis): Promise<Kvis>
    deleteKvis(id: string): Promise<boolean>

    activeKvis(kvisActivate: KvisActivate): Promise<boolean>
    getActivatedKvis(findId: string): Promise<Kvis>
}