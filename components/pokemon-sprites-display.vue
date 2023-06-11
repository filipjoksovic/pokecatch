<script setup lang='ts'>
  import { PokemonSprites } from '~/utils/types'

  defineProps<
    {
      sprites: Partial<PokemonSprites>
    }
  >()
</script>

<template>
  <v-carousel hide-delimiters show-arrows='hover'>
    <v-carousel-item
      :src='sprites?.front_default'

    ></v-carousel-item>

    <v-carousel-item
      :src='sprites?.back_default'

    ></v-carousel-item>

    <v-carousel-item
      :src='sprites?.front_shiny'

    ></v-carousel-item>

    <v-carousel-item
      :src='sprites?.back_shiny'

    ></v-carousel-item>

  </v-carousel>
</template>
