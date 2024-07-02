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
    // home
    {
      path: '/',
      name: 'home',
      redirect: '/',
      meta: { requiresAuth: false },
      component: DefaultLayout,
      children: [{ path: '/', name: 'home', component: () => import('../views/index.vue') }]
    },
    // email verification
    {
      path: '/email_verification',
      name: 'email_verification',

      component: DefaultLayout,
      children: [
        {
          path: 'notVerified',
          name: 'notVerified',
          component: () => import('../views/Authentication/email-verification.vue')
        }
      ]
    },
    // product details
    {
      path: '/Product_details',
      name: 'Product_details',

      component: DefaultLayout,
      children: [
        {
          path: ':id',
          name: 'Product_details',
          component: () => import('../views/Products/product_details.vue')
        },
        {
          path: 'write_reviews',
          name: 'write_reviews',
          component: () => import('../views/Products/product_details.vue')
        }
      ]
    },
    // order process
    {
      path: '/Product',
      name: 'Product',

      component: DefaultLayout,
      children: [
        {
          path: 'shopping_cart',
          name: 'shopping_cart',
          component: () => import('../views/Order_Process/shopping_cart.vue')
        },
        {
          meta: { requiresAuth: true },
          path: 'checkout',
          name: 'checkout',
          component: () => import('../views/Order_Process/checkout.vue')
        }
      ]
    },
    // back office
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
    // dahsboard
    {
      path: '/dashboard',
      name: 'dashboard',
      redirect: '/',
      meta: { requiresAuth: true },
      component: DashboardLayout,
      children: [
        {
          // meta: { requiresEmailVerification: true },
          path: 'edit-profile',
          name: 'edit-profile',
          component: () => import('../views/Dashboard/edit-profile.vue')
        },
        {
          path: 'orders',
          name: 'orders',
          component: () => import('../views/Dashboard/orders.vue')
        },
        {
          path: 'saved-items',
          name: 'saved-items',
          component: () => import('../views/Dashboard/saved-items.vue')
        },
        {
          path: 'address-book',
          name: 'address-book',
          component: () => import('../views/Dashboard/address-book.vue')
        },
        {
          path: 'address-form',
          name: 'address-form',
          component: () => import('../components/Dashboard/address_form.vue')
        },
        {
          path: 'edit-shipping-address/:id',
          name: 'edit-shipping-address',
          component: () => import('../components/Dashboard/address_form.vue')
        },
        {
          path: 'my-account',
          name: 'my-account',
          component: () => import('../views/Dashboard/my-account.vue')
        }
      ]
    },
    // authentication
    {
      path: '/auth',
      name: 'auth',
      meta: { isGuest: true },
      redirect: '/login',

      component: AuthLayout,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('../views/Authentication/login.vue')
        },
        {
          path: 'register',
          name: 'Register',
          component: () => import('../views/Authentication/Register.vue')
        },
        {
          path: 'forgot-password',
          name: 'forgot-password',
          component: () => import('../views/Authentication/forgot-password.vue')
        },
        {
          path: 'reset-password',
          name: 'reset-password',
          component: () => import('../views/Authentication/reset-password.vue')
        },
        // {
        //   meta: { isGuest: false },
        //   path: 'email-verification',
        //   name: 'email-verification',
        //   component: () => import('../views/Authentication/email-verification.vue')
        // },
        {
          meta: { isGuest: false },
          path: 'email-verified',
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
