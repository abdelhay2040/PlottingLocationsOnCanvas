import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { depot, landmark } from 'src/app/models/location';
import { DataProcessorService } from './data-processor.service';
import { DataReaderService } from './data-reader.service';

@Injectable({
  providedIn: 'root',
})
export class DataOrchestratorService implements OnInit {
  constructor(
    private _dataReaderService: DataReaderService,
    private _dataProcessorService: DataProcessorService
  ) {
    this.ngOnInit();
  }
  ngOnInit(): void {}

  public getDepots(): depot[] {
    return this._dataReaderService.getDepots();
  }

  public getLandmarks(): landmark[] {
    return this._dataReaderService.getLandmarks();
  }

  public getMinFromAllLists(filter) {
    //Refactor could be move to the dataProcessor take a list of locations
    let minOfDepots = this._dataProcessorService.getMinFromList(
      this.getDepots(),
      filter
    );
    let minOfLandmarks = this._dataProcessorService.getMinFromList(
      this.getLandmarks(),
      filter
    );
    return Math.min(minOfDepots, minOfLandmarks);
  }

  public getMinSizeOfDepots() {
    // refactor could be only one function to git min that take list at least have one elemnt
    let minOfDepots = this._dataProcessorService.getMinFromList(
      this.getDepots(),
      'size'
    );
    return minOfDepots;
  }

  public getMaxFromAllLists(filter) {
    //Refactor
    let maxOfDepots = this._dataProcessorService.getMaxFromList(
      this.getDepots(),
      filter
    );
    let maxOfLandmarks = this._dataProcessorService.getMaxFromList(
      this.getLandmarks(),
      filter
    );
    return Math.max(maxOfDepots, maxOfLandmarks);
  }

  public getMaxSizeOfDepots() {
    let maxOfDepots = this._dataProcessorService.getMaxFromList(
      this.getDepots(),
      'size'
    );
    return maxOfDepots;
  }
}
