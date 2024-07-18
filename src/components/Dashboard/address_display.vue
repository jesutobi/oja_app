<template>
  <div>
    <div>
      <AdressCardGrid>
        <DashboardCard v-for="(data, index) in store.ShippingAddresses" :key="index">
          <DashboardCardHeader class="p-2">
            <div class="flex items-center justify-between">
              <div class="font2 text-sm">
                <span>shipping Address {{ index + 1 }}</span>
              </div>
              <div>
                <img src="../../../public/icon/address-book.svg" style="width: 23px" />
              </div>
            </div>
          </DashboardCardHeader>
          <div class="text-sm px-2">
            <div class="flex items-center py-2">
              <div>
                <span>Recipient : </span>
              </div>
              <div class="px-1 text-gray-500">
                <span>{{ data.first_name + ' ' + data.last_name }}</span>
              </div>
            </div>

            <div class="flex items-center py-2">
              <div>
                <span> Phone number : </span>
              </div>
              <div class="px-1 text-gray-500">
                <span>{{ data.phone_number }}</span>
              </div>
            </div>
            <div class="flex items-center py-2">
              <div>
                <span> State : </span>
              </div>
              <div class="px-1 text-gray-500">
                <span>{{ JSON.parse(data.state).state }}</span>
              </div>
            </div>
            <div class="flex items-center py-2">
              <div>
                <span> Lga : </span>
              </div>
              <div class="px-1 text-gray-500">
                <span>{{ JSON.parse(data.city) }}</span>
              </div>
            </div>
            <div class="py-2">
              <div class="">
                <span>Delivery address :</span
                ><span class="px-1 text-gray-500"> {{ data.delivery_address }}</span>
              </div>
            </div>
          </div>
          <!-- delete , edit -->
          <div class="flex items-center justify-between p-2">
            <div class="flex items-center">
              <!-- delete -->
              <IconHover>
                <div @click="DeleteAddress(data.id)" class="cursor-pointer" title="Delete address">
                  <Trash />
                </div>
              </IconHover>
              <!-- edit -->
              <IconHover>
                <router-link :to="`/dashboard/edit-shipping-address/${data.id}`">
                  <div class="px-2 cursor-pointer" title="Edit address">
                    <Edit />
                  </div>
                </router-link>
              </IconHover>
            </div>
            <div>
              <!-- check -->
              <div v-if="data.is_default == 1">
                <IconHover>
                  <div class="text-xs flex text-green-600 items-center">
                    <div class="font2">
                      <span>Default Address</span>
                    </div>
                    <div class="px-2 cursor-pointer">
                      <Check />
                    </div>
                  </div>
                </IconHover>
              </div>
              <div v-if="data.is_default == 0">
                <IconHover>
                  <div
                    @click="setAsDefault(data.id)"
                    class="text-xs flex items-center cursor-pointer"
                  >
                    <div>
                      <span>Set as default</span>
                    </div>
                    <div class="px-2 cursor-pointer" title="set address">
                      <Set />
                    </div>
                  </div>
                </IconHover>
              </div>
            </div>
          </div>
        </DashboardCard>
      </AdressCardGrid>
    </div>
  </div>
</template>

<script setup>
import Trash from '@/assets/svg/trash.vue'
import Edit from '@/assets/svg/edit.vue'
import Set from '@/assets/svg/set.vue'
import Check from '@/assets/svg/check.vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import DashboardCard from '@/components/slots/DashboardCard.vue'
import DashboardCardHeader from '@/components/slots/DashboardCardHeader.vue'
import IconHover from '@/components/slots/iconHover.vue'
import AdressCardGrid from '@/components/slots/AdressCardGrid.vue'
import { useShippingAddressStore } from '@/stores/shipping_address'
import { onMounted, ref, reactive } from 'vue'
import { useSetDefault } from '../../composables/setAsDefault'

const { setAsDefault } = useSetDefault()

const store = useShippingAddressStore()
const AddressData = reactive(store.ShippingAddresses)
const successMsg = ref('')
const errorsInfo = ref('')

const GetShippingAdress = () => {
  store.GetShippingAdress()
  AddressData.value = store.ShippingAddresses
}
const DeleteAddress = (value) => {
  confirm('Are you sure you want to delete address')
  const id = toast.loading('Deleting address..')
  store
    .DeleteAddress(value)
    .then((response) => {
      successMsg.value = response.message
      setTimeout(() => {
        toast.update(id, {
          render: successMsg,
          autoClose: true,
          closeOnClick: true,
          closeButton: true,
          type: 'success',
          isLoading: false
        })
        // setTimeout(() => {
        //   // done
        //   toast.done
        //   router.push({
        //     name: '/dashboard/address-book'
        //   })()
        // }, 2000)
      }, 1000)
    })
    .catch((error) => {
      console.log(error)
      errorsInfo.value = error.response.data.message
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
  GetShippingAdress()
}

onMounted(() => {
  GetShippingAdress()
})
</script>

<style scoped></style>
