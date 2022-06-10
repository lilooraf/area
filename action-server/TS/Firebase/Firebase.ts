import { getFirebase } from '../shared/firebase';


export default class Firebase {
    public async fetchLinks() {
        const firebase = getFirebase();
        const db = firebase.firestore();
        const documents = await db.collection('links').get();
        const links: any = [];

        documents.forEach(document => links.push(document.data()));
        return links;
    }

    public async getServiceAuthInfo(userUid: string, collection: string) {
        const firebase = getFirebase();
        const db = firebase.firestore();
        const userCollection = db.collection('users').doc(`user-${userUid}`);
        const authDocument = await userCollection.collection(collection).doc('auth').get();

        return authDocument.data();
    }

    public getUserAuthInfo() {
        return getFirebase().auth();
    }

    public async fetchSnapshot(snapshotUid: string) {
        const firebase = getFirebase();
        const db = firebase.firestore();
        const documents = await db.collection('snapshots').get();
        const snapshots: any[] = [];

        documents.forEach(document => { if (document.id === snapshotUid) snapshots.push(document.data()); });
        return snapshots[0];
    }

    public async updateSnapshot(snapshotUid: string, data: any) {
        const firebase = getFirebase();
        const db = firebase.firestore();

        const currentSnapshot: any = await this.fetchSnapshot(snapshotUid);
        currentSnapshot.snapshot = data;

        await db.collection('snapshots').doc(snapshotUid).update({ ...currentSnapshot });
    }
}
