import { Injectable } from '@angular/core';

@Injectable({
    providedIn:'root'
})
export class AppService{
    _lang: string = 'en';

    LANGUAGES = [
        {code:"en", label_f:"English", label:"Eng"},
        {code:"fr", label_f:"French", label:"Fr"},
        {code:"es", label_f:"Spanish", label:"Sp"},
    ]



    constructor(){
       
    }

    setLanguages(lang:string){
        this.LANGUAGES = [
            {code:"en", label_f:"English", label:"Eng"},
            {code:"fr", label_f:"French", label:"Fr"},
            {code:"es", label_f:"Spanish", label:"Sp"},
        ]

        if(lang === 'fr'){
            this.LANGUAGES = [
                {code:"en", label_f:"Anglais", label:"Ang"},
                {code:"fr", label_f:"Français", label:"Fr"},
                {code:"es", label_f:"Espagnol", label:"Esp"},
            ]
           }else if(lang === 'es'){
            this.LANGUAGES = [
                {code:"en", label_f:"Inglés", label:"Ing"},
                {code:"fr", label_f:"Francés", label:"Fr"},
                {code:"es", label_f:"Español", label:"Esp"},
            ]
           }
    }


    setLang(lang: string){
        this._lang = lang
    }

    get lang(){
        return this._lang
    }

}