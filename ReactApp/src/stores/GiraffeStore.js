import { observable, makeObservable } from 'mobx';


export default class GiraffeStore {
    giraffes = ["Marius","Melman"];

    constructor(){
    makeObservable(this, {
                giraffes: observable,
         });
    }
}





