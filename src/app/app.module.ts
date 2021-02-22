import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataReaderService as DataReaderService } from '../services/data-reader.service';
import { PlotComponent } from './components/plot/plot.component';
import { HttpClientModule } from '@angular/common/http';
import { DataProcessorService } from 'src/services/data-processor.service';
import { DataOrchestratorService } from 'src/services/data-orchestrator.service';
import { CanvasController } from './Controllers/canvas-controller';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    PlotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [DataReaderService,DataProcessorService,DataOrchestratorService,CanvasController],
  bootstrap: [AppComponent]
})
export class AppModule { }
