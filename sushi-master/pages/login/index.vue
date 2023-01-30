<template>
  <div>
   
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <!-- Icon -->
        <div class="fadeIn first">
          <v-toolbar-title
            @click="$router.push('/')"
            class="text-md-h5 font-weight-bold pointer"
            style="color: #e94560"
            >CEBOLLITAS STORE</v-toolbar-title
          >
        </div>

        <!-- Login Form -->
        <div>
          <input
            type="text"
            id="login"
            v-if="banderaRegistro"
            class="fadeIn second"
            v-model="modelCrearNombre"
            name="login"
            placeholder="Ingrese su Nombre"
          />
          <input
            type="text"
            id="login"
            v-if="banderaRegistro"
            class="fadeIn second"
            name="login"
            v-model="modelCrearTelefono"
            placeholder="Ingrese su Telefono"
          />

          <input
            type="text"
            id="password"
            v-if="banderaRegistro"
            class="fadeIn third"
            v-model="modelCrearUsuario"
            name="login"
            placeholder="Ingrese su Corrreo"
          />
          <input
            type="text"
            id="password"
            class="fadeIn third"
            v-model="modelCrearPassword"
            name="login"
            v-if="banderaRegistro"
            placeholder="Ingrese su Contraseña"
          />

          <input
            type="text"
            id="login"
            v-model="modelUsuario"
            class="fadeIn second"
            name="login"
            v-if="!banderaRegistro"
            placeholder="Ingrese su correo electronico"
          />
          <input
            type="text"
            id="password"
            v-model="modelPassword"
            v-if="!banderaRegistro"
            class="fadeIn third"
            name="login"
            placeholder="Ingrese su contraseña"
          />

          <input
            type="submit"
            class="fadeIn fourth"
            v-if="!banderaRegistro"
            @click="loginUsuario()"
            value="INICIAR SESSION"
          />

          <input
            type="submit"
            style="background-color: red"
            class="fadeIn fourth"
            v-if="!banderaRegistro"
            @click="crearNewCuenta()"
            value="CREAR NUEVA CUENTA"
          />

          <input
            type="submit"
            class="fadeIn fourth"
            @click="crearNewCuentaApi()"
            v-if="banderaRegistro"
            value="REGISTRATE"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
a {
  color: #92badd;
  display: inline-block;
  text-decoration: none;
  font-weight: 400;
}

.h2Login {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  margin: 40px 8px 10px 8px;
  color: #cccccc;
}

/* STRUCTURE */

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 85vh;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
}

#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
}

#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}

/* TABS */

h2.inactive {
  color: #cccccc;
}

h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #5fbae9;
}

/* FORM TYPOGRAPHY*/

input[type="button"],
input[type="submit"],
input[type="reset"] {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type="button"]:hover,
input[type="submit"]:hover,
input[type="reset"]:hover {
  background-color: #39ace7;
}

input[type="button"]:active,
input[type="submit"]:active,
input[type="reset"]:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

input[type="text"] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type="text"]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}

input[type="text"]:placeholder {
  color: #cccccc;
}

/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fadeIn {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;

  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
  animation-duration: 1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #56baed;
  content: "";
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #0d0d0d;
}

.underlineHover:hover:after {
  width: 100%;
}

/* OTHERS */

*:focus {
  outline: none;
}

#icon {
  width: 60%;
}

* {
  box-sizing: border-box;
}
</style>
<script>
export default {
  data() {
    return {
      banderaRegistro: false,
      oDataLogin: null,
      modelUsuario: "",
      modelPassword: "",

      modelCrearUsuario: "",
      modelCrearPassword: "",
      modelCrearNombre: "",
      modelCrearDni: "",
      modelCrearTelefono: "",
    };
  },
  methods: {
    crearNewCuenta() {
      this.banderaRegistro = true;
    },

    async crearNewCuentaApi() {
      var datos = await this.$axios.post(
        process.env.baseUrl + "/usuario",
        {
          nombres: this.modelCrearNombre,
          email: this.modelCrearUsuario,
          telefono: this.modelCrearTelefono,
          contrasenia: this.modelCrearPassword,
          fk_rol:2
        }
      )

      console.log(datos.data)

      if (
        datos.data.email == null &&
        datos.data.fk_rol == "" &&
        datos.data == undefined
      ) {
        this.$swal({
          toast: true,
          text: "No se pudo crear la cuenta nueva : "+this.modelCrearNombre,
          icon: "warning",
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
        });
      } else {
        //this.$nuxt.refresh()
        this.modelPassword = this.modelCrearPassword
        this.modelUsuario = this.modelCrearUsuario
        await this.loginUsuario()
        this.$router.push("/");
      }


    },

    async loginUsuario() {
      var datos = await this.$axios.post(
        process.env.baseUrl + "/login_usuario",
        {
          contrasenia: this.modelPassword,
          email: this.modelUsuario,
          fk_rol:2
        }
      );

      console.log(datos.data)

      if (
        datos.data.email == null &&
        datos.data.fk_rol == 0
      ) {
        this.$swal({
          toast: true,
          text: "Credenciales no válidas.",
          icon: "warning",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "top-end",
        });
      } else {
        this.$cookies.set("email", datos.data.email);
        this.$cookies.set("rol", datos.data.fk_rol);
        this.$router.push("/");
      }
    },
  },
  mounted() {},
};
</script>

<style></style>
