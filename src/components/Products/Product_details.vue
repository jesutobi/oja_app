<template>
  <div>
    <div
      class="grid grid-cols-12 max-[768px]:gap-0 max-[768px]:grid-cols-1 pt-11 max-[1024px]:gap-2 min-[1024px]:gap-5"
    >
      <!-- product images -->
      <div class="lg:col-span-5 col-span-12 shadow sm:rounded-lg bg-white">
        <div v-if="Image_loader" class="py-0">
          <Image class="m-2" />
        </div>
        <Images v-else class="" />
      </div>
      <!-- product info -->
      <div class="lg:col-span-7 col-span-12 py-2 px-4 shadow bg-white sm:rounded-lg">
        <div v-if="text_loader">
          <Text v-for="index in 5" :key="index" />
        </div>

        <Info v-else />
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
        <div v-if="text_loader">
          <Text v-for="index in 5" :key="index" />
        </div>
        <Description v-else />
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
          <Review />
        </div>

        <div v-if="productReview?.data?.reviews?.length === 0">
          <div v-show="noReview">
            <NoData :text="`This product has no review at the moment`" />
          </div>
        </div>
        <div v-if="productReview?.data?.reviews?.length > 0" class="py-2">
          <div v-show="displayReview">
            <DisplayReview />
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
import Text from '@/components/loaders/text_loader.vue'
import Image from '@/components/loaders/detail_image.vue'
import ProdButton from '../slots/productButtons.vue'
import Images from '@/components/Product_Details/product_images.vue'
import Info from '@/components/Product_Details/Product_info.vue'
import Description from '@/components/Product_Details/Product_description.vue'
import Review from '@/components/Product_Details/Product_review.vue'
import DisplayReview from '@/components/Product_Details/Display_review.vue'

import { useProduct } from '@/stores/product'
import NoData from '@/components/extras/noData.vue'
import { onBeforeMount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

const text_loader = ref(true)
const Image_loader = ref(true)
const store = useProduct()
const { productDetail, productFeature, productReview } = storeToRefs(store)
const route = useRoute()
const writeReview = ref(false)
const back = ref(false)
const openTextAreab = ref(true)
const noReview = ref(true)
const displayReview = ref(true)

const id = ref(0)

const getProductDetail = async () => {
  text_loader.value = true
  Image_loader.value = true
  try {
    await store.GetProductDetail(route.params.id)
  } catch (error) {
    console.log(error)
  } finally {
    text_loader.value = false
    Image_loader.value = false
  }
}
const getProductReview = () => {
  store.GetReviews(route.params.id)
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
  getProductReview()
})

onBeforeMount(() => {
  getProductDetail()
})
</script>

<style scoped></style>
