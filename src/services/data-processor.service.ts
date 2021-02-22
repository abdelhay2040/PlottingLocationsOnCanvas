import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataProcessorService {

  constructor() { }


  
  public getMinFromList(array, filter)
  {
    return Math.min.apply(Math, array.map(function(o) { return o[filter]; }))
  }

  public getMaxFromList(array, filter)
  {
    return Math.max.apply(Math, array.map(function(o) { return o[filter]; }))
  }
}
