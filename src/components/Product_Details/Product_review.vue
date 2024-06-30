<template>
  <div class="font">
    <form @submit="PostReview">
      <div>
        <textarea
          v-model="content"
          name="content"
          v-bind="contentAttrs"
          id=""
          cols="30"
          rows="8"
          class="w-full rounded-lg bg-yellow-400/15 p-2 text-[0.85rem]"
          placeholder=" let us know your experience  with this product"
        ></textarea>
      </div>
      <!-- validation -->
      <div class="py-2" v-if="errors.content">
        <span class="text-xs text-red-600">{{ errors.content }}</span>
      </div>
      <!-- star rating -->

      <div>
        <div class="">
          <!-- one star -->
          <div class="flex items-center py-1">
            <!-- radio -->
            <div>
              <Field
                type="radio"
                name="rating"
                value="1"
                v-model="product.rating"
                v-bind="ratingAttrs"
              />
            </div>
            <!-- star -->
            <div class="px-2" v-for="(star, index) in starOne" :key="index">
              <Star :color="`#fffff`" />
            </div>
          </div>
          <!-- two star -->
          <div class="flex items-center py-1">
            <!-- radio -->
            <div>
              <Field type="radio" name="rating" value="2" v-model="product.rating" />
            </div>
            <!-- star -->
            <div class="px-2" v-for="(star, index) in starTwo" :key="index">
              <Star :color="`#fffff`" />
            </div>
          </div>
          <!-- three star -->
          <div class="flex items-center py-1">
            <!-- radio -->
            <div>
              <Field type="radio" name="rating" value="3" v-model="product.rating" />
            </div>
            <!-- star -->
            <div class="px-2" v-for="(star, index) in starThree" :key="index">
              <Star :color="`#fffff`" />
            </div>
          </div>
          <!--four star -->
          <div class="flex items-center py-1">
            <!-- radio -->
            <div>
              <Field type="radio" name="rating" value="4" v-model="product.rating" />
            </div>
            <!-- star -->
            <div class="px-2" v-for="(star, index) in starFour" :key="index">
              <Star :color="`#fffff`" />
            </div>
          </div>
          <!-- five star -->
          <div class="flex items-center py-1">
            <!-- radio -->
            <div>
              <Field type="radio" name="rating" value="5" v-model="product.rating" />
            </div>
            <!-- star -->
            <div class="px-2" v-for="(star, index) in starFive" :key="index">
              <Star :color="`#fffff`" />
            </div>
          </div>
        </div>
        <!-- validation -->
        <div class="py-2" v-if="errors.rating">
          <span class="text-xs text-red-600">{{ errors.rating }}</span>
        </div>
      </div>

      <!-- subnit button -->

      <div class="mx-auto w-[43%] pt-[2rem]">
        <ProdButton :Width="`w-[100%]`"> Submit review </ProdButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import ProdButton from '../slots/productButtons.vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useForm, Field, ErrorMessage } from 'vee-validate'
import Star from '@/assets/svg/star.vue'
import { ref } from 'vue'

import { useProduct } from '@/stores/product'
import { object, string, number } from 'yup'

const props = defineProps({
  Data: Number
})

const store = useProduct()
const successMsg = ref('')
const errorsInfo = ref('')
const product = ref({
  content: '',
  rating: 0
})
const starOne = ref(1)
const starTwo = ref(2)
const starThree = ref(3)
const starFour = ref(4)
const starFive = ref(5)

const validationSchema = object({
  content: string().required(),
  rating: number().required()
})

const { handleSubmit, errors, defineField, resetForm } = useForm({
  validationSchema
})

const [content, contentAttrs] = defineField('content')

const [rating, ratingAttrs] = defineField('rating')

const PostReview = handleSubmit((values) => {
  const id = toast.loading('Uploading...')
  const prodcutId = JSON.stringify(props.Data)
  console.log(values)
  store
    .PostReviews(values, prodcutId)
    .then((msg) => {
      successMsg.value = msg.message
      setTimeout(() => {
        toast.update(id, {
          render: successMsg,
          autoClose: true,
          closeOnClick: true,
          closeButton: true,
          type: 'success',
          isLoading: false
        })

        setTimeout(() => {
          // done
          toast.done(
            router.push({
              name: 'Product_details'
            })
          )
        }, 2000)
      }, 2000)
      resetForm()
    })
    .catch((error) => {
      errorsInfo.value = 'Invalid submission'
      setTimeout(() => {
        toast.update(id, {
          render: errorsInfo,
          autoClose: true,
          closeOnClick: true,
          closeButton: true,
          type: 'error',
          isLoading: false
        })
      }, 2000)
      // errorNotify()
    })
  // Reset the form data
  resetForm()
})
</script>

<style scoped></style>
