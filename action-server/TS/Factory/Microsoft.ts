
import { IReaction } from "../Reaction/IReaction";
import { IWatchAction } from "../WatchAction/IWatchAction";
import { IServiceFactory } from "./IServiceFactory";
import * as MicrosoftActionImpl from '../WatchAction/Microsoft';
import * as MicrosoftReactionImpl from '../Reaction/Microsoft';

export class Microsoft implements IServiceFactory {
    public createWatchAction(services: string): IWatchAction | undefined {
        const list: Map<string, IWatchAction> = new Map([
            ['get_mail', new MicrosoftActionImpl.GetMail()],
            ['get_events', new MicrosoftActionImpl.GetEvents()]
        ]);

        const action: any = list.get(services);
        return action;
    }

    public createReaction(services: string): IReaction | undefined {
        const list: Map<string, IReaction> = new Map([
            ['send_mail', new MicrosoftReactionImpl.SendMail()],
            ['create_note', new MicrosoftReactionImpl.CreateNote()],
            ['create_event', new MicrosoftReactionImpl.CreateEvent()]
        ]);

        const reaction: any = list.get(services);
        return reaction;
    }
}
