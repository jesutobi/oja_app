import { computed } from 'vue'
import { useUserStore } from '@/stores/Authentication' // Import your Vuex store hook

export function useIsLoggedIn() {
  const store = useUserStore() // Assuming you have a composable for accessing the store

  return computed(() => store.user.token)
}
