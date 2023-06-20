import AppLayout from '@src/components/Layouts/AppLayout'
import { USER_ROLE } from '@src/configs'
import RequireAuth from '@src/routes/RequireAuth'
import { Outlet } from 'react-router'
import UserCart from './pages/Cart'
import Category from './pages/Category'
import Checkout from './pages/Checkout'
import Home from './pages/Home'
import Product from './pages/Product'
import ShopRegister from './pages/ShopRegister'

export const customerRouteList = [
  {
    path: '/',
    element: (
      <AppLayout>
        <Home />
      </AppLayout>
    )
  },
  {
    path: '/',
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    children: [
      {
        path: '/shop/register',
        element: <ShopRegister />
      },
      {
        path: '/product/:id',
        element: <Product />
      }
    ]
  },
  {
    path: '/',
    // element: <RequireAuth allowedRoles={[USER_ROLE.USER, USER_ROLE.ADMIN]}></RequireAuth>,
    children: [
      {
        path: '/cart',
        element: (
          <AppLayout>
            <UserCart />
          </AppLayout>
        )
      },
      {
        path: '/checkout',
        element: (
          <AppLayout>
            <Checkout />
          </AppLayout>
        )
      }
    ]
  },
  {
    path: '/',
    element: <RequireAuth allowedRoles={[USER_ROLE.ADMIN]}></RequireAuth>,
    children: [
      {
        path: '/category',
        element: (
          <AppLayout>
            <Category />
          </AppLayout>
        )
      }
    ]
  }
]
