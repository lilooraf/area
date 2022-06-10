
import { IReaction } from "./IReaction";
import Firebase from '../Firebase/Firebase';
import * as api from '../ServicesApiRequests/Microsoft';

export class SendMail implements IReaction {
    public async doReaction(userUid: string, resultOfTheAction: any) {
        const firebase: any = new Firebase();
        const { access_token }: any = await firebase.getServiceAuthInfo(userUid, 'Microsoft');

        return api.sendMail(access_token, resultOfTheAction.receiver, resultOfTheAction.subject, resultOfTheAction.message);
    }
}

export class CreateEvent implements IReaction {
    public async doReaction(userUid: string, resultOfTheAction: any) {
        const firebase: any = new Firebase();
        const { access_token }: any = await firebase.getServiceAuthInfo(userUid, 'Microsoft');

        return api.createEvent(access_token, resultOfTheAction.content, resultOfTheAction.start, resultOfTheAction.end, resultOfTheAction.subject);
    }
}

export class CreateNote implements IReaction {
    public async doReaction(userUid: string, resultOfTheAction: any) {
        const firebase: any = new Firebase();
        const { access_token }: any = await firebase.getServiceAuthInfo(userUid, 'Microsoft');

        return api.createNote(access_token, resultOfTheAction.name);
    }
}
