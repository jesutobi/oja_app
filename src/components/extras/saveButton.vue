<template>
  <div>
    <div @click="saveProduct()">
      <Heart v-if="isProductSaved" :color="'#FFBF00'" />
      <Heart v-else :outline="`#000000`" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useIsLoggedIn } from '@/composables/isAuhenticated'
import Heart from '@/assets/svg/heart.vue'
import { useSavedStore } from '@/stores/save_products.js'
import { useUserStore } from '@/stores/Authentication'
import { storeToRefs } from 'pinia'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  Data: {
    type: Object,
    required: true
  }
})

const userstore = useUserStore()
const saveStore = useSavedStore()
const saved_response = ref({})
const { get_saved_data } = storeToRefs(saveStore)
const isLoggedIn = useIsLoggedIn()
const { userInfo, token } = storeToRefs(userstore)

const getSavedProduct = () => {
  saveStore.get_save_product(userInfo.value ? userInfo.value.id : null)
}

const data = ref({ user_id: userInfo.value ? userInfo.value.id : null, product_id: props.Data.id })

const saveProduct = () => {
  if (isLoggedIn.value) {
    saveStore.save_product(data.value).then((response) => {
      saved_response.value = response.data
      toast(response.data.message, {
        theme: 'colored',
        type: 'success',
        autoClose: 1000,
        transition: 'slide',
        dangerouslyHTMLString: true
      })
    })

    getSavedProduct()
  } else {
    toast('Login to save products', {
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

const isProductSaved = computed(() => {
  return (
    Array.isArray(get_saved_data.value) &&
    get_saved_data.value.find((item) => item.product_id === props.Data.id)
  )
})

watch(
  () => props.Data.id,
  () => {
    data.value.product_id = props.Data.id
    getSavedProduct()
  }
)

onMounted(() => {
  getSavedProduct()
})
</script>

<style></style>
