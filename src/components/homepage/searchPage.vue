<template>
  <div>
    <div class="height-[100vh] bg-black/80">
      <div class="flex justify-center h-[100vh]">
        <div class="py-[5rem] w-[70%]">
          <!-- cancel -->
          <div
            class="my-[10rem] cursor-pointer flex justify-center"
            @click="$emit('closeSearchModal', false)"
          >
            <img src="@/assets/icon/cancel.svg" style="width: 35px" alt="" />
          </div>
          <!-- input space -->
          <div class="flex items-center relative">
            <div class="mt-5 w-full relative group">
              <input
                name="floating_search"
                id="floating_search"
                class="block border-b-yellow-400 border-2 p-[1.1rem] w-full bg-none text-white text-sm appearance-none focus:ring-0 peer"
                placeholder=" "
              />
              <label
                for="floating_search"
                class="peer-focus:font-medium p-[1.1rem] z-10 absolute text-sm text-white dark:text-white top-0 duration-300 transform -translate-y-4 scale-75 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                >Search for a product
              </label>
            </div>
            <div class="absolute right-0 bottom-0 p-3">
              <Search :color="`#facc15`" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Search from '@/assets/svg/search.vue'
</script>

<style scoped>
input {
  background: none !important;
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  /* width: 100% !important; */
}
input:focus {
  outline: none !important;
}
</style>
