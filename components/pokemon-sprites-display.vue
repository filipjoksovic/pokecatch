<!--Note: I am aware that this may strongly couple model image properties.
 However, since they're just images, later expansion and mapping in a different way would not present a big problem-->

<script setup lang='ts'>
  import { PokemonSprites } from '~/utils/types'

  defineProps<
    {
      sprites: Partial<PokemonSprites>
    }
  >()
</script>

<template>
  <v-carousel hide-delimiter-background='true' show-arrows='hover'>
    <v-carousel-item
      :src='sprites.front_default'

    ></v-carousel-item>

    <v-carousel-item v-if='sprites.back_default'
                     :src='sprites?.back_default'

    ></v-carousel-item>

    <v-carousel-item v-if='sprites.front_shiny'
                     :src='sprites?.front_shiny'

    ></v-carousel-item>

    <v-carousel-item v-if='sprites.back_shiny'
                     :src='sprites?.back_shiny'

    ></v-carousel-item>

  </v-carousel>
</template>
