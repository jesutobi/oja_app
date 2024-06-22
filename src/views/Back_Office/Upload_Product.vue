<template>
  <div class="my-[4rem]">
    <div class="flex justify-center">
      <div class="w-[60%]">
        <form action="" @submit.prevent="submitForm">
          <!-- product title -->
          <div class="text-sm my-2">
            <div class="py-2">
              <label class="text-sm">Product title*</label>
            </div>
            <div class="">
              <input
                v-model="form.product_title"
                type="text"
                placeholder="Enter your product title"
                class="rounded w-full border px-2 py-3"
              />
            </div>
          </div>
          <!-- product price -->
          <div class="text-sm my-2">
            <div class="py-2">
              <label class="text-sm">Product price*</label>
            </div>
            <div class="">
              <input
                v-model="form.product_price"
                type="number"
                placeholder="Enter your product price"
                class="rounded w-full border px-2 py-3"
              />
            </div>
          </div>
          <!-- product description -->
          <div class="text-sm my-2">
            <div class="py-2">
              <label class="text-sm">Product description*</label>
            </div>
            <div class="">
              <textarea
                v-model="form.product_description"
                name=""
                placeholder="Enter your product description"
                class="rounded w-full border px-2 py-3 whitespace-pre-wrap"
                id=""
                cols="30"
                rows="10"
              >
              </textarea>
            </div>
          </div>
          <!-- product quantity -->
          <div class="text-sm my-2">
            <div class="py-2">
              <label class="text-sm">Product quantity*</label>
            </div>
            <div class="">
              <input
                v-model="form.product_quantity"
                type="number"
                placeholder="Enter the amount of product available"
                class="rounded w-full border px-2 py-3"
              />
            </div>
          </div>
          <!-- product brand -->
          <div class="text-sm my-2">
            <div class="py-2">
              <label class="text-sm">Product brand*</label>
            </div>
            <div class="">
              <input
                v-model="form.product_brand"
                type="text"
                placeholder="Enter the product brand"
                class="rounded w-full border px-2 py-3"
              />
            </div>
          </div>

          <!-- product image -->

          <div class="my-2">
            <div class="py-2">
              <label class="text-sm">Upload product image</label>
            </div>
            <div class="w-100 bg-slate-100 py-[3rem] text-black rounded-lg">
              <div class="w-100 flex justify-center">
                <label role="button" for="file" class="text-center text-xs rounded">
                  <input
                    id="file"
                    type="file"
                    ref="fileInput"
                    @change="onFileChange"
                    class="border-0 w-full"
                    multiple
                  />
                  <div class="rounded-lg bg-black text-xs px-2 py-3 font2 text-white">
                    <span>Upload Pictures</span>
                  </div>
                </label>
              </div>
              <div class="flex justify-center text-xs">
                <div
                  class="flex items-center"
                  v-for="(image, index) in form.product_imageURL"
                  :key="index"
                >
                  <div class="m-2">
                    <span>{{ image }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- product_category -->
          <div class="text-sm my-2">
            <div class="py-2">
              <label class="text-sm">Product category*</label>
            </div>
            <div class="">
              <select
                name=""
                id=""
                class="rounded w-full border px-2 py-3"
                v-model="form.product_category"
              >
                <option value="">select your category</option>
                <option v-for="(data, index) in product_category" :key="index" :value="data">
                  {{ data.category_title }}
                </option>
              </select>
            </div>
          </div>
          <!-- product feature -->
          <div class="text-sm my-2">
            <div class="py-2">
              <label class="text-sm">Product feature</label>
            </div>

            <div
              class="flex items-center gap-2 my-1"
              v-for="(item, index) in form.SelectedproductFeature"
              :key="index"
            >
              <div class="w-full">
                <select
                  name=""
                  id=""
                  class="rounded w-full border px-2 py-3"
                  v-model="form.SelectedproductFeature[index].key"
                >
                  <option value="">select your product feature</option>
                  <option v-for="(data, index) in product_feature" :key="index" :value="data">
                    {{ data.feature_title }}
                  </option>
                </select>
              </div>
              <div class="w-full">
                <input
                  v-model="form.SelectedproductFeature[index].value"
                  type="text"
                  placeholder="Enter the product feature"
                  class="rounded w-full border px-2 py-3"
                />
              </div>
            </div>

            <div>
              <button
                @click.prevent="addFeatures"
                class="rounded-xl p-2 flex items-center text-white hover:bg-black bg-black text-[0.8rem]"
              >
                <div>
                  <span>Add feature</span>
                </div>
                <div class="px-2">
                  <Plus :color="`#FFFFFF`" />
                </div>
              </button>
            </div>
          </div>

          <!-- check box -->
          <div class="item-center flex py-3">
            <div>
              <input
                :rules="checkboxRules"
                name="featured"
                type="checkbox"
                v-model="form.featured"
              />
            </div>
            <div class="cursor-pointer px-2">
              <span class="text-xs">Feature product</span>
            </div>
          </div>

          <!-- subnit button -->

          <div class="flex justify-center py-5">
            <AuthButtons class="w-[50%] pt-[4rem]">
              <span>Upload</span>
            </AuthButtons>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import Plus from '@/assets/svg/plus.vue'
import { onMounted, ref } from 'vue'
import AuthButtons from '../../components/slots/AuthButtons.vue'
import axiosClient from '../../axios'
import { useProductCategory } from '@/stores/product_category'
import { useProductFeature } from '@/stores/product_feature'

const store = useProductCategory()
const storeFeature = useProductFeature()
const product_category = ref([])
const product_feature = ref([])
const files = ref([])

const form = ref({
  product_title: '',
  product_price: 0,
  product_description: '',
  product_quantity: 0,
  product_brand: '',
  product_images: [],
  product_imageURL: [],
  product_category: {},

  SelectedproductFeature: [
    {
      key: '',
      value: ''
    }
  ],
  featured: false
})

// add more product feature
const addFeatures = () => {
  form.value.SelectedproductFeature.push({
    key: '',
    value: ''
  })
}

// upload multiple images
const onFileChange = (event) => {
  form.value.product_images = Array.from(event.target.files)
  // Clear previous URLs
  form.value.product_imageURL = []

  // Generate object URLs for each file
  form.value.product_images.forEach((file) => {
    form.value.product_imageURL.push({ url: URL.createObjectURL(file) })
  })
}
// const createFile = (file) => {
//   files.value.push(file)

//   form.value.product_imageURL.push({ url: URL.createObjectURL(file) })
// }

// submit form
const submitForm = async () => {
  if (!form.value.product_images) {
    alert('Please select an image.')
    return
  }

  const formData = new FormData()
  formData.append('product_title', form.value.product_title)
  formData.append('product_price', form.value.product_price)
  formData.append('product_description', form.value.product_description)
  formData.append('product_quantity', form.value.product_quantity)
  formData.append('product_brand', form.value.product_brand)

  formData.append('product_category', JSON.stringify(form.value.product_category))
  formData.append('selected_product_feature', JSON.stringify(form.value.SelectedproductFeature))
  form.value.product_images.forEach((file, index) => {
    formData.append(`product_images[]`, file)
  })
  formData.append('featured', form.value.featured ? '1' : '0')
  console.log(formData)

  try {
    const response = await axiosClient.post('/UploadProduct', formData)
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}

// get product category
const GetProductCategory = () => {
  store.getProductCategory().then((response) => {
    product_category.value = response.data.categories
    console.log(response)
  })
}

// get product feature
const GetProductFeature = () => {
  storeFeature.getProductFeature().then((response) => {
    product_feature.value = response.data.data
    console.log(response)
  })
}

onMounted(() => {
  GetProductCategory(), GetProductFeature()
})
</script>
<style scoped>
/* upload buttons */
input[type='file'] {
  display: none;
}
</style>
