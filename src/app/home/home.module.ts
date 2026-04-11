import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { BeautyComponent } from './beauty/beauty.component';
import { ShopModule } from './../shop/shop.module';


@NgModule({
  declarations: [
    BeautyComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule,
    CommonModule,
    ShopModule,
  ]
})
export class HomeModule { }
