<template>
  <div>
    <ComponentNavAdmin />
    <br /><br />
    <v-container>
      <v-btn
        nuxt to="/admin/Newproductos"
        min-width="150"
        min-height="45"
        color="primary"
        >REGISTRAR NUEVO PRODUCTO</v-btn
      >
      <br />
      <ProductSliderAdmin :products="sale_items" />
      <br /><br /><br />
      <!--<Newsletter />-->
    </v-container>
    <br /><br />
    <Footer />
    <ScrollTop />



  </div>
</template>

<script>
import NavAdmin from "../components/Desktop/NavAdmin";
import { Table, TableColumn, Dialog } from "element-ui";
export default {
  components: {
    ComponentNavAdmin: NavAdmin,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dialog.name]: Dialog,
  },
  async created() {
    this.sale_items = [
      {
        id: 1,
        name: "Sushi Mixto",
        onSale: false,
        tags: ["Comida", "Sushi"],
        image:
          "https://firebasestorage.googleapis.com/v0/b/vigitrack-empresas.appspot.com/o/301128508_168638429051724_4155866758676802258_n.jpg?alt=media",
        description:
          "Sushi es un plato típico de origen japonés basado en arroz aderezado con vinagre de arroz, azúcar y sal y combinado con otros ingredientes como pescados crudos, mariscos, verduras, etc.",
        price: 10.5,
        salePrice: 10.8,
        ratings: 4.0,
      },
      {
        id: 2,
        name: "Onigiri",
        onSale: true,
        tags: ["Comida", "Onigiri"],
        image:
          "https://firebasestorage.googleapis.com/v0/b/vigitrack-empresas.appspot.com/o/329083.jpg?alt=media",
        description:
          "Onigiri también conocido como Omusubi es un plato japonés que consiste en una bola de arroz rellena o mezclada con otros ingredientes. Suele tener forma triangular u oval, y a veces está envuelta en una pequeña tira de alga nori.",
        price: 9.2,
        salePrice: 9.8,
        ratings: 4.5,
      },
      {
        id: 3,
        name: "Ramen ",
        onSale: true,
        tags: ["Nike", "Men"],
        image:
          "https://firebasestorage.googleapis.com/v0/b/vigitrack-empresas.appspot.com/o/8496b9_dec9e6545a8e4cd4a91c50adeac43f4c_mv2.jpg?alt=media",
        description:
          "El ramen es un plato de fideos japonés. Si bien cada región de Japón tiene su propia receta de ramen, la preparación básica consiste en distintos tipos de fideos japoneses servidos en un caldo preparado.",
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
      dialogTableVisible: false,
    };
  },
  methods: {
  },mounted() {
  },
};
</script>

<style></style>
