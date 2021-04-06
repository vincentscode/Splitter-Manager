<template>
  <div class="container">
    <div class="content">
      <h1 style="float:left;">Charaktere</h1>
      <div v-if="this.$store.state.loggedIn" style="float:left; width:100%; margin-top: 15px;">
        <p v-if="$fetchState.pending">Lädt...</p>
        <p v-else-if="$fetchState.error">Fehler!</p>
        <p v-else-if="chars.length == 0">Noch keine Charaktere</p>
        <div v-else>
          <ul>
            <CharacterButton v-for="char in chars" :key="char._id" v-bind:char="char"
                             @reloadCallback="$fetch" />
          </ul>
        </div>
        <br>
        <a class="btn" @click="$fetch"><span>Refresh</span></a>
      </div>
      <div v-else style="float:left; width:100%; margin-top: 15px;">
        <p>Logge dich ein oder registriere dich um Charaktere zu speichern und zu verwalten.</p><br>
        <a class="btn"><NuxtLink to="/login">Einloggen</NuxtLink></a><br>
        <a class="btn"><NuxtLink to="/register">Registrieren</NuxtLink></a>
      </div>
      <a class="btn" style="margin-left: auto; margin-right: 0; "><NuxtLink to="/creator">Charakterer erstellen</NuxtLink></a>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        chars: []
      }
    },
    async fetch() {
      await this.$axios.$get(this.$store.state.backendUrl + '/api/characters/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.state.userInfo.accessToken
        }
      }).then(data => {
        this.chars = [];
        data.forEach(charData => {
          const newChar = JSON.parse(charData["data"]);
          newChar._id = charData._id;
          this.chars.push(newChar)
        });
      });
    },
    fetchOnServer: false
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
.btn {
  cursor: pointer;
  box-sizing: inherit;
  outline: 0;
  color: #242527;
  text-decoration: none;
  width: auto!important;
  padding: 8px 16px;
  max-width: 255px;
  background: black;
  border: 2px solid #3B7EB2;
  border-radius: 3px;
  margin: 0;
  display: block;
}

.btn > * {
  line-height: 2!important;
  visibility: visible!important;
  box-sizing: inherit;
  outline: 0;
  width: 100%;
  padding: 0;
  white-space: nowrap;
  display: block;
  font-weight: bold;
  font-size: 13px;
  text-align: center;
  color: white;
  letter-spacing: 1px;
  margin: 0 auto;
  border-radius: 3px;
  text-transform: uppercase;
  text-decoration: none;
}
</style>