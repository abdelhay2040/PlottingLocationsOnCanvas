export class location {
  x:number;
  y:number;
  canvas_x:number;
  canvas_y:number;
  label:string;
  metadata:string;
  
}

export class depot extends location  {
  size:number;
  norm_size:number;
}

export class landmark extends location{

}