import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeautyComponent } from './beauty/beauty.component';

const routes: Routes = [
  {
    path:'beauty',
    component:BeautyComponent,
    title:'Home Beauty'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
