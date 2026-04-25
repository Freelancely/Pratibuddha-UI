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
    id: 6,
    single_link: true,
    title: 'Support',
    link: '/pages/contact',
  },
]
