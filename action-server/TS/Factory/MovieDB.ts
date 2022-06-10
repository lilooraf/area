
import { IReaction } from "../Reaction/IReaction";
import { IWatchAction } from "../WatchAction/IWatchAction";
import { IServiceFactory } from "./IServiceFactory";
import * as MovieDBActionImpl from '../WatchAction/MovieDB';

export class MovieDB implements IServiceFactory {
    public createWatchAction(services: string): IWatchAction | undefined {
        const list: Map<string, IWatchAction> = new Map([
            ['get_trending', new MovieDBActionImpl.GetTrending()],
            ['get_review', new MovieDBActionImpl.GetReview()]
        ]);

        const action: any = list.get(services);
        return action;
    }

    public createReaction(services: string): IReaction | undefined {
        return undefined;
    }
}
