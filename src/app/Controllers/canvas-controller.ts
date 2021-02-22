import { Injectable } from '@angular/core';
import { DataOrchestratorService } from 'src/services/data-orchestrator.service';
import { depot, landmark } from '../models/location';
@Injectable({
  providedIn: 'root',
})
export class CanvasController {
  default_canvas_width = 500;
  default_canavas_height = 500;
  canvas_width = 500;
  canavas_height = 500;
  private _min_x;
  private _max_x;
  private _min_y;
  private _max_y;
  private _min_size;
  private _max_size;
  private _size_enlarge_factor = 20;
  private _scaling_factor = 3;
  private _landmark_img_width = 10;
  private _landmark_img_height = 20;

  private _depotsList: depot[] = [];
  private _landmarksList: landmark[] = [];
  private _canvas;
  private _canvas_context;
  constructor(private _dataOrchestratorService: DataOrchestratorService) {
    this.initilize();
    this.translate_locations();
    this.calc_canavas_width_and_height();
  }

  initilize() {
    this._depotsList = this._dataOrchestratorService.getDepots();
    this._landmarksList = this._dataOrchestratorService.getLandmarks();

    this._min_x = this._dataOrchestratorService.getMinFromAllLists('x'); //refactor
    this._max_x = this._dataOrchestratorService.getMaxFromAllLists('x');
    this._min_y = this._dataOrchestratorService.getMinFromAllLists('y');
    this._max_y = this._dataOrchestratorService.getMaxFromAllLists('y');
    this._min_size = this._dataOrchestratorService.getMinSizeOfDepots();
    this._max_size = this._dataOrchestratorService.getMaxSizeOfDepots();
  }

  setCanvas(canvas) {
    this._canvas = canvas;
    this._canvas_context = this._canvas.getContext('2d');
  }

  adjust_canavas_width_and_height() {
    this._canvas.width = this.canvas_width + this._size_enlarge_factor;
    this._canvas.height = this.canavas_height + this._size_enlarge_factor;

    //flip cooridnates
    this._canvas_context.translate(
      0,
      this._canvas.height - this._size_enlarge_factor
    );
  }

  calc_canavas_width_and_height() {
    this.canvas_width =
      this._max_x - this._min_x > this.default_canvas_width
        ? this._max_x - this._min_x
        : this.default_canvas_width;
    this.canavas_height =
      this._max_y - this._min_y > this.default_canavas_height
        ? this._max_y - this._min_y
        : this.default_canavas_height;
  }

  translate_locations() {
    let move_all_x_by = 0 - this._min_x;
    let move_all_y_by = 0 - this._min_y;

    //update plot_wise_data coordinates and normalize size
    for (let i = 0; i < this._depotsList.length; i++) {
      this._depotsList[i].canvas_x = this._depotsList[i].x + move_all_x_by;
      this._depotsList[i].canvas_y = this._depotsList[i].y + move_all_y_by;
      this._depotsList[i].norm_size =
        (this._depotsList[i].size - this._min_size) /
        (this._max_size - this._min_size);
    }
    for (let i = 0; i < this._landmarksList.length; i++) {
      this._landmarksList[i].canvas_x =
        this._landmarksList[i].x + move_all_x_by;
      this._landmarksList[i].canvas_y =
        this._landmarksList[i].y + move_all_y_by;
    }
  }

  canvas_draw() {
    for (let i = 0; i < this._depotsList.length; i++) {
      // draw depots
      let x = this._depotsList[i].canvas_x,
        y = -1 * this._depotsList[i].canvas_y,
        size = this._depotsList[i].norm_size;
      this.drawImage(
        x,
        y,
        (size + 1) * this._size_enlarge_factor,
        (size + 1) * this._size_enlarge_factor,
        'https://i.postimg.cc/8P0PdZY7/clipart675905.png'
      );
      this.drawLabel(x, y, this._depotsList[i].label, 'red');
      this._canvas_context.stroke();
    }


    for (let i = 0; i < this._landmarksList.length; i++) {
      // draw landmarks
      let x = this._landmarksList[i].canvas_x,
        y = -1 * this._landmarksList[i].canvas_y;
      this.drawImage(
        x,
        y,
        this._landmark_img_width,
        this._landmark_img_height,
        'https://i.postimg.cc/y6FnM5KZ/clipart4655925.png'
      );
      this.drawLabel(x, y + 10, this._landmarksList[i].label,'black');
      this._canvas_context.stroke();
    }
  }

  drawImage(x, y, width, height, url) {
    let an_img = new Image();
    let self = this;
    an_img.onload = function () {
      self._canvas_context.drawImage(
        an_img,
        x * self._scaling_factor,
        y * self._scaling_factor,
        width,
        height
      );
      self._canvas_context.stroke();
    };
    an_img.src = url;
  }

  drawLabel(x, y, label, color = 'red') {
    if(!label)
    return;
    this._canvas_context.fillStyle = color;
    this._canvas_context.font = '8pt sans-serif';
    this._canvas_context.fillText(
      label,
      x * this._scaling_factor,
      y * this._scaling_factor
    );
  }
}
