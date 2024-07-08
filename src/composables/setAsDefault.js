import { ref } from 'vue'
import { useShippingAddressStore } from '@/stores/shipping_address'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const store = useShippingAddressStore()
const successMsg = ref('')
const errorsInfo = ref('')

export function useSetDefault() {
  const setAsDefault = (value) => {
    confirm('Do you want to set as default')
    store.setAsDefault(value)
    store.GetShippingAdress()

    // GetShippingAdress()
  }

  return { setAsDefault }
}
