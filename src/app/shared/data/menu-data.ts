import { IMenuItem, IMobileType } from "@/types/menu-d-type";

export const menu_data:IMenuItem[] = [
  {
    id:1,
    link:'/home/electronics',
    title:'Home',
  },
  {
    id:2,
    link:'/shop-filter-dropdown',
    title:'Shop',
  },
  {
    id:3,
    link:'/pages/coupons',
    title:'Deals',
  },
  {
    id:4,
    link:'/pages/contact',
    title:'Support',
  },
]

// mobile menu data
export const mobile_menu:IMobileType[] = [
  {
    id: 1,
    single_link: true,
    title: 'Home',
    link: '/home/electronics',
  },
  {
    id: 2,
    single_link: true,
    title: 'Shop',
    link: '/shop-filter-dropdown',
  },
  {
    id: 3,
    sub_menu: true,
    title: 'Categories',
    link: '/shop-filter-dropdown',
    sub_menus: [
      {title:'TVs',link:'/shop-filter-dropdown'},
      {title:'Refrigerators',link:'/shop-filter-dropdown'},
      {title:'Washing Machines',link:'/shop-filter-dropdown'},
      {title:'Kitchen Appliances',link:'/shop-filter-dropdown'},
      {title:'Small Appliances',link:'/shop-filter-dropdown'},
      {title:'Accessories',link:'/shop-filter-dropdown'}
    ],
  },
  {
    id: 4,
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
    id: 5,
    single_link: true,
    title: 'Deals',
    link: '/pages/coupons',
  },
  {
    id: 6,
    single_link: true,
    title: 'Support',
    link: '/pages/contact',
  },
]
