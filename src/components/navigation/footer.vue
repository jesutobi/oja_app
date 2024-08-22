<template>
  <div>
    <div class="bg-black mt-[5rem]">
      <div class="container mx-auto relative sm:h-[50vh]">
        <div
          class="sm:grid sm:grid-cols-12 justify-items-center gap-4 py-5 sm:pt-[5rem] sm:px-0 p-4"
        >
          <div class="sm:col-span-4">
            <div class="text-white">
              <Logo class="font_logo2 text-yellow-400 text-[2rem] sm:px-0 px-2" />
            </div>
            <!-- address -->
            <div class="text-sm text-gray-400">
              <div class="py-2 hover:text-yellow-400">
                <span>Abuja, Nigeria </span>
              </div>
              <div class="py-2 hover:text-yellow-400">
                <a href="mailto:Jesutobit@gmail.com"> <span>oja@gmail.com</span></a>
              </div>
              <div class="py-2 hover:text-yellow-400">
                <span>+234-(0)8143400267</span>
              </div>
            </div>
          </div>
          <!-- socials -->
          <div class="sm:col-span-4 pt-4 sm:pb-0 pb-[4rem] sm:py-0">
            <!-- address -->
            <div class="text-sm text-gray-400">
              <div class="text-white">
                <span>About Oja</span>
              </div>
              <div
                v-for="(item, index) in FooterText.Documentation"
                :key="index"
                class="py-2 hover:text-yellow-400"
              >
                <a :href="item.link" target="_blank">
                  <span>{{ item.name }} </span></a
                >
              </div>
            </div>
          </div>
          <!-- socials -->
          <div class="sm:col-span-4 py-4 sm:py-0">
            <!-- address -->
            <div class="text-sm text-gray-400">
              <div class="text-white">
                <span>Socials</span>
              </div>
              <div
                v-for="(item, index) in FooterText.Socials"
                :key="index"
                class="py-2 hover:text-yellow-400"
              >
                <a :href="item.link" target="_blank">
                  <span>{{ item.name }} </span></a
                >
              </div>
            </div>
          </div>
        </div>
        <!-- copyright -->
        <div
          class="flex w-full justify-between items-center text-yellow-400 absolute bottom-2 p-4 border-yellow-400 border-b"
        >
          <div>
            <Copyright class="" />
          </div>
          <div class="text-[1.5rem] tracking-wide font_logo">
            <span>J.J.J</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import FooterText from '@/json/footer.json'
import Copyright from '@/components/extras/copyright.vue'
import Logo from '@/components/extras/logo.vue'
</script>

<style scoped></style>
