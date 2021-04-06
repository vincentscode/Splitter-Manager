<template>
  <div id="default-container">
    <Titlebar title="Splitter-Manager" />
    <Nuxt />
  </div>
</template>

<style>
html {
  font-family: 'Garamond';
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

h1, h2, h3, h4, h5 {
  font-family: 'Almendra';
  font-weight: 400;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
}

body {
  background: url(/outr.png), url(/outl.png), #F7F7F7;
  background-repeat: repeat-y, repeat-y;
  background-position-x: right, left, center;
}

input[type="text"], input[type="number"], input[type="search"], input[type="password"], input[type="email"], textarea, select {
  font-family: 'Garamond';
  background: #fff none;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
  color: #000;
  padding: 4px;
  -webkit-transition: .2s linear border,0.2s linear box-shadow;
  -moz-transition: .2s linear border,0.2s linear box-shadow;
  transition: .2s linear border,0.2s linear box-shadow;
  width: 100%;
}

input[type=number], input[type=text] {
    width: 100%;
    padding: 10px;
}

select {
  width: 100%;
  background-color: hsla(0,0%,100%,.75);
  box-shadow: inset 0 0 4px 0 rgb(139 178 199 / 48%);
  border: 1px solid #d8dde3;
  border-radius: 0;

  display: block;
  height: 40px;
}

input:disabled, select:disabled {
  background: #ddd;
}
</style>
