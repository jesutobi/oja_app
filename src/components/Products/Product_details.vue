<template>
  <div>
    <div
      class="grid grid-cols-12 max-[768px]:gap-0 max-[768px]:grid-cols-1 pt-11 max-[1024px]:gap-2 min-[1024px]:gap-5"
    >
      <!-- product images -->
      <div class="lg:col-span-5 col-span-12 shadow sm:rounded-lg bg-white">
        <Images class="" :Data="productDetail" />
      </div>
      <!-- product info -->
      <div class="lg:col-span-7 col-span-12 py-2 px-4 shadow bg-white sm:rounded-lg">
        <Info :Feature="product_feature" :Data="productDetail" />
      </div>
    </div>
    <!-- product description and review -->
    <div
      class="grid grid-cols-12 max-[768px]:gap-0 max-[768px]:grid-cols-1 my-5 max-[1024px]:gap-2 min-[1024px]:gap-5"
    >
      <!-- Product Description -->
      <div
        class="lg:col-span-6 max-[1024px]:col-span-6 shadow sm:rounded-lg text-sm py-2 px-4 bg-white"
      >
        <Description :Data="product_description" />
      </div>
      <!-- Product review -->
      <div
        class="lg:col-span-6 max-[1024px]:col-span-6 text-sm md:my-0 mt-3 py-2 px-4 shadow bg-white sm:rounded-lg"
      >
        <div class="py-2 flex items-center justify-between">
          <div class="font2">
            <span>Customer Review</span>
          </div>

          <div>
            <div class="py-4" v-if="back">
              <div @click="closeTextArea" role="button" class="flex items-center">
                <div>
                  <img
                    src="@/assets/icon/arrow-back-basic-svgrepo-com.svg"
                    alt=""
                    class="px-1"
                    style="width: 28px"
                  />
                </div>
                <div class="font2 text-sm d-no">
                  <span>Back</span>
                </div>
              </div>
            </div>
            <div v-if="openTextAreab">
              <ProdButton @click="openTextArea">
                <div class="flex items-center">
                  <div class="font2">
                    <span> Review Product</span>
                  </div>
                  <div class="px-1">
                    <img src="@/assets/icon/pencil-svgrepo-com.svg" style="width: 13px" alt="" />
                  </div>
                </div>
              </ProdButton>
            </div>
          </div>
        </div>
        <!-- text area -->
        <div class="py-2" v-if="writeReview">
          <Review :Data="product_id" />
        </div>

        <div v-if="product_review.length === 0">
          <div v-show="noReview">
            <NoData :text="`This product has no review at the moment`" />
          </div>
        </div>
        <div v-if="product_review.length > 0" class="py-2">
          <div v-show="displayReview">
            <DisplayReview :Data="product_review" />
          </div>
        </div>
      </div>
    </div>
    <!-- similar products
    <div>
      <SimilarProducts :id="$route.params.id" />
    </div> -->
  </div>
</template>

<script setup>
import ProdButton from '../slots/productButtons.vue'
import Images from '@/components/Product_Details/product_images.vue'
import Info from '@/components/Product_Details/Product_info.vue'
import Description from '@/components/Product_Details/Product_description.vue'
import Review from '@/components/Product_Details/Product_review.vue'
import DisplayReview from '@/components/Product_Details/Display_review.vue'

import { useProduct } from '@/stores/product'
import NoData from '@/components/extras/noData.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

const store = useProduct()
const { productDetail, productFeature } = storeToRefs(store)
const route = useRoute()
const product_detail = ref({})
const product_feature = ref([])
const product_description = ref('')
const product_id = ref(0)
const product_review = ref([])
const writeReview = ref(false)
const back = ref(false)
const openTextAreab = ref(true)
const noReview = ref(true)
const displayReview = ref(true)

const id = ref(0)

const getProductDetail = () => {
  store.GetProductDetail(route.params.id).then((response) => {
    const data = response.data

    product_detail.value = data
    product_id.value = data.id
    product_feature.value = JSON.parse(response.data.selected_product_feature)
    product_description.value = response.data.product_description
  })
}
const getProductReview = async () => {
  try {
    const response = await store.GetReviews(route.params.id)
    product_review.value = response.data.reviews
    console.log(product_review.value)
  } catch (error) {
    console.error('Failed to fetch product reviews:', error)
  }
}
const openTextArea = () => {
  writeReview.value = true
  back.value = true
  openTextAreab.value = false
  noReview.value = false
  displayReview.value = false
}
const closeTextArea = () => {
  writeReview.value = false
  back.value = false
  openTextAreab.value = true
  displayReview.value = true
  noReview.value = true
  getProductDetail()
  getProductReview()
}

onMounted(() => {
  getProductDetail()
  getProductReview()
})
</script>

<style scoped></style>
