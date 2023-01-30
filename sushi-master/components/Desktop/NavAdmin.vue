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
        @click="$router.push('/indexAdmin')"
        class="text-md-h5 font-weight-bold pointer" style="color:#E94560"
        >CEBOLLITAS STORE ADMINISTRADOR</v-toolbar-title
      >
      <v-spacer />

      <v-btn nuxt to="/login" v-if="!isLogin" class="mr-md-2" icon>
        <v-icon size="20">mdi-account</v-icon>
      </v-btn>

      <v-btn v-if="isLogin" @click="logOut()" class="mr-md-2" icon>
        <v-icon size="20">mdi-logout</v-icon>
      </v-btn>


      <v-btn nuxt to="/ventasRealizadas" v-if="isLogin" @click="logOut()" class="mr-md-2" icon>
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
        this.$cookies.set("token",null)
        this.isLogin = false
        this.$nuxt.refresh()
        this.$router.push("/admin");
      }
  },mounted() {
      if(this.$cookies.get("email") != null && this.$cookies.get("email") != "" &&
         this.$cookies.get("email") != undefined)
      {
        if(this.$cookies.get("fk_rol") == 1){
          this.isLogin = true
        }
      }else{
        this.isLogin = false
      }
    },
};
</script>

<style></style>
