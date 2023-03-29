import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './layout/header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [HeaderComponent],
  entryComponents: [],
  providers: []
})
export class CommonAppModule {
  static forRoot(): ModuleWithProviders<CommonAppModule> {
    return {
      ngModule: CommonAppModule,
      providers: []
    };
  }
}
