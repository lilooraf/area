import { IReaction } from "../Reaction/IReaction";
import { IWatchAction } from "../WatchAction/IWatchAction";
import { IServiceFactory } from "./IServiceFactory";
import * as YoutubeActionImpl from "../WatchAction/Youtube";

export class Youtube implements IServiceFactory {
    public createWatchAction(sevices: string): IWatchAction | undefined {

        const list: Map<string, IWatchAction> = new Map([
            ['get_trending', new YoutubeActionImpl.GetTrending()]
        ]);

        const action: any = list.get(sevices);

        return action;
    }
    public createReaction(sevices: string): IReaction | undefined {
        return undefined;
    }
}