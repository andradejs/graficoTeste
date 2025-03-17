import { db } from "../../firebaseConfig";
import { collection, CollectionReference } from "firebase/firestore";

const irrigationAcess = collection(db, 'horta')


export async function getIrrigationsAcess(): Promise<CollectionReference> {

    return irrigationAcess;
}
