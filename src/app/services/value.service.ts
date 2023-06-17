import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValueService {

  private name = 'my value service';  

  constructor() { }


  getValue(){
    return this.name;
  }

  setValue(value: string){
    this.name = value;
  }

  getPromiseValue(){
    return Promise.resolve('Prommise value');
  }

  getObservableValue(){
    return of('Observable value')
  }
}
