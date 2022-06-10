
import { isEqual, isEmpty } from 'lodash';

import { IWatchAction } from "./IWatchAction";
import Firebase from '../Firebase/Firebase';
import * as api from '../ServicesApiRequests/MovieDB';

export class GetTrending implements IWatchAction {
    public async watchAction(userUid: string, infoAction: any, snapshotUid: any) {
        const firebase: any = new Firebase();
        const { success, data }: any = await api.getTrending();
        const trendingSnapshot: any = await firebase.fetchSnapshot(snapshotUid);

        if (isEmpty(trendingSnapshot)) {
            firebase.updateSnapshot(snapshotUid, data);
            return { success: false };
        }

        if (success && !isEqual(data, trendingSnapshot.snapshot)) {
            firebase.updateSnapshot(snapshotUid, data);
            return { success: true, data };
        }

        return { success: false };
    }
}

export class GetReview implements IWatchAction {
    public async watchAction(userUid: string, infoAction: any, snapshotUid: any) {
        const firebase: any = new Firebase();
        const { success, data }: any = await api.getReview(infoAction.film_id);
        const reviewSnapshot: any = await firebase.fetchSnapshot(snapshotUid);

        if (isEmpty(reviewSnapshot)) {
            firebase.updateSnapshot(snapshotUid, data);
            return { success: false };
        }

        if (success && !isEqual(data, reviewSnapshot.snapshot)) {
            firebase.updateSnapshot(snapshotUid, data);
            return { success: true, data };
        }

        return { success: false };
    }
}
