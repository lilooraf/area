import { IWatchAction } from '../WatchAction/IWatchAction';
import { IReaction } from '../Reaction/IReaction'

export interface IServiceFactory {
    createWatchAction(sevices: string): IWatchAction | undefined;
    createReaction(sevices: string): IReaction | undefined;
}