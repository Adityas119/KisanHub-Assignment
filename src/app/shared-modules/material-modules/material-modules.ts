import { NgModule } from '@angular/core';
import {MatToolbarModule, MatGridListModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatSelectModule, MatButtonModule} from '@angular/material';

@NgModule({
  imports: [MatToolbarModule, MatGridListModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatSelectModule, MatButtonModule],
  exports: [MatToolbarModule, MatGridListModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatSelectModule, MatButtonModule],
  providers: [MatDatepickerModule]
})
export class MaterialModule { }