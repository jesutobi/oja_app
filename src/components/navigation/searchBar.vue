<template>
  <div class="">
    <form @submit.prevent="fetchSearchedProducts" action="">
      <!-- desktop search bar -->
      <div
        v-if="SearchInput"
        class="rounded-lg border p-1 flex items-center animate__animated animate__slideInRight max-[546px]:hidden"
      >
        <!-- select category -->
        <div>
          <select v-model="navSearchPayload.id" class="bg-yellow-400 rounded-lg text-xs p-2">
            <option :value="navSearchPayload.id" disabled selected>Categories</option>
            <option v-for="(item, index) in category" :key="index" :value="item.id" class="py-1">
              {{ item.category_title }}
            </option>
          </select>
        </div>
        <!-- input -->
        <div>
          <input
            type="text"
            v-model="navSearchPayload.phrase"
            class="p-1 text-xs"
            placeholder="Product & brand"
          />
        </div>
        <IconHover>
          <Search @click="fetchSearchedProducts" :color="`#9cafa3`" :size="`22px`" />
        </IconHover>
      </div>
      <div v-if="hidedisplaySearchInput" class="max-[600px]:hidden">
        <IconHover @click="displaySearchInput">
          <Search :color="`#000000`" :size="`30px`" />
        </IconHover>
      </div>
      <!-- mobile search bar -->
      <div class="rounded-lg border p-1 flex justify-between items-center min-[600px]:hidden">
        <div class="flex items-center">
          <!-- select category -->
          <div>
            <select
              v-model="navSearchPayload.id"
              class="bg-yellow-400 rounded-lg text-xs py-2 px-1"
            >
              <option :value="navSearchPayload.id" disabled selected>Categories</option>
              <option v-for="(item, index) in category" :key="index" :value="item.id" class="py-1">
                {{ item.category_title }}
              </option>
            </select>
          </div>
          <!-- input -->
          <div>
            <input
              type="text"
              v-model="navSearchPayload.phrase"
              class="p-1 text-xs"
              placeholder="Product & brand"
            />
          </div>
        </div>
        <IconHover>
          <Search @click="fetchSearchedProducts" :color="`#9cafa3`" :size="`22px`" />
        </IconHover>
      </div>
    </form>
  </div>
</template>

<script setup>
import IconHover from '@/components/slots/iconHover.vue'
import { useSearchStore } from '@/stores/search.js'
import Search from '@/assets/svg/search.vue'
import { ref } from 'vue'
import { useProductCategory } from '@/stores/product_category.js'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const categoryStore = useProductCategory()
const { category } = storeToRefs(categoryStore)
const router = useRouter()
const sidebar = ref(false)
const SearchInput = ref(false)
const hidedisplaySearchInput = ref(true)
const searchStore = useSearchStore()

const navSearchPayload = ref({
  id: '',
  phrase: ''
})

const displaySearchInput = () => {
  hidedisplaySearchInput.value = false
  SearchInput.value = true
}

const fetchSearchedProducts = () => {
  if (navSearchPayload.value.phrase !== '' && navSearchPayload.value.id !== '') {
    const phrase = navSearchPayload.value.phrase
    SearchInput.value = false
    hidedisplaySearchInput.value = true
    searchStore.NavSearch(navSearchPayload.value)
    navSearchPayload.value.phrase = ''

    router.push({
      path: `/Product/search/${navSearchPayload.value.id}`,
      query: { phrase: phrase }
    })
  } else {
    toast('ommited required options', {
      theme: 'colored',
      type: 'error',
      autoClose: 1000,
      transition: 'slide',
      dangerouslyHTMLString: true
    })
  }
  navSearchPayload.value.phrase = ''
  navSearchPayload.value.id = ''
}
</script>

<style scoped></style>
