import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '../components/layouts/AuthLayout.vue'
import DefaultLayout from '../components/layouts/DefaultLayout.vue'
import DashboardLayout from '../components/layouts/DashboardLayout.vue'
// import Home from '../views/index.vue'
import { useUserStore } from '../stores/Authentication'
import { useVerifyEmailStore } from '../stores/Email_verification'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/',
      meta: { requiresAuth: false },
      component: DefaultLayout,
      children: [{ path: '/', name: 'home', component: () => import('../views/index.vue') }]
    },
    {
      path: '/notVerified',
      name: '/notVerified',

      component: DefaultLayout,
      children: [
        {
          path: '/notVerified',
          name: 'notVerified',
          component: () => import('../views/Authentication/email-verification.vue')
        }
      ]
    },
    {
      path: '/notVerified',
      name: '/notVerified',

      component: DefaultLayout,
      children: [
        {
          path: '/Product_details/:id',
          name: 'Product_details',
          component: () => import('../views/Products/product_details.vue')
        }
      ]
    },
    {
      path: '/BackOffice',
      name: '/BackOffice',

      component: DefaultLayout,
      children: [
        {
          path: '/BackOffice/upload_category',
          name: '/BackOffice/upload_category',
          component: () => import('../views/Back_Office/upload_category.vue')
        },
        {
          path: '/BackOffice/upload-feature',
          name: '/BackOffice/upload-feature',
          component: () => import('../views/Back_Office/upload_features.vue')
        },
        {
          path: '/BackOffice/upload-product',
          name: '/BackOffice/upload-product',
          component: () => import('../views/Back_Office/Upload_Product.vue')
        }
      ]
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      redirect: '/',
      meta: { requiresAuth: true },
      component: DashboardLayout,
      children: [
        {
          // meta: { requiresEmailVerification: true },
          path: '/dashboard/edit-profile',
          name: '/dashboard/edit-profile',
          component: () => import('../views/Dashboard/edit-profile.vue')
        },
        {
          path: '/dashboard/orders',
          name: '/dashboard/orders',
          component: () => import('../views/Dashboard/orders.vue')
        },
        {
          path: '/dashboard/saved-items',
          name: '/dashboard/saved-items',
          component: () => import('../views/Dashboard/saved-items.vue')
        },
        {
          path: '/dashboard/address-book',
          name: '/dashboard/address-book',
          component: () => import('../views/Dashboard/address-book.vue')
        },
        {
          path: '/dashboard/address-form',
          name: '/dashboard/address-form',
          component: () => import('../components/Dashboard/address_form.vue')
        },
        {
          path: '/dashboard/edit-shipping-address/:id',
          name: '/dashboard/edit-shipping-address',
          component: () => import('../components/Dashboard/address_form.vue')
        },
        {
          path: '/dashboard/my-account',
          name: '/dashboard/my-account',
          component: () => import('../views/Dashboard/my-account.vue')
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      meta: { isGuest: true },
      redirect: '/login',

      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'Login',
          component: () => import('../views/Authentication/login.vue')
        },
        {
          path: '/register',
          name: 'Register',
          component: () => import('../views/Authentication/Register.vue')
        },
        {
          path: '/forgot-password',
          name: 'forgot-password',
          component: () => import('../views/Authentication/forgot-password.vue')
        },
        {
          path: '/reset-password',
          name: 'reset-password',
          component: () => import('../views/Authentication/reset-password.vue')
        },
        {
          meta: { isGuest: false },
          path: '/email-verification',
          name: 'email-verification',
          component: () => import('../views/Authentication/email-verification.vue')
        },
        {
          meta: { isGuest: false },
          path: '/email-verified',
          name: 'email-verified',
          component: () => import('../views/Authentication/email-verified.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useUserStore()
  const verifyStore = useVerifyEmailStore()

  if (to.meta.requiresAuth && !store.user.token) {
    next({ name: 'Login' })
  } else if (store.user.token && to.meta.isGuest) {
    next({ name: 'home' })
  } else if (to.meta.requiresAuth && store.user.token && store.user.userInfo.verified_at == null) {
    next({ name: 'notVerified' })
  } else {
    next()
  }
})

export default router
