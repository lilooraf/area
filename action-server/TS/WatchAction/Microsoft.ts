
import { isEqual, isEmpty } from 'lodash';

import { IWatchAction } from "./IWatchAction";
import Firebase from '../Firebase/Firebase';
import * as api from '../ServicesApiRequests/Microsoft';

export class GetMail implements IWatchAction {
    public async watchAction(userUid: string, infoAction: any, snapshotUid: any) {
        const firebase: any = new Firebase();
        const { access_token }: any = await firebase.getServiceAuthInfo(userUid, 'Microsoft');
        const { success, data }: any = await api.getMail(access_token);
        const mailSnapshot: any = await firebase.fetchSnapshot(snapshotUid);

        if (isEmpty(mailSnapshot)) {
            firebase.updateSnapshot(snapshotUid, data);
            return { success: false };
        }

        if (success && !isEqual(data, mailSnapshot.snapshot)) {
            firebase.updateSnapshot(snapshotUid, data);
            return { success: true, data };
        }

        return { success: false };
    }
}

export class GetEvents implements IWatchAction {
    public async watchAction(userUid: string, infoAction: any, snapshotUid: any) {
        const firebase: any = new Firebase();
        const { access_token }: any = await firebase.getServiceAuthInfo(userUid, 'Microsoft');
        const { success, data }: any = await api.getEvents(access_token);
        const eventSnapshot: any = await firebase.fetchSnapshot(snapshotUid);

        if (isEmpty(eventSnapshot)) {
            firebase.updateSnapshot(snapshotUid, data);
            return { success: false };
        }

        if (success && !isEqual(data, eventSnapshot.snapshot)) {
            firebase.updateSnapshot(snapshotUid, data);
            return { success: true, data };
        }

        return { success: false };
    }
}
