<!--Toaster component to avoid MUI rules of snackbars being stuck to bottom-->
<script setup lang='ts'>
  import { useToasterStore } from '~/store/toaster.store'
  import { storeToRefs } from 'pinia'

  const toasterStore = useToasterStore()
  const { visible, message, timeout, icon, type, contentClass } = storeToRefs(toasterStore)
</script>

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

<style>
    //reset for snackbar as toaster implementation
    .top-0 {
        top: 0 !important;
        bottom: unset !important;
        left: unset !important;
        transform: unset !important;
        right: 0 !important;
    }
</style>