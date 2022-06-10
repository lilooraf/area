
import { isEqual, isEmpty } from 'lodash';

import { IWatchAction } from "./IWatchAction";
import Firebase from '../Firebase/Firebase';
import * as api from '../ServicesApiRequests/Youtube';

export class GetTrending implements IWatchAction {
    public async watchAction(userUid: string, infoAction: any, snapshotUid: any) {
        const firebase: any = new Firebase();
        const { access_token }: any = await firebase.getServiceAuthInfo(userUid, 'Youtube');
        const { success, data }: any = await api.getTranding();
        const subscriptionsProfileSnapshot: any = await firebase.fetchSnapshot(snapshotUid);

        if (isEmpty(subscriptionsProfileSnapshot)) {
            firebase.updateSnapshot(snapshotUid, data);
            return { success: false };
        }

        if (success && !isEqual(data, subscriptionsProfileSnapshot.snapshot)) {
            firebase.updateSnapshot(snapshotUid, data);
            return { success: true, data };
        }

        return { success: false };
    }
}
