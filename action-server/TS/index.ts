import { Factories } from './Factories';
import { IServiceFactory } from './Factory/IServiceFactory';
import Firebase from './Firebase/Firebase'
import { IReaction } from './Reaction/IReaction';
import { IWatchAction } from './WatchAction/IWatchAction';

const firebase: Firebase = new Firebase();

const factories: Factories = new Factories();
const factoryList: Map<string, IServiceFactory> = factories.getFactories();

const actionServer = setInterval(async () => {
    const data = await firebase.fetchLinks();

    data.forEach(async (link: any) => {
        console.log('action application: ', link.trigger_app);
        console.log('reaction application: ', link.react_app);

        const action: IServiceFactory | undefined = factoryList.get(link.trigger_app);
        const reaction: IServiceFactory | undefined = factoryList.get(link.react_app);
        let reactionResponse: any = undefined;

        if (action) {
            var watchAction: IWatchAction | undefined = action.createWatchAction(link.trigger_action);

            if (watchAction)
                var actionResponse: any = await watchAction.watchAction(link.user, link.info_action, link.snapshot_uid);
            else {
                console.log('watch action was undefined');
                return;
            }

            if (reaction && actionResponse.success) {
                var _reaction: IReaction | undefined = reaction.createReaction(link.react_action);

                if (_reaction)
                    reactionResponse = await _reaction.doReaction(link.user, link.info_react); //? could use actionResponse
                else {
                    console.log('reaction was undefined');
                    return;
                }
            }
        }

        console.log(reactionResponse ? reactionResponse : 'reactionResponse could not be created (no changes)');
    });
}, 5000);
