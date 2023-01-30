<template>
  <div>
    <DesktopNav />
    <HomeCarousel :sale_items="sale_items" />
    <br /><br />
    <v-container>
      <h1 class="text-md-h4 text-h6">Nuestros Productos</h1>
      <br />

      <v-tabs>
        <v-tab v-for="oC in listCategories" :key="oC.id" @click="readProductsPorCategoria(oC.id)">{{oC.detalle}}</v-tab>
      </v-tabs>

      <ProductSlider :products="mListaProductos" />
      <br /><br /><br />
      <!--<Newsletter />-->
    </v-container>
    <br /><br />
    <Footer />
    <ScrollTop />
  </div>
</template>

<script>
import { tsParenthesizedType } from '@babel/types';

export default {
  async created() {
    this.sale_items = [
      {
        id: 1,
        name: "LEE",
        onSale: false,
        tags: ["Comida", "Sushi"],
        image:
          "https://firebasestorage.googleapis.com/v0/b/vigitrack-empresas.appspot.com/o/lee.png?alt=media",
        description:
          "Conoce nuestras opciones de fits, desde ceñidos al cuerpo hasta estilos más relajados. Empieza el año con un Outfit LEE con el 20 al 50% off en prendas seleccionadas. Todos van Contigo. Más Cómodo, Más Lee. Envíos a todo el país. Modelos: Jeans, Camisas, Blusas.",
        price: 10.5,
        salePrice: 10.8,
        ratings: 4.0,
      },
      {
        id: 2,
        name: "HOLLISTER",
        onSale: true,
        tags: ["Comida", "Onigiri"],
        image:
          "https://firebasestorage.googleapis.com/v0/b/vigitrack-empresas.appspot.com/o/hollister.png?alt=media",
        description:
          "Hollister crea jeans, tops, sudaderas con capucha y otras prendas frescas, diseñadas para que tú y el resto de los jóvenes se sientan cómodos con su cuerpo.",
        price: 9.2,
        salePrice: 9.8,
        ratings: 4.5,
      },
      {
        id: 3,
        name: "KOAJ",
        onSale: true,
        tags: ["Nike", "Men"],
        image:
          "https://firebasestorage.googleapis.com/v0/b/vigitrack-empresas.appspot.com/o/koaj.png?alt=media",
        description:
          "Koaj es una marca que refleja una manera joven de sentir la moda, con una creación dinámica en colores y siluetas, inspiradas en las últimas tendencias.",
        price: 20.1,
        salePrice: 21.8,
        ratings: 4.5,
      },
    ];
  },
  data() {
    return {
      products: null,
      sale_items: null,
      mListaProductos:[],
      listCategories:[{
        id:0,
        detalle:"TODAS LAS CATEGORIAS"
      }]
    };
  },
  methods: {

    async readProductsPorCategoria(id){
      console.log(id)
      this.initListaProductos(id)
    },

    async readCategories()
    {
      try {
        var datos = await this.$axios.get(process.env.baseUrl+"/categorias")
      
      if(datos.data !=null || datos.data.length > 0)
      {
        this.listCategories.push(...datos.data)
      }
      } catch (error) {
       console.log(error) 
      }
    },

    async initListaProductos(categoria){
      this.mListaProductos = []
      var datos = await this.$axios.get(process.env.baseUrl+"/productos?is_active=1&categoria="+categoria)
      this.mListaProductos.push(...datos.data)
      console.log(datos.data)
    }
  },
  mounted() {
    this.readCategories()
    this.initListaProductos(0)
  },
};
</script>

<style></style>
