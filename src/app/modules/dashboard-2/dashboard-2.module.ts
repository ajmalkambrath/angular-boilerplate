import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './dashboard-2-routing.module';
import { Dashboard2Component } from './components/dashboard-2.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    Dashboard2Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
