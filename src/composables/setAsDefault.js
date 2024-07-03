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
    const id = toast.loading('setting..')
    store
      .setAsDefault(value)
      .then((msg) => {
        console.log(msg)
        successMsg.value = msg.message
        setTimeout(() => {
          toast.update(id, {
            render: successMsg,
            autoClose: true,
            closeOnClick: true,
            closeButton: true,
            type: 'success',
            isLoading: false
          })
        }, 1000)
        store.GetShippingAdress()
      })
      .catch((error) => {
        console.log(error)
        errorsInfo.value = error
        setTimeout(() => {
          toast.update(id, {
            render: errorsInfo,
            autoClose: true,
            closeOnClick: true,
            closeButton: true,
            type: 'error',
            isLoading: false
          })
        }, 2000)
      })
    // GetShippingAdress()
  }

  return { setAsDefault }
}
