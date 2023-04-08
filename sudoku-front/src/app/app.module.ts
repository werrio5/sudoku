import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RootComponent } from './components/root/root.component';
import { FieldContainerComponent } from './components/field-container/field-container.component';
import { FieldComponent } from './components/field-container/field/field.component';
import { CellComponent } from './components/field-container/field/cell/cell.component';
import { CellGroupComponent } from './components/field-container/field/cell-group/cell-group.component';

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    FieldContainerComponent,
    FieldComponent,
    CellComponent,
    CellGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
