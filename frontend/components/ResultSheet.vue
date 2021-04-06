<template>
  <div id="sheet-container" style="padding-top: 7px;">
    <object id="pdf-viewer" type="application/pdf" width="100%" height="3230px" style="display: inline-block"></object>
    <div v-for="(itemValue, itemKey) in stepsValues" :key="itemKey">
      <b>{{itemKey}}</b><p>{{itemValue}}</p>
    </div>
  </div>
</template>

<script>
const pdfHelper = require('/helpers/PdfHelper.js');

export default {
  props: ['stepsValues', 'pdfData'],
  created() {
    pdfHelper.generatePdf(this.stepsValues).then(pdfData => {
    const blob = new Blob([pdfData], { type: 'application/pdf' })
    const obj =  URL.createObjectURL(blob);
    document.getElementById("pdf-viewer").data = obj;
});
  }
}
</script>

<style>
</style>
