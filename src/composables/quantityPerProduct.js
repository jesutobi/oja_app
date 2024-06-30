import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
const store = useCartStore()

export function useQuantityPerProduct() {
  const getQuantity = (productId) => {
    const item = store.cartItems.find((cartItem) => cartItem.id === productId)
    return item ? item.quantity : 0
  }
  const incrementQuantity = (value) => {
    store.AddToCart(value)
  }

  const decrementQuantity = (value) => {
    store.DecrementCart(value)
  }
  const removeProduct = (value) => {
    store.removeFromCart(value)
  }
  return { getQuantity, incrementQuantity, decrementQuantity, removeProduct }
}
