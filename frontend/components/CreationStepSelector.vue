<template>
  <div id="main-bar">
      <ul style="margin-top: auto; margin-bottom: auto;">
        <li v-for="step in steps" :key="step.title" @click="$emit('callback', steps.indexOf(step))" style="cursor: pointer;">
          <a>
            <span id="selected-element-span" v-if="steps.indexOf(step) === currentStep" style=" : green;">{{ step.title }}</span>
            <span v-else>{{ step.title }}</span>
          </a>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
    props: ['steps', 'currentStep'],
}
</script>

<style>
#main-bar {
  height: 75px;
  background: #000;
  color:#fff;

  padding-left: 20%;
  padding-right: 20%;
  display: flex;
}
#main-bar > ul {
  padding: 0px;
  margin: 0px;
  display: flex;
}
#main-bar > ul > li {
  list-style-type: none;
  display: inline-block;

  font-size: 15px;
  font-weight: 700;
  text-transform: uppercase;

  padding: 0px 15px 0px 0px;

  max-width: 150px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
#selected-element-span:after {
  content: "";
  display: block;
  border-bottom: 3px solid #3B7EB2;
  margin-top: 2px;
}
</style>
