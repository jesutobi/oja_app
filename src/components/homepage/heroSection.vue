<template>
  <div>
    <div class="grid grid-cols-7 xl:gap-[2rem] mt-[4rem]">
      <!-- product -->
      <div class="xl:col-span-2 max-[1189px]:hidden">
        <div class="max-[1280px]:grid grid-cols-6 gap-[3rem] max-[1280px]:my-[3rem]">
          <div class="bg-black max-[1280px]:h-[20rem] xl:h-[15rem] col-span-3 mb-[3rem]">sdsf</div>
          <div class="bg-black max-[1280px]:h-[20rem] xl:h-[17rem] col-span-3">sdsf</div>
        </div>
      </div>
      <!-- hero advert -->
      <div class="col-span-7 xl:col-span-5">
        <div class="relative">
          <div class="">
            <img src="@/assets/images/b1.png" class="xl:h-[35rem]" alt="" />
          </div>
          <div class="absolute text-black -right-5 h-[40vh] bottom-[5rem] w-[50%]">
            <div class="text-2xl animate-slide-up delay-100">
              <span>Enjoy</span>
            </div>
            <div class="font2 text-5xl animate-slide-up delay-200">
              <span>TOP QUALITY</span>
            </div>
            <!-- <div class="text-xl">
              <span>on OJA</span>
            </div> -->
            <div class="text-sm w-[80%] text-justify py-2 animate-slide-up delay-300">
              <span
                >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio, soluta adipisci.
                Fuga sunt perferendis natus placeat mollitia facilis vero minima!</span
              >
            </div>
            <div class="my-[3rem] animate-slide-up delay-400">
              <button
                class="border-black hover:bg-black w-56 hover:text-white border-2 p-2 text-base"
              >
                <span>SHOP NOW</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
<style scoped>
@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slide-up 0.5s ease;
}

.delay-100 {
  animation-delay: 100ms;
}

.delay-200 {
  animation-delay: 200ms;
}

.delay-300 {
  animation-delay: 300ms;
}

.delay-400 {
  animation-delay: 400ms;
}
</style>
