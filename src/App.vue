<template>
  <v-app>
    <v-app-bar app dark elevation="4" dense hide-on-scroll>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>TO-DO APP</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-app-bar-title v-if="this.$store.state.selectedUser"> {{ this.$store.state.selectedUser.name }}</v-app-bar-title>

      <v-menu v-if="this.$store.state.selectedUser">
        <template v-slot:activator="{on,attrs}">
          <v-btn small fab v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title class="mr-2">Logout</v-list-item-title>
            <v-icon>mdi-logout</v-icon>
          </v-list-item>
        </v-list>
      </v-menu>

    </v-app-bar>
    <v-navigation-drawer
        v-model="drawer"
        app
        dark
        bottom
        temporary
    >
      <v-list nav>
        <v-list-item-group
            v-model="group"
        >
          <v-list-item to="/" v-if="!this.$store.state.selectedUser">
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>
          <v-list-item to="/task" v-if="this.$store.state.selectedUser">
            <v-list-item-icon>
              <v-icon>mdi-list-box-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Tasks</v-list-item-title>
          </v-list-item>
          <v-list-item to="/completedtasks" v-if="this.$store.state.selectedUser">
            <v-list-item-icon>
              <v-icon>mdi-playlist-check</v-icon>
            </v-list-item-icon>
            <v-list-item-title>CompletedTasks</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      group: null,
    }
  },
  created() {
    this.$store.dispatch('getListOfUsers');
  },
  methods: {
    logout() {
      this.$store.commit('logout')
      this.$router.push('/')
    }
  },
  watch: {
    group() {
      this.drawer = false
    },
  },
};
</script>
