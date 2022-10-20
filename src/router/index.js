import { createRouter, createWebHistory } from 'vue-router'

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
        component: () => import('../views/FrontView/ProductsView.vue'),
        children: [
          {
            path: '',
            component: () => import('../views/FrontView/ProductAll.vue')
          },
          {
            path: ':id',
            component: () => import('../views/FrontView/ProductDetail.vue')
          }
        ]
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
    component: () => import('../views/AdminView.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/AdminView/AdminProducts.vue')
      },
      {
        path: 'product',
        component: () => import('../views/AdminView/AdminProducts.vue')
      },
      {
        path: 'order',
        component: () => import('../views/AdminView/AdminOrder.vue')
      },
      {
        path: 'coupon',
        component: () => import('../views/AdminView/AdminCoupon.vue')
      },
      {
        path: 'article',
        component: () => import('../views/AdminView/AdminArticle.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/AdminView/AdminCart.vue')
      }
    ]
  },
  {
    path: '/:patchMatch(.*)*',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
