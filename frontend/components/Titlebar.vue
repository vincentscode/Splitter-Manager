<template>
  <div>
    <!-- Primary Titlebar -->
    <div id="titlebar">
      <div style="float:left; width:20%; display: flex;">
        <img src="https://upload.wikimedia.org/wikipedia/de/thumb/b/b9/Splittermond_Rollenspiel_Logo.png/1200px-Splittermond_Rollenspiel_Logo.png">
      </div>
      <div style="float:left; width:50%; margin-top: auto; margin-bottom: auto; text-align:start; color:#979AA4!important;">
        <h1 style="font-size: 18px">{{ title }}</h1>
      </div>
      <div style="float:left; width:50%; margin-top: auto; margin-bottom: auto; text-align:end; color:#ffffff!important;">
        <a @click="$store.commit('setUserInfo', {}); $store.commit('setLoggedIn', false)" v-if="$store.state.loggedIn">[Ausloggen]</a>
        <span v-if="$store.state.loggedIn">{{ $store.state.userInfo.displayName }}</span>
        <span v-else>
          <NuxtLink to="/login">Einloggen</NuxtLink>
          <NuxtLink to="/register">Registrieren</NuxtLink>
        </span>
      </div>
    </div>

    <!-- Secondary Titlebar -->
    <div id="secondary-titlebar" style="display: flex;">
      <div style="margin-top: auto; margin-bottom: auto; text-align:start; color:#979AA4!important; display:block; padding-right: 20px;">
        <NuxtLink to="/">Home</NuxtLink>
      </div>
      <div style="margin-top: auto; margin-bottom: auto; text-align:start; color:#979AA4!important; display:block; padding-right: 20px;">
        <NuxtLink to="/library">Bibliothek</NuxtLink>
      </div>
      <div style="margin-top: auto; margin-bottom: auto; text-align:start; color:#979AA4!important; display:block; padding-right: 20px;">
        <a href="https://splitterwiki.de/wiki/Splitterwiki">Splitterwiki</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title'],
}
</script>

<style>
#titlebar {
  padding-left: 20%;
  padding-right: 20%;

  height: 64px;
  display: flex;

  background: #090809;
  color: #fff;

  border-bottom: 1px solid #3B7EB2;
}
#secondary-titlebar {
  padding-left: 20%;
  padding-right: 20%;

  height: 50px;
  display: flex;

  background: #26282A;
  color: #a5afba;

  border-bottom: 1px solid #333333;

  font-size: 15px;
}
#secondary-titlebar > * > a {
  text-decoration: none;
  color: #a5afba;
}
#secondary-titlebar > * > a:hover {
  color: #fff;
}

</style>
