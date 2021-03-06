import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router, RouterConfiguration} from 'aurelia-router';

@inject(HttpClient)
export class App {
    router: Router;

    constructor(http) {
        this.http = http;
        this.http.configure(config => {
            config.withBaseUrl('http://localhost:8080/');
        });
    }

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'Wedstrijdrennerssysteem';
        config.map([{
            route: '',
            moduleId: 'routes/overview',
            title: 'Overzicht',
            redirect: 'wedstrijden'
        }, {
            route: 'renners',
            moduleId: 'routes/rider/riders',
            title: 'Renners',
            name: 'riders'
        }, {
            route: 'renner/:slug',
            name: 'rider',
            moduleId: 'routes/rider/details'
        }, {
            route: 'wedstrijden',
            name: 'races',
            moduleId: 'routes/race/races'
        }, {
            route: 'wedstrijd/:date/:slug',
            name: 'race',
            moduleId: 'routes/race/details'
        }, {
            route: 'wedstrijd/toevoegen',
            name: 'raceAdd',
            moduleId: 'routes/race/add'
        }, {
            route: 'resultaat/toevoegen/:date/:slug',
            name: 'resultAdd',
            moduleId: 'routes/result/add'
        }]);

        this.router = router;
    }
}
