import { computed } from 'vue'
import { useUserStore } from '@/stores/Authentication'

export function useIsLoggedIn() {
  const store = useUserStore()

  return computed(() => store.user.token)
}
