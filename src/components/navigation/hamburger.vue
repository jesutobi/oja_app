<template>
  <div>
    <div class="container" id="app">
      <div class="menu-wrapper" @click="openMenu = !openMenu" :class="{ active: openMenu }">
        <div class="menu-bar one"></div>
        <div class="menu-bar two"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const openMenu = ref(false)
</script>

<style scoped>
.menu-wrapper {
  width: 35px;
  /* height: auto; */
  cursor: pointer;
  position: relative;
}

.menu-bar {
  position: absolute;
  width: 100%;
  height: 4px;
  background: #000000;
  left: 0%;
}

.menu-wrapper:hover .menu-bar {
  /*animation-duration: 1s;
  animation-name: slideOut;
  animation-direction: alternate;
  animation-timing-function: ease-out;*/
}

.one {
  top: 0px;
  animation-delay: 0.1s;
  transition: all 0.3s;
}

.two {
  top: 8px;
  transition: all 0.3s;
}

@keyframes slideOut {
  0% {
    width: 100%;
    left: 0%;
    right: auto;
  }

  50% {
    width: 0%;
    left: 0%;
    right: auto;
  }
  51% {
    width: 0%;
    right: 0%;
    left: auto;
  }

  100% {
    width: 100%;
    right: 0%;
    left: auto;
  }
}

/**/

.menu-wrapper:hover .menu-bar.active {
  animation: none;
}
.active .one {
  top: 50%;
  left: 0%;
  transform: rotate(45deg);
}
.active .two {
  top: 50%;
  left: 0%;
  transform: rotate(-45deg);
}
</style>
