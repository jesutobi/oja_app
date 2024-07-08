import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore(
  'cart',
  () => {
    // Define your state here
    const cartItems = ref([])
    const cartItemCount = ref(0)

    const AddToCart = (product) => {
      const existingItem = cartItems.value.find((cartItem) => cartItem.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        cartItems.value.push({ ...product, quantity: 1 })
      }
    }
    const DecrementCart = (product) => {
      const existingItem = cartItems.value.find((cartItem) => cartItem.id === product.id)
      if (existingItem && existingItem.quantity >= 1) {
        existingItem.quantity--
        if (existingItem.quantity === 0) {
          removeFromCart(product)
          window.location.reload()
        }
      }
    }

    const removeFromCart = (product) => {
      cartItems.value = cartItems.value.filter((cartItem) => cartItem.id !== product.id)
    }

    const totalQuantity = computed(() => {
      return cartItems.value.reduce((total, item) => total + item.quantity, 0)
    })

    const calculateTotalPrice = (item) => {
      return item.product_price * item.quantity
    }

    const totalAmount = computed(() => {
      return cartItems.value.reduce((total, item) => {
        return total + item.product_price * item.quantity
      }, 0)
    })

    const clearBag = () => {
      cartItems.value = []
      cartItemCount.value = 0
    }

    return {
      AddToCart,
      cartItems,
      DecrementCart,
      cartItemCount,
      totalQuantity,
      removeFromCart,
      totalAmount,
      calculateTotalPrice,
      clearBag
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [{ storage: localStorage, paths: ['cartItems', 'cartItemCount'] }]
    }
  }
)
