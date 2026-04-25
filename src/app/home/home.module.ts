import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { ElectronicsComponent } from './electronics/electronics.component';
import { ShopModule } from './../shop/shop.module';


@NgModule({
  declarations: [
    ElectronicsComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule,
    CommonModule,
    ShopModule,
  ]
})
export class HomeModule { }
