<template>
  <div>
    <!-- header -->
    <div>
      <span class="font2 text-lg md:text-2xl"> Edit Profile</span>
    </div>
    <!-- form space -->
    <div>
      <form>
        <div class="max-[992px]:flex justify-center">
          <div class="w-[80%] max-[568px]:w-[95%]">
            <!-- first name , last name -->
            <div class="lg:flex items-center gap-4">
              <div class="mt-6 w-full relative group">
                <input
                  name="floating_First_name"
                  id="floating_First_name"
                  class="block rounded-2xl p-[1.1rem] w-full border-gray-400 text-gray-400 border text-sm appearance-none focus:ring-0 peer"
                  placeholder=" "
                />
                <label
                  for="floating_First_name"
                  class="peer-focus:font-medium p-[1.1rem] z-10 absolute text-sm text-gray-500 dark:text-gray-400 top-0 duration-300 transform -translate-y-4 scale-75 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                  >First name
                </label>
              </div>
              <div class="mt-6 w-full relative group">
                <input
                  name="floating_Last_name"
                  id="floating_Last_name"
                  class="block rounded-2xl p-[1.1rem] w-full border-gray-400 text-gray-400 border text-sm appearance-none focus:ring-0 peer"
                  placeholder=" "
                />
                <label
                  for="floating_Last_name"
                  class="peer-focus:font-medium p-[1.1rem] z-10 absolute text-sm text-gray-500 dark:text-gray-400 top-0 duration-300 transform -translate-y-4 scale-75 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                  >Last name
                </label>
              </div>
            </div>
            <!-- email , Phone number -->
            <div class="lg:flex items-center gap-4">
              <!-- email -->
              <div class="mt-5 w-full relative group">
                <input
                  name="floating_email"
                  id="floating_email"
                  class="block rounded-2xl p-[1.1rem] w-full border-gray-400 text-gray-400 border text-sm appearance-none focus:ring-0 peer"
                  placeholder=" "
                />
                <label
                  for="floating_email"
                  class="peer-focus:font-medium p-[1.1rem] z-10 absolute text-sm text-gray-500 dark:text-gray-400 top-0 duration-300 transform -translate-y-4 scale-75 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                  >Email
                </label>
              </div>
              <!-- phone number -->
              <div class="mt-5 w-full relative group">
                <input
                  name="floating_phone_number"
                  id="floating_phone_number"
                  class="block rounded-2xl p-[1.1rem] w-full border-gray-400 text-gray-400 border text-sm appearance-none focus:ring-0 peer"
                  placeholder=" "
                />
                <label
                  for="floating_phone_number"
                  class="peer-focus:font-medium p-[1.1rem] z-10 absolute text-sm text-gray-500 dark:text-gray-400 top-0 duration-300 transform -translate-y-4 scale-75 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                  >Phone number
                </label>
              </div>
            </div>
            <!-- country , Address -->
            <div class="lg:flex items-center gap-4">
              <!-- email -->
              <div class="mt-5 w-full relative group">
                <input
                  name="floating_country"
                  id="floating_country"
                  class="block rounded-2xl p-[1.1rem] w-full border-gray-400 text-gray-400 border text-sm appearance-none focus:ring-0 peer"
                  placeholder=" "
                />
                <label
                  for="floating_country"
                  class="peer-focus:font-medium p-[1.1rem] z-10 absolute text-sm text-gray-500 dark:text-gray-400 top-0 duration-300 transform -translate-y-4 scale-75 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                  >Country
                </label>
              </div>
              <!-- address -->
              <div class="mt-5 w-full relative group">
                <input
                  name="floating_address"
                  id="floating_address"
                  class="block rounded-2xl p-[1.1rem] w-full border-gray-400 text-gray-400 border text-sm appearance-none focus:ring-0 peer"
                  placeholder=" "
                />
                <label
                  for="floating_address"
                  class="peer-focus:font-medium p-[1.1rem] z-10 absolute text-sm text-gray-500 dark:text-gray-400 top-0 duration-300 transform -translate-y-4 scale-75 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                  >Home address
                </label>
              </div>
            </div>
            <!-- subnit button -->

            <div class="flex justify-center py-5">
              <AuthButtons class="w-[50%] pt-[4rem]">
                <span>Save Changes</span>
              </AuthButtons>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import AuthButtons from '../../components/slots/AuthButtons.vue'
</script>

<style scoped></style>
