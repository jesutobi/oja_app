<template>
  <div>
    <!-- go bak button -->
    <AuthFormGrid>
      <div class="flex items-center justify-center h-[75vh]">
        <div>
          <div><Back /></div>

          <!-- logo -->
          <div class="pt-[3rem] pb-2">
            <Logo />
          </div>

          <!-- text -->
          <div>
            <div class="font2 py-1 text-3xl">
              <span>Email Verification</span>
            </div>
            <div class="py-2 text-sm">
              <span
                >You need to click the email verification link that was emailed to {{ user }} in
                order to verify your account</span
              >
            </div>
          </div>
        </div>
      </div>
    </AuthFormGrid>
  </div>
</template>
<script setup>
import Back from '../../components/extras/goBack.vue'
import Logo from '../../components/icons/Logo.vue'
import AuthFormGrid from '../../components/slots/AuthFormGrid.vue'
import { useUserStore } from '@/stores/Authentication'

const store = useUserStore()

const user = store.user.userInfo.email
</script>
<style scoped></style>
