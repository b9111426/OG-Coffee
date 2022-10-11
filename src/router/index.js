import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/FrontView/HomeView.vue')
      },
      {
        path: 'products',
        component: () => import('../views/FrontView/ProductsView.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/FrontView/ProductView.vue')
      },
      {
        path: 'coupon',
        component: () => import('../views/FrontView/CouponView.vue')
      },
      {
        path: 'about',
        component: () => import('../views/FrontView/AboutOG.vue')
      },
      {
        path: 'quest',
        component: () => import('../views/FrontView/QuestionView.vue')
      },
      {
        path: 'newer',
        component: () => import('../views/FrontView/NewUser.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/FrontView/CartView.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/Dashboard/AdminProducts.vue')
      },
      {
        path: 'order',
        component: () => import('../views/Dashboard/AdminOrder.vue')
      },
      {
        path: 'coupon',
        component: () => import('../views/Dashboard/AdminCoupon.vue')
      },
      {
        path: 'article',
        component: () => import('../views/Dashboard/AdminArticle.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/Dashboard/AdminCart.vue')
      }
    ]
  },
  {
    path: '/:patchMatch(.*)*',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
