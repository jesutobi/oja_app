import { computed } from 'vue'
import { useUserStore } from '@/stores/Authentication'
import { storeToRefs } from 'pinia'

export function useIsLoggedIn() {
  const store = useUserStore()
  const { userInfo, token } = storeToRefs(store)

  return computed(() => token.value)
}
