<!--Toaster component to avoid MUI rules of snackbars being stuck to bottom-->
<template>
  <v-snackbar
    v-model='visible'
    v-bind:timeout='timeout'
    v-bind:content-class='contentClass'
  >
    <v-icon class='mr-3' v-bind:icon='icon' size='x-large'></v-icon>
    <span>{{ message }}</span>

    <template v-slot:actions>
      <v-icon
        icon='mdi-close'
        @click='visible = false'

      >
      </v-icon>
    </template>
  </v-snackbar>
</template>

<script setup lang='ts'>
  import { useToasterStore } from '~/store/toaster.store'
  import { storeToRefs } from 'pinia'

  const toasterStore = useToasterStore()
  const { visible, message, timeout, icon, type, contentClass } = storeToRefs(toasterStore)
</script>

<style>
    .position-top {
        top: 0 !important;
        bottom: unset !important;
        left: unset !important;
        transform: unset !important;
        right: 0 !important;
    }
</style>