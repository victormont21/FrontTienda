<template>
  <v-slide-group>
    <v-slide-item v-for="(p, i) in mListaProductos" :key="`hotProduct-${i}`">
      <v-card
        nuxt
        :to="`/productsAdmin/${p.id}`"
        color="surface"
        width="300"
        class="el ma-2 mb-5 mr-5"
      >
        <v-chip
        v-if="p.activo == 0"
          class="ma-2 chipAbsolute"
          close
          color="red"
          text-color="white"
        >
          DESACTIVADO
        </v-chip>

        <v-img :src="p.foto" height="300">
          <template #placeholder>
            <v-row class="fill-height" justify="center" align="center">
              <v-progress-circular
                width="2"
                size="100"
                color="primary"
                indeterminate
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>

        <v-card-title class="text-md-body-1 font-weight-bold">{{
          p.nombre
        }}</v-card-title>
        <v-card-subtitle class="primary--text pb-3">
          ${{ Number(p.precio).toFixed(2) }}
        </v-card-subtitle>
        <v-card-text>
          <v-chip
            x-small
            label
            outlined
            class="mr-1"
            v-for="(t, i) in p.tags"
            :key="`prod${p.id}-${i}`"
          >
            {{ t }}
          </v-chip>
        </v-card-text>
      </v-card>
    </v-slide-item>
  </v-slide-group>
</template>

<script>
export default {
  props: {
    products: Array,
  },
  data() {
    return {
      mListaProductos: [],
    };
  },
  methods: {
    async initListaProductos() {
      this.mListaProductos = [];
      var datos = await this.$axios.get(
        process.env.baseUrl + "/productos?is_active=0&categoria=0"
      );
      this.mListaProductos.push(...datos.data);
      console.log(datos.data);
    },
  },
  mounted() {
    this.initListaProductos();
  },
};
</script>

<style>
.chipAbsolute{
  position: absolute;
  z-index: 9999999;
}
</style>
