import {inject, Factory} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

import {Result} from '../../models/result';

@inject(HttpClient)
export class ResultService {
    results = [];

    constructor(http) {
        this.http = http;
    }

    fetchResults(model, slug, date) {
       let url = 'results';

        if (model === 'race') {
            url += '/' + date;
        }

        url += '/' + slug;

        return this.http.fetch(url)
            .then(response => response.json())
    }

    load(model, slug, date) {
         return this.fetchResults(model, slug, date).then(results => {
            return results.map(data => {
                return new Result(data);
            });
        });
    }
   
    create(data) {
        return this.http.fetch('result', {
            method: 'post',
            // riderName, riderSlug, raceName, raceSlug, raceDate, result
            body: json(data) 
        }).then((response) => {
            return response.json();
        });
    }
}
