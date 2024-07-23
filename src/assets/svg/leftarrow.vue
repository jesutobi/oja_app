<template>
  <div>
    <!-- <?xml version="1.0" encoding="utf-8"?> -->
    <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg :width="Size" :height="Size" viewBox="0 0 1024 1024" version="1.1">
      <path
        :fill="color"
        d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z"
      />
    </svg>
  </div>
</template>

<script setup>
defineProps({
  Size: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  }
})
</script>

<style></style>
