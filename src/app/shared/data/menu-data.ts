import { IMenuItem, IMobileType } from "@/types/menu-d-type";

export const menu_data:IMenuItem[] = [
  {
    id:1,
    link:'/home/beauty',
    title:'Home',
  },
  {
    id:2,
    link:'/shop-filter-dropdown',
    title:'Shop',
  },
  // {
  //   id:3,
  //   link:'/makeup',
  //   title:'Makeup',
  // },
  {
    id:4,
    link:'/pages/coupons',
    title:'Coupons',
  },
  // {
  //   id:5,
  //   link:'/pages/blog-grid',
  //   title:'Blog',
  // },
  {
    id:5,
    link:'/pages/contact',
    title:'Contact',
  },
]

// mobile menu data
export const mobile_menu:IMobileType[] = [
  {
    id: 1,
    single_link: true,
    title: 'Home',
    link: '/home/beauty',
  },
  {
    id: 2,
    single_link: true,
    title: 'Products',
    link: '/shop-filter-dropdown',
  },
  {
    id: 4,
    sub_menu: true,
    title: 'eCommerce',
    link: '/shop/cart',
    sub_menus: [
      {title:'Shopping Cart',link:'/shop/cart'},
      // {title:'Track Your Order',link:'/shop/order'},
      {title:'Compare',link:'/shop/compare'},
      {title:'Wishlist',link:'/shop/wishlist'},
      {title:'Checkout',link:'/pages/checkout'},
      {title:'My account',link:'/pages/profile'}
    ],
  },
  {
    id: 5,
    sub_menu: true,
    title: 'Account',
    link: '/login',
    sub_menus: [
      // {title:'About',link:'/pages/about'},
      {title:'Login',link:'/pages/login'},
      {title:'Register',link:'/pages/register'},
      {title:'Forgot Password',link:'/pages/forgot'},
      // {title:'404 Error',link:'/pages/404'}
    ],
  },
  {
    id: 6,
    single_link: true,
    title: 'Coupons',
    link: '/pages/coupons',
  },
  // {
  //   id: 7,
  //   single_link: true,
  //   title: 'Blogs',
  //   link: '/pages/blog-grid',
  // },
  {
    id: 7,
    single_link: true,
    title: 'Contact',
    link: '/pages/contact',
  },
]
