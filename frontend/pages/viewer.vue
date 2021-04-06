<template>
  <div class="container">
    <div class="content">
        <h1>Viewer</h1>
        <p v-if="$fetchState.pending">Lädt...</p>
        <p v-else-if="$fetchState.error">Fehler!</p>
        <ResultSheet v-else v-bind:stepsValues="charValues"/>
    </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        charValues: undefined
      }
    },
    async fetch() {
      await this.$axios.$get(this.$store.state.backendUrl + '/api/characters/' + this.$route.query.characterId, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.state.userInfo.accessToken
        }
      }).then(charData => {
        console.log(charData)
        this.charValues = JSON.parse(charData["data"]);
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
</style>
