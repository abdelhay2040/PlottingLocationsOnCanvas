import { Injectable } from '@angular/core';
import * as jsonData from "../assets/mydata.json"; // reading from the file 
import { HttpClient } from '@angular/common/http';
import { depot, landmark } from '../app/models/location';

@Injectable({
  providedIn: 'root',
})
export class DataReaderService {
  private _data = jsonData['default'];
  private _depotsList : depot[] = [];
  private _landmarksList : landmark[] = [];
  constructor(private http: HttpClient) {

      this.setDepots();
      this.setLandmarks();
 
  }

  private setDepots() {
    this._data['depots'].forEach((value) => {
      this._depotsList.push({
        x: value.x,
        y: value.y,
        size: value.size,
        label:value.label,
        metadata:value.metadata,
        canvas_x:0, //@refactor can canvas pramteres could be splited into another object 
        canvas_y:0,
        norm_size:0
      });
    });
  }

  public getDepots():depot[] {
    return this._depotsList;
  }

  private setLandmarks() {
    this._data['landmarks'].forEach((value) => {
      this._landmarksList.push({
        x: value.x,
        y: value.y,
        label:value.label,
        metadata:value.metadata,
        canvas_x:0,
        canvas_y:0
      });
    });
  }

  public getLandmarks():landmark[] {
    return this._landmarksList;
  }


}
