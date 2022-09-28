import { il8n } from './iln8';
export default class Translation {
    constructor(lang) {
        this.lang = lang;
    }
    get = (key) => {
       return il8n[key][this.lang];
    }
}