import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import {MatToolbarModule} from '@angular/material/toolbar'; 


@NgModule({

  declarations: [
    AppComponent,
  ],

  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatToolbarModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
