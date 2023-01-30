<template>
  <div>
    <ComponentNavAdmin />

    <v-container>
      <div lazy-validation ref="form" class="mt-2">

        <v-radio-group row v-model="modalIdCategoria">
          <v-radio
            v-for="n in listCategories"
            :key="n.id"
            :label="`${n.detalle}`"
            :value="n.id"
          ></v-radio>
        </v-radio-group>

        <p class="font-weight-bold">Nuevo Producto</p>
        

        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="modalNameProducto"
              outlined
              label="Nombre Producto"
              type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="modalDescripProducto"
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
              v-model="modalPrecioProducto"
              outlined
              label="Precio Producto"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="modalDescuentoProducto"
              outlined
              label="Detalle Proveedor"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="modalStockProducto"
              outlined
              label="Stock"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="modalLinkProducto"
              outlined
              label="Imagen Producto"
              type="text"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
      <div class="mb-3">
        <v-btn
          @click="insertNuevoProducto()"
          min-width="150"
          min-height="45"
          color="primary"
          >REGISTRAR PRODUCTO</v-btn
        >
      </div>
    </v-container>
    <br /><br />
    <Footer />
    <ScrollTop />
  </div>
</template>

<script>
import NavAdmin from "../../components/Desktop/NavAdmin";
import FM from "~/mixins/FormMixinx";

export default {
  mixins: [FM],
  components: {
    ComponentNavAdmin: NavAdmin,
  },
  data() {
    return {
      modalIdCategoria:0,
      modalNameProducto: "",
      modalDescripProducto: "",
      modalCategoriasProducto: "",
      modalPrecioProducto: 0.0,
      modalDescuentoProducto: "",
      modalStockProducto: 0,
      modalLinkProducto: "",
      listCategories:[]
    };
  },
  methods: {

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
    async insertNuevoProducto() {
      
      if(this.modalIdCategoria == 0){

        this.$swal({
            toast: true,
            text: "SELECCIONES UNA CATEGORIA",
            icon: "warning",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end",
          });


      }else{
        try {
        var datos = await this.$axios.post(process.env.baseUrl + "/insert_producto", {
          nombre: this.modalNameProducto,
          descripcion: this.modalDescripProducto,
          foto: this.modalLinkProducto,
          precio: parseFloat(this.modalPrecioProducto),
          detalleProveedor: this.modalDescuentoProducto,
          stock: this.modalStockProducto,
          fk_categoria:this.modalIdCategoria
        });

        if (datos.data != null) {
          this.$router.push("/indexAdmin");
        } else {
          this.$swal({
            toast: true,
            text: "No se pudo registrar el producto",
            icon: "warning",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end",
          });
        }
      } catch (error) {
        this.$swal({
          toast: true,
          text: error.toString(),
          icon: "warning",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
        });
      }
      }
    },
  },

  mounted() {
    this.readCategories()
  },
};
</script>

<style></style>
