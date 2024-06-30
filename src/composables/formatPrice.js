import { ref } from 'vue'

export function useFormatPrice() {
  const formatPrice = (price) => {
    if (price !== undefined && price !== null) {
      return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
    }
    return ''
  }
  return { formatPrice }
}
