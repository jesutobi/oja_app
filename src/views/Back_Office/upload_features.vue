<template>
  <div class="my-[4rem]">
    <div class="flex justify-center">
      <div class="w-[60%]">
        <form action="" @submit.prevent="submitForm">
          <!-- feature_title -->
          <div class="text-sm my-2">
            <div class="py-2">
              <label class="text-sm">Product features*</label>
            </div>
            <div class="">
              <input
                v-model="form.feature_title"
                type="text"
                placeholder="Enter your product features"
                class="rounded w-full border px-2 py-3"
              />
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
  feature_title: ''
})

const submitForm = async () => {
  try {
    const response = await axiosClient.post('/UploadFeature', form.value)(
      'Form submitted successfully',
      response.data
    )
  } catch (error) {
    'Error submitting form:', error
  }
}
</script>

<style scoped>
/* upload buttons */
input[type='file'] {
  display: none;
}
</style>
