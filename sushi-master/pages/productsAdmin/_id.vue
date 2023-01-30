<template>
  <div>
    <ComponentNavAdmin />
    <v-container v-if="product">
      <v-btn
      v-if="product.activo == 1"
        min-width="100"
        min-height="45"
        color="red"
        @click="deleteProducto()"
        style="color: white"
        >ELIMINAR</v-btn
      >

      <v-btn
      v-if="product.activo == 0"
        min-width="200"
        min-height="45"
        color="secondary"
        @click="activeProducto()"
        style="color: white"
        >ACTIVAR PRODUCTO</v-btn
      >

      <v-btn
        min-width="100"
        min-height="45"
        color="primary"
        @click="updateProducto()"
        style="color: white"
        >ACTUALIZAR</v-btn
      >

      <div lazy-validation ref="form" class="mt-2">

        <v-chip v-if="product.activo == 0" style="color:white" close close-icon="mdi-close-outline" color="red"><span style="color:white">PRODUCTO ELIMINADO</span></v-chip>

        <v-radio-group row v-model="modalIdCategoria">
          <v-radio
            v-for="n in listCategories"
            :key="n.id"
            :label="`${n.detalle}`"
            :value="n.id"
          ></v-radio>
        </v-radio-group>

        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="product.nombre"
              outlined
              label="Nombre Producto"
              type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="product.descripcion"
              outlined
              label="Descripción Producto"
              type="text"
            ></v-text-field>
          </v-col>
          <!--<v-col cols="12" md="4">
    <v-text-field
      v-model="modalCategoriasProducto"
      outlined
      label="Categoria"
      type="text"
    ></v-text-field>
  </v-col>-->

          <v-col cols="12" md="4">
            <v-text-field
              v-model="product.precio"
              outlined
              label="Precio Producto"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="product.detalleProveedor"
              outlined
              label="Detalle Proveedor"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="product.stock"
              outlined
              label="Stock"
              type="number"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-img
              class="center-cropped"
              lazy-src="https://picsum.photos/id/11/10/6"
              max-height="150"
              :src="product.foto"
            ></v-img>
          </v-col>

          <v-col cols="12" md="12">
            <v-text-field
              v-model="product.foto"
              outlined
              label="Imagen Producto"
              type="text"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>

      <!--<v-row justify="center">
        <v-col cols="11" md="7">

          <h2 class="text-center text-md-h4 font-weight-bold">
            {{ product.nombre }}
          </h2>
          <div class="mt-2 text-center">
            <v-rating
              readonly
              half-increments
              class="mb-2"
              color="yellow darken-2"
              background-color="grey lighten-1"
              :value="product.ratings == undefined ? 4 : product.ratings"
              dense
              size="20"
            ></v-rating>
            <v-chip
              small
              label
              outlined
              class="mr-1"
              v-for="(t, i) in product.tags"
              :key="`prod${product.id}-${i}`"
            >
              {{ t }}
            </v-chip>
          </div>
          <br />
          <v-img
            width="40vh"
            class="el rounded-lg"
            height="40vh"
            :src="product.foto"
          ></v-img>
          <p class="mt-5 mb-7">
            {{ product.descripcion }}
          </p>
        </v-col>
      </v-row>-->
    </v-container>
    <Footer />
    <ScrollTop />
  </div>
</template>

<style>
.center-cropped {
  width: 150px;
  height: 150px;
  border-style: solid;
  border-color: black;
  background-position: center center;
  background-repeat: no-repeat;
}
</style>

<script>
import NavAdmin from "../../components/Desktop/NavAdmin.vue";

export default {
  components: {
    ComponentNavAdmin: NavAdmin,
  },
  methods: {
    async deleteProducto() {
      var body = {data:this.product}
      console.log(body)
      var datos = await this.$axios.delete(
        process.env.baseUrl + "/delete_producto",body);
      //this.$router.push("/indexAdmin");

      if (datos.data.code == 200) {
        this.$swal({
          toast: true,
          text: datos.data.message,
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
        });
        this.readPRoducto()
      } else {
        this.$swal({
          toast: true,
          text: datos.data.message,
          icon: "warning",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
        });
      }
    },
    async activeProducto() {

      var datos = await this.$axios.put(
        process.env.baseUrl + "/active_producto",this.product);
      //this.$router.push("/indexAdmin");

      if (datos.data.code == 200) {
        this.$swal({
          toast: true,
          text: datos.data.message,
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
        });
        this.readPRoducto()
      } else {
        this.$swal({
          toast: true,
          text: datos.data.message,
          icon: "warning",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
        });
      }
    },
    async updateProducto() {
      this.product.fk_categoria = this.modalIdCategoria;
      var datos = await this.$axios.put(
        process.env.baseUrl + "/update_producto",
        this.product
      );

      if (datos.data.code == 200) {
        this.$swal({
          toast: true,
          text: datos.data.message,
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
        });
      } else {
        this.$swal({
          toast: true,
          text: datos.data.message,
          icon: "warning",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
        });
      }
    },
    async readCategories() {
      try {
        var datos = await this.$axios.get(process.env.baseUrl + "/categorias");

        if (datos.data != null || datos.data.length > 0) {
          this.listCategories.push(...datos.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async readPRoducto(){
      let datos = await this.$axios.get(
      process.env.baseUrl +
        "/detalle_producto?producto=" +
        this.product.id
    );
    this.product = datos.data;
    this.modalIdCategoria = this.product.fk_categoria;
    }
  },
  async created() {
    let datos = await this.$axios.get(
      process.env.baseUrl +
        "/detalle_producto?producto=" +
        this.$route.params.id
    );
    this.product = datos.data;
    this.modalIdCategoria = this.product.fk_categoria;
  },
  data() {
    return {
      product: null,
      listCategories: [],
      modalIdCategoria: 0,
    };
  },
  mounted() {
    this.readCategories();
  },
};
</script>
