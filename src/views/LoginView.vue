<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col sm="4">
        <h1 class="mb-5 text-center">Sign in</h1>
        <v-form
            ref="form"
            lazy-validation>
          <v-text-field
              class="mb-2"
              :error-messages="errorString"
              outlined
              v-model="name"
              placeholder="Type username"
              required
          ></v-text-field>
          <v-row align="center" justify="center">
            <v-btn
                :disabled="!valid"
                color="gray"
                shaped
                class="text-center"
                @click="login"
            >
              Login
              <v-icon>mdi-login</v-icon>
            </v-btn>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>



export default {
  name: 'LoginView',
  data() {
    return {
      name: '',
      errorString : '',
    }
  },
  methods: {
    async login() {
      try {
        // eslint-disable-next-line no-unused-vars
        const res = await this.$store.dispatch("fetchDataLogin", this.name);
        // await this.$router.push('/task');
        await this.$router.push('/task');

      } catch (e) {
        this.errorString = "Wrong username";
        console.error(e)
      }
    }
  },
  computed: {
    valid(){
      return this.name.length > 0
    }
  },
  watch: {
    name(oldName){
      if(oldName.length === 0){
        this.errorString = '';
      }
    }
  }

}
</script>
