<template>
  <div class="my-[4rem]">
    <div class="flex justify-center">
      <div class="w-[60%]">
        <form action="" @submit.prevent="submitForm">
          <!-- product name -->
          <div class="text-sm my-2">
            <div class="py-2">
              <label class="text-sm">Product category*</label>
            </div>
            <div class="">
              <input
                v-model="form.category_title"
                type="text"
                placeholder="Enter your product category"
                class="rounded w-full border px-2 py-3"
              />
            </div>
          </div>

          <!-- category card image -->

          <div class="my-2">
            <div class="py-2">
              <label class="text-sm">Upload category hero image</label>
            </div>
            <div class="w-100 bg-slate-100 py-[3rem] text-black rounded-lg">
              <div class="w-100 flex justify-center">
                <label role="button" for="file" class="text-center text-xs rounded">
                  <input
                    id="file"
                    type="file"
                    ref="fileInput"
                    @change="(event) => onFileChange(event, 'hero_image')"
                    class="border-0 w-full"
                  />
                  <div class="rounded-lg bg-black text-xs px-2 py-3 font2 text-white">
                    <span>Upload Pictures</span>
                  </div>
                </label>
              </div>
              <div class="flex justify-center text-xs">
                <div class="flex items-center">
                  <div class="m-2">
                    <span>{{ form.hero_imageUrl }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Category hero image -->
          <div class="my-2">
            <div class="py-2">
              <label class="text-sm">Category card image</label>
            </div>
            <div class="w-100 bg-slate-100 py-[3rem] text-black rounded-lg">
              <div class="w-100 flex justify-center">
                <label role="button" for="file2" class="text-center text-xs rounded">
                  <input
                    id="file2"
                    type="file"
                    @change="(event) => onFileChange(event, 'card_image')"
                    class="border-0 w-full"
                  />
                  <div class="rounded-lg bg-black text-xs px-2 py-3 font2 text-white">
                    <span>Upload Pictures</span>
                  </div>
                </label>
              </div>
              <div class="flex justify-center text-xs">
                <div class="flex items-center">
                  <div class="m-2">
                    <span>{{ form.card_imageUrl }}</span>
                  </div>
                </div>
              </div>
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
import { ref } from 'vue'
import AuthButtons from '../../components/slots/AuthButtons.vue'
import axiosClient from '../../axios'

const form = ref({
  category_title: '',
  hero_image: null,
  card_image: null,
  card_imageUrl: '',
  hero_imageUrl: ''
})

const onFileChange = (event, imageType) => {
  const file = event.target.files[0]
  form.value[imageType] = file
  form.value[`${imageType}Url`] = URL.createObjectURL(file)
}

const submitForm = async () => {
  if (!form.value.hero_image) {
    alert('Please select an image.')
    return
  }

  const formData = new FormData()
  formData.append('category_title', form.value.category_title)
  formData.append('hero_image', form.value.hero_image)
  formData.append('card_image', form.value.card_image)

  try {
    const response = await axiosClient.post('/UploadCategory', formData)
    console.log('Form submitted successfully', response.data)
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}
</script>

<style scoped>
/* upload buttons */
input[type='file'] {
  display: none;
}
</style>
