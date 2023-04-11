import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RootComponent } from './components/root/root.component';
import { FieldContainerComponent } from './components/field-container/field-container.component';
import { FieldComponent } from './components/field-container/field/field.component';
import { CellComponent } from './components/field-container/field/cell/cell.component';
import { CellGroupComponent } from './components/field-container/field/cell-group/cell-group.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import { InputComponent } from './components/field-container/input/input.component';
import { DigitComponent } from './components/field-container/input/digit/digit.component';
import { GenerationOptionsComponent } from './components/field-container/generation-options/generation-options.component';
import {MatChipsModule} from "@angular/material/chips";

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    FieldContainerComponent,
    FieldComponent,
    CellComponent,
    CellGroupComponent,
    ControlPanelComponent,
    InputComponent,
    DigitComponent,
    GenerationOptionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatChipsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
