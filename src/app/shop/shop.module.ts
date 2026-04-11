import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Added
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@/shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';

// Beauty products
import { BeautyAllProductsComponent } from './product/beauty/beauty-all-products/beauty-all-products.component';
import { BeautySpecialProductsComponent } from './product/beauty/beauty-special-products/beauty-special-products.component';

// Product item
import { ProductItemThreeComponent } from './product/beauty/product-item-three/product-item-three.component';
import { ProductItemTwoComponent } from './product/fashion/product-item-two/product-item-two.component';

// Widget components
import { TopRatedProductsComponent } from './product/widget/top-rated-products/top-rated-products.component';

// Filter components
import { PriceFilterComponent } from './filtering/price-filter/price-filter.component';
import { StatusFilterComponent } from './filtering/status-filter/status-filter.component';
import { CategoryFilterComponent } from './filtering/category-filter/category-filter.component';
import { BrandFilterComponent } from './filtering/brand-filter/brand-filter.component';
import { ResetFilterRouteComponent } from './filtering/reset-filter-route/reset-filter-route.component';
import { ProductListItemComponent } from './product/widget/product-list-item/product-list-item.component';

// Page components
import { ShopListComponent } from './pages/shop-list/shop-list.component';
import { ShopAreaComponent } from './shop-area/shop-area.component';
import { ShopFullWidthComponent } from './pages/shop-full-width/shop-full-width.component';
import { ShopSixteenThousandPxComponent } from './pages/shop-sixteen-thousand-px/shop-sixteen-thousand-px.component';
import { ShopRightSidebarComponent } from './pages/shop-right-sidebar/shop-right-sidebar.component';
import { ShopNoSidebarComponent } from './pages/shop-no-sidebar/shop-no-sidebar.component';
import { ShopFilterDropdownComponent } from './pages/shop-filter-dropdown/shop-filter-dropdown.component';
import { ShopLoadMoreComponent } from './pages/shop-load-more/shop-load-more.component';
import { ShopCategoryComponent } from './pages/shop-category/shop-category.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { DynamicProductDetailsComponent } from './pages/dynamic-product-details/dynamic-product-details.component';
import { RelatedProductsComponent } from './product/related-products/related-products.component';
import { ProductDetailsWithCountdownComponent } from './pages/product-details-with-countdown/product-details-with-countdown.component';
import { ProductDetailsListComponent } from './pages/product-details-list/product-details-list.component';
import { ProductDetailsGalleryComponent } from './pages/product-details-gallery/product-details-gallery.component';
import { CartComponent } from './pages/cart/cart.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { CompareComponent } from './pages/compare/compare.component';
import { OrderComponent } from './pages/order/order.component';

@NgModule({
  declarations: [
    BeautyAllProductsComponent,
    BeautySpecialProductsComponent,
    ProductItemThreeComponent,
    ProductItemTwoComponent,
    PriceFilterComponent,
    StatusFilterComponent,
    CategoryFilterComponent,
    TopRatedProductsComponent,
    BrandFilterComponent,
    ResetFilterRouteComponent,
    ProductListItemComponent,
    ShopListComponent,
    ShopAreaComponent,
    ShopFullWidthComponent,
    ShopSixteenThousandPxComponent,
    ShopRightSidebarComponent,
    ShopNoSidebarComponent,
    ShopFilterDropdownComponent,
    ShopLoadMoreComponent,
    ShopCategoryComponent,
    ProductDetailsComponent,
    DynamicProductDetailsComponent,
    RelatedProductsComponent,
    ProductDetailsWithCountdownComponent,
    ProductDetailsListComponent,
    ProductDetailsGalleryComponent,
    CartComponent,
    WishlistComponent,
    CompareComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    RouterModule, // Added for Router usage
    ShopRoutingModule,
    NgxSliderModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    BeautyAllProductsComponent,
    BeautySpecialProductsComponent,
    ProductItemThreeComponent,
    ProductItemTwoComponent,
    PriceFilterComponent,
    StatusFilterComponent,
    CategoryFilterComponent,
    TopRatedProductsComponent,
    BrandFilterComponent,
    ResetFilterRouteComponent,
    ProductListItemComponent,
    ShopAreaComponent,
    RelatedProductsComponent
  ]
})
export class ShopModule { }
