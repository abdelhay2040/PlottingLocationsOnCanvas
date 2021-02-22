import { Component, OnInit } from '@angular/core';
import { CanvasController } from 'src/app/Controllers/canvas-controller';
import { depot, landmark } from 'src/app/models/location';
import { DataOrchestratorService } from 'src/services/data-orchestrator.service';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css'],
})
export class PlotComponent implements OnInit {
  constructor(private _dataOrchestratorService: DataOrchestratorService,private _canvasController :CanvasController) {}
   depotsList: depot[] = [];
  landmarksList: landmark[] = [];

  ngOnInit(): void {
    this.depotsList = this._dataOrchestratorService.getDepots();
    this.landmarksList = this._dataOrchestratorService.getLandmarks();

    var canvas = <HTMLCanvasElement>document.getElementById('c_canvas');
    this._canvasController.setCanvas(canvas);
    this._canvasController.adjust_canavas_width_and_height();
    this._canvasController.canvas_draw();
  }
}
