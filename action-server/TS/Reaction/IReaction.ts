export interface IReaction {
    doReaction(userUid: string, resultOfTheAction: any): void;
}