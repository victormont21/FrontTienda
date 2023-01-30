<template>
  <div>
    
    <v-app-bar
      color="surface"
      height="80"
      class="el"
      :style="{
        padding: $vuetify.breakpoint.mdAndUp ? '0px 100px' : '',
      }"
      app
    >
      <v-toolbar-title
        @click="$router.push('/')"
        class="text-md-h5 font-weight-bold pointer" style="color:#E94560"
        >CEBOLLITAS STORE</v-toolbar-title
      >
      <v-spacer />

      <v-btn nuxt to="/login" v-if="!isLogin" class="mr-md-2" icon>
        <v-icon size="20">mdi-account</v-icon>
      </v-btn>

      <v-btn v-if="isLogin" @click="logOut()" class="mr-md-2" icon>
        <v-icon size="20">mdi-logout</v-icon>
      </v-btn>

      
      <v-badge
        v-if="$store.state.cart.cart.length > 0"
        overlap
        :content="`${$store.state.cart.cart.length}`"
      >
        <v-btn nuxt to="/cart" icon>
          <v-icon size="20">mdi-cart-outline</v-icon>
        </v-btn>
      </v-badge>
      <v-btn v-else nuxt to="/cart" icon>
        <v-icon size="20">mdi-cart-outline</v-icon>
      </v-btn>

      <v-btn nuxt to="/compras" v-if="isLogin" @click="logOut()" class="mr-md-2" icon>
        <v-icon size="20">mdi-book-open</v-icon>
      </v-btn>

      <v-divider vertical class="mx-md-5 mx-2" />
      <v-btn @click="toggleTheme" icon>
        <v-icon size="20">mdi-brightness-7</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
      return {
        isLogin:false,
      }
    },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    logOut(){
        this.$cookies.set("email",null)
        this.isLogin = false
        this.$nuxt.refresh()
        this.$router.push("/");
      }
  },mounted() {
      if(this.$cookies.get("email") != null && this.$cookies.get("email") != "" &&
         this.$cookies.get("email") != undefined)
      {
        this.isLogin = true
      }else{
        this.isLogin = false
      }
    },
};
</script>

<style></style>
