<template>
  <div class="container">
    <div class="content">
      <label>Anzeigename</label>
      <input type="text" v-model="displayName" /><br><br>
      <label>E-Mail</label>
      <input type="email" v-model="email" /><br><br>
      <label>Passwort</label>
      <input type="password" v-model="password" /><br><br>
      <button @click="register">Registrieren</button>
      <span v-if="error" style="color: red">{{error}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      displayName: "",
      email: "",
      password: "",
      error: undefined
    } 
  },
  methods: {
    async register() {
      const postData = {
        email: this.email,
        password: this.password,
        displayName: this.displayName
      }

      try {
        const registerResponse = await this.$axios.post(this.$store.state.backendUrl + '/api/users/', postData);
        const response = await this.$axios.post(this.$store.state.backendUrl + '/api/users/login', postData);
        const infoResponse = await this.$axios.get(this.$store.state.backendUrl + '/api/users/me', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + response.data["token"]
          }
        });
        var userInfo = infoResponse.data;
        userInfo.accessToken = response.data["token"];
        this.$store.commit('setUserInfo', userInfo)
        this.$store.commit('setLoggedIn', true)
        this.$router.push({path: '/'});
      } catch (err) {
        this.error = err;
      }
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
}
.content {
  padding-top: 25px; 
  padding-left: 20%;
  padding-right: 20%;

  color: #000000;
}
</style>
