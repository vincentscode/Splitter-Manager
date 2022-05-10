<template>
  <div class="container">
    <CreationStepSelector :steps="steps" v-bind:currentStep="currentStep" @callback="onStepSelected" />
    <div class="creator-content">
      <p v-if="$fetchState.pending">Lädt...</p>
      <p v-else-if="$fetchState.error">Fehler!</p>
      <CreationStep v-else v-bind:title="currentStep+1 + '. Schritt: ' + (false ? steps[currentStep]['title'] + ' (CharID: ' + currentCharId + ')' : '')"
                    v-bind:fields="steps[currentStep]['fields']"
                    v-bind:values="stepsValues"
                    @callback="updateFieldValue" />
    </div>
  </div>
</template>

<script>
const stepsData = require('/data/steps.js');
export default {
  title: 'Creator',
  data() {
    return {
      steps: stepsData,
      currentStep: 0,
      stepsValues: {},
      currentCharId: undefined
    }
  },
  async fetch() {
    if (typeof this.$route.query.characterId == "undefined") {
      console.log("not loading");
      return;
    } else {
      console.log("loading char from url")
    }
    await this.$axios.$get(this.$store.state.backendUrl + '/api/characters/' + this.$route.query.characterId, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.$store.state.userInfo.accessToken
      }
    }).then(charData => {
      console.log("loaded:", charData)
      this.currentCharId = charData._id;
      this.stepsValues = JSON.parse(charData["data"]);
    });
  },
  fetchOnServer: false,
  methods: {
    onStepSelected(stepIndex) {
      this.currentStep = stepIndex;
    },
    async updateFieldValue(id_value) {
      console.log("UPDATE:", id_value.id, '===', id_value.value)
      this.stepsValues[id_value.id] = id_value.value;

      const postData = {
        user: this.$store.state.userInfo._id,
        data: JSON.stringify(this.stepsValues)
      };
      if (typeof this.currentCharId == "undefined") {
        await this.$axios.$post(this.$store.state.backendUrl + '/api/characters/', postData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$store.state.userInfo.accessToken
          }
        }).then(newCharData => {
          console.log("Char created!")
          this.currentCharId = newCharData._id;
        });
      } else {
        await this.$axios.put(this.$store.state.backendUrl + '/api/characters/' + this.currentCharId, postData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.$store.state.userInfo.accessToken
          }
        }).then(resp => {
          console.log("Char updated!", resp)
        });
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
.creator-content {
  padding-left: 20%;
  padding-right: 50.5%;

  color: #000000;
}
</style>
