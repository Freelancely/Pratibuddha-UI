import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElectronicsComponent } from './electronics/electronics.component';

const routes: Routes = [
  {
    path:'electronics',
    component:ElectronicsComponent,
    title:'Pratibuddha | Electronics'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
