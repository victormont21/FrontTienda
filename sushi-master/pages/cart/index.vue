<template>
  <div>
    <DesktopNav />
    <br />
    <div class="text-center" v-if="$store.state.cart.cart.length == 0">
      <v-img class="d-block mx-auto" src="/emptycart.svg" width="500"></v-img>
      <p>ACTUALMENTE NO TIENE PRODUCTOS EN EL CARRITO.</p>
    </div>
    <v-container>
      <div
        style="display: flex; align-content: center; align-items: center"
        v-if="$store.state.cart.cart.length > 0"
      >
        <v-btn
          nuxt
          min-width="150"
          v-if="isUsuarioLogin"
          @click="completarPagoPaypal()"
          min-height="45"
          color="primary"
          style="margin-right: 2rem"
          >COMPLETAR PAGO</v-btn
        >

        <PayPal
          :amount="getDinero()"
          currency="USD"
          v-if="isUsuarioLogin"
          :client="credentials"
          env="sandbox"
          v-on:payment-authorized="paymentAuthorized"
          v-on:payment-completed="paymentCompleted"
          v-on:payment-cancelled="paymentCancelled"
        >
        </PayPal>
      </div>
      <br />

      <v-row>
        <template v-for="(c, i) in $store.state.cart.cart">
          <v-col :key="`cartItem${i}`">
            <v-card color="surface" flat>
              <v-btn
                @click="$store.commit('cart/RemoveCartItem', i)"
                absolute
                top
                right
                icon
              >
                <v-icon size="18">mdi-delete</v-icon>
              </v-btn>

              <v-row dense>
                <v-col md="3">
                  <v-img
                    class="rounded-lg"
                    height="220"
                    :src="c.product.foto"
                  ></v-img>
                </v-col>
                <v-col class="pl-5 pt-2" md="9">
                  <h2 class="text-md-h6 font-weight-bold">
                    {{ c.product.nombre }} x {{ c.quantity }}
                  </h2>
                  <p class="primary--text mt-2">
                    {{ $formatMoney(c.product.precio * c.quantity) }}
                  </p>
                  <v-btn
                    @click="$store.commit('cart/IncreaseItemCount', i)"
                    icon
                  >
                    <v-icon size="20">mdi-plus-circle</v-icon>
                  </v-btn>
                  <span class="mx-2">{{ c.quantity }}</span>
                  <v-btn
                    @click="$store.commit('cart/DecreaseItemCount', i)"
                    icon
                  >
                    <v-icon size="20">mdi-minus-circle</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </template>
      </v-row>
    </v-container>
    <br /><br />
    <Footer />
    <ScrollTop />
  </div>
</template>

<script>
import PayPal from "vue-paypal-checkout";
export default {
  components: {
    PayPal,
  },
  data() {
    return {
      isUsuarioLogin: false,
      idPaypal: "",
      credentials: {
        sandbox:
          "AQT2D7AdhMr9XhZQMLcaIwTKl0pO_VZvocauIlFJM5212uNjDqoD6vhmO_WcekOCOd15RIB1ZRt7AXkm",
        production:
          "AQT2D7AdhMr9XhZQMLcaIwTKl0pO_VZvocauIlFJM5212uNjDqoD6vhmO_WcekOCOd15RIB1ZRt7AXkm",
      }
    };
  },
  methods: {
    async paymentAuthorized(data) {
      try {
        console.log("AUTORIZADO");
        console.log(data);
        console.log("------------------------");
      } catch (error) {
        console.log("AUTORIZADO ERROR");
        console.log(error);
      }
    },
    async paymentCompleted(data) {
      try {
        console.log("COMPLETADO");
        
        console.log(data);
        this.idPaypal = data.id;
        await this.completarPagoPaypal();
      } catch (error) {
        console.log("--------------------- ERROR COMPLETED");
        console.log(error);
      }
    },
    async paymentCancelled(data) {
      console.log("CNACELADO");
      console.log(data);
      alert("PAYPAL paymentCancelled");
    },

    formatted_date() {
      var result = "";
      var d = new Date();
      result +=
        d.getFullYear() +
        "/" +
        (d.getMonth() + 1) +
        "/" +
        d.getDate() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds();
      return result;
    },
    async completarPagoPaypal() {
      var datos = localStorage.getItem("myCart");
      var totalDinero = 0;
      var items = {
        email_cliente: this.$cookies.get("email"),
        total: 0,
        date_compra: this.formatted_date(),
        detalle_compra: [],
      };

      if (datos.length > 0) {
        var datosJSON = JSON.parse(datos);
        console.log("--------------------------------------------");
        console.log(datosJSON);
        console.log("--------------------------------------------");
        for (var i = 0; i < datosJSON.length; i++) {
          totalDinero =
            totalDinero +
            parseFloat(datosJSON[i].product.precio) * datosJSON[i].quantity;
          items.detalle_compra.push(datosJSON[i]);
        }

        items.detalle_compra = JSON.stringify(items.detalle_compra);

        items.total = totalDinero;
        items.id_paypal = this.idPaypal;

        console.log(items);

        var datos_ = await this.$axios.post(
          process.env.baseUrl + "/compra",
          items
        );

        if (
          datos_.data.email_cliente != "" &&
          datos_.data.detalle_compra != ""
        ) {
          localStorage.setItem("myCart", JSON.stringify([]));

          this.$swal({
            toast: true,
            text: "PAGO REALIZADO CON EXITO",
            icon: "success",
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false,
            position: "top-end",
          });

          this.$store.commit("cart/ClearCart");
          this.$nuxt.refresh();
          this.$router.push("/");
        } else {
          alert("ERRRO AL CREAR COBRO");
        }
      } else {
        alert("SIN DATOS STORE");
      }
    },
    getDinero() {
      var datos = localStorage.getItem("myCart");

      var precioTotal = 0;

      var amount = {
        currency: "USD",
        total: "0.00",
      };

      var item = [];

      if (datos.length > 0) {
        var datosJSON = JSON.parse(datos);

        for (var i = 0; i < datosJSON.length; i++) {
          var cantidad = datosJSON[i].quantity;

          precioTotal =
            precioTotal + parseFloat(datosJSON[i].product.precio) * cantidad;

          var obj = {
            name: datosJSON[i].product.nombre,
            sku: datosJSON[i].product.nombre,
            price: precioTotal.toFixed(2),
            currency: "USD",
            quantity: 1,
          };

          item.push(obj);
        }

        amount.total = Number(precioTotal).toFixed(2);
        return amount.total;
      }

      return 0;
    },
  },
  mounted() {
    if (this.$cookies.get("email") != null && this.$cookies.get("rol") == 2) {
      this.isUsuarioLogin = true;
    }
  },
};
</script>

<style></style>
