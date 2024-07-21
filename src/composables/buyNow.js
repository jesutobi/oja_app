import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useQuantityPerProduct } from './quantityPerProduct'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useIsLoggedIn } from '@/composables/isAuhenticated'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export function useBuyNow() {
  const router = useRouter()
  const CartStore = useCartStore()
  const { cartItems } = storeToRefs(CartStore)
  const { incrementQuantity } = useQuantityPerProduct()
  const isLoggedIn = useIsLoggedIn()

  const BuyNow = (value) => {
    const existingItem = cartItems.value.find((cartItem) => cartItem.id === value.id)

    if (isLoggedIn.value) {
      if (existingItem) {
        router.push({
          name: 'checkout'
        })
      } else {
        incrementQuantity(value)
        router.push({
          name: 'checkout'
        })
      }
    } else {
      toast('Login to Buy products', {
        theme: 'colored',
        type: 'error',
        autoClose: 1000,
        transition: 'slide',
        dangerouslyHTMLString: true
      })
      setTimeout(() => {
        router.push({
          name: 'Login'
        })
      }, 2000)
    }
  }
  return { BuyNow }
}
