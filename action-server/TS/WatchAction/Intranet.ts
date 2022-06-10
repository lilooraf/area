import { isEqual, isEmpty } from 'lodash';

import { IWatchAction } from "./IWatchAction";
import Firebase from '../Firebase/Firebase';
import * as api from '../ServicesApiRequests/Intranet';

export class getNewActivities implements IWatchAction {
    public async watchAction(userUid: string, infoAction: any, snapshotUid: any) {
        const firebase: any = new Firebase();
        const { access_token }: any = await firebase.getServiceAuthInfo(userUid, 'Intranet');
        const { success, data }: any = await api._check_new_activities(access_token, infoAction.start, infoAction.end);
        const activitiesSnapshot: any = await firebase.fetchSnapshot(snapshotUid);

        if (isEmpty(activitiesSnapshot)) {
            firebase.updateSnapshot(snapshotUid, data);
            return { success: false };
        }

        if (success && !isEqual(data, activitiesSnapshot.snapshot)) {
            firebase.updateSnapshot(snapshotUid, data);
            return { success: true, data };
        }

        return { success: false };
    }
}

export class getNewActivitiesRegister implements IWatchAction {
    public async watchAction(userUid: string, infoAction: any, snapshotUid: any) {
        const firebase: any = new Firebase();
        const { access_token }: any = await firebase.getServiceAuthInfo(userUid, 'Intranet');
        const { success, data }: any = await api._check_new_activities_register(access_token, infoAction.start, infoAction.end);
        const activitiesSnapshot: any = await firebase.fetchSnapshot(snapshotUid);

        if (isEmpty(activitiesSnapshot)) {
            firebase.updateSnapshot(snapshotUid, data);
            return { success: false };
        }

        if (success && !isEqual(data, activitiesSnapshot.snapshot)) {
            firebase.updateSnapshot(snapshotUid, data);
            return { success: true, data };
        }

        return { success: false };
    }
}

export class getNotification implements IWatchAction {
    public async watchAction(userUid: string, infoAction: any, snapshotUid: any) {
        const firebase: any = new Firebase();
        const { access_token }: any = await firebase.getServiceAuthInfo(userUid, 'Intranet');
        const { success, data }: any = await api.notificationCheck(access_token);
        const notificationSnapshot: any = await firebase.fetchSnapshot(snapshotUid);

        if (isEmpty(notificationSnapshot)) {
            firebase.updateSnapshot(snapshotUid, data);
            return { success: false };
        }

        if (success && !isEqual(data, notificationSnapshot.snapshot)) {
            firebase.updateSnapshot(snapshotUid, data);
            return { success: true, data };
        }

        return { success: false };
    }
}
