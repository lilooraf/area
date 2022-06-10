import { IServiceFactory } from './Factory/IServiceFactory'
import { Spotify } from './Factory/Spotify';
import { Youtube } from './Factory/Youtube';
import { Intranet } from './Factory/Intranet';
import { MovieDB } from './Factory/MovieDB';
import { Microsoft } from './Factory/Microsoft';

export class Factories {
    private _factories: Map<string, IServiceFactory> = new Map([
        ['Spotify', new Spotify()],
        ['Youtube', new Youtube()],
        ['Intranet', new Intranet()],
        ['Moviedb', new MovieDB()],
        ['Microsoft', new Microsoft()]
    ]);

    public getFactories(): Map<string, IServiceFactory> {
        return this._factories;
    }
}