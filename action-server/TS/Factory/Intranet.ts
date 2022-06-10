import { IReaction } from "../Reaction/IReaction";
import { IWatchAction } from "../WatchAction/IWatchAction";
import { IServiceFactory } from "./IServiceFactory";
import * as IntranetActionImpl from "../WatchAction/Intranet";

export class Intranet implements IServiceFactory {
    public createWatchAction(sevices: string): IWatchAction {
        const list: Map<string, IWatchAction> = new Map([
            ['get_new_activities', new IntranetActionImpl.getNewActivities()],
            ['get_new_activities_register', new IntranetActionImpl.getNewActivitiesRegister()],
            ['get_notification', new IntranetActionImpl.getNotification()]
        ]);

        const action: any = list.get(sevices);
        return action;
    }

    public createReaction(sevices: string): IReaction | undefined {
        return undefined;
    }
}