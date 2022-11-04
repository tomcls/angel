import { il8n } from './iln8';
export default class Translation {
    constructor(lang) {
        if(['en','fr','nl'].indexOf(lang)<0) {
            lang='en'
        }
        this.lang = lang;
    }
    get = (key) => {
       return il8n[key][this.lang];
    }
    setLang(lang) {
        this.lang = lang;
    }
}