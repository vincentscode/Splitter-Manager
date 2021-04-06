<template>
  <div>
    <!-- Skill -->
    <div v-if="category === 'skill'" style="display: flex;">
      <div style="width:50%; padding-right:3px; margin-top: 7px;">
        <span>Kampffertigkeiten</span>
        <div style="margin-top: 7px;" v-if="skillMaxNumTotalCombat > 0">
          <div v-for="s in skills.combat" :key="s" style="display: flex;">
            <span style="display: block; margin-right: 10px; margin-top: auto; margin-bottom: auto; width: 70%; 
                         max-width: 70%; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{s}}</span>
            <input style="display: block; margin-right: 10px; width: 30%" placeholder="Wert" type="number" min="0"
                   class="skill-combat-input skill-input" :max="skillMaxNumSingleCombat"
                   
                   v-bind:style="((value ? value[skills.combat.indexOf(s)] : 0) == skillMaxNumSingleCombat) 
                   ? 'background: #4A89BF;'
                   : ((value ? value[skills.combat.indexOf(s)] : 0) > 0) ? 'background: #D5E8F6;' : ''"

                   v-bind:disabled="(value ? value[skills.combat.indexOf(s)] : 0) == 0
                                    && (getTotalValueForClass('skill-combat-input') == skillMaxNumTotalCombat || getTotalValueForClass('skill-input') == points)"

                   @change="onSkillInputChange"
                   v-bind:value="value ? value[skills.combat.indexOf(s)] : 0" />
          </div>
        </div>
      </div>
      <div style="width:50%; padding-right:3px; padding-left:3px; margin-top: 7px;">
        <span>Fertigkeiten</span>
        <div style="margin-top: 7px;" v-if="skillMaxNumTotalGeneral > 0">
          <div v-for="s in skills.general" :key="s" style="display: flex; ">
            <span style="display: block; margin-right: 10px; margin-top: auto; margin-bottom: auto; width: 70%; 
                         max-width: 70%; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{s}}</span>
            <input style="display: block; margin-right: 10px; width: 30%" placeholder="Wert" type="number" min="0"
                   class="skill-general-input skill-input" :max="skillMaxNumSingleGeneral"

                   v-bind:style="((value ? value[skills.general.indexOf(s) + skills.combat.length] : 0) == skillMaxNumSingleGeneral) 
                   ? 'background: #4A89BF;'
                   : ((value ? value[skills.general.indexOf(s) + skills.combat.length] : 0) > 0) ? 'background: #D5E8F6;' : ''"

                   v-bind:disabled="(value ? value[skills.general.indexOf(s) + skills.combat.length] : 0) == 0
                                    && (getTotalValueForClass('skill-general-input') == skillMaxNumTotalGeneral || getTotalValueForClass('skill-input') == points)"

                   @change="onSkillInputChange" v-bind:value="value ? value[skills.general.indexOf(s) + skills.combat.length] : 0" />
          </div>
        </div>
      </div>
      <div style="width:50%; padding-left:3px; margin-top: 7px;">
        <span>Magieschulen</span>
        <div style="margin-top: 7px;" v-if="skillMaxNumTotalMagic > 0">
          <div v-for="s in skills.magic" :key="s" style="display: flex;">
            <span style="display: block; margin-right: 10px; margin-top: auto; margin-bottom: auto; width: 70%; 
                         max-width: 70%; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{s}}</span>
            <input style="display: block; margin-right: 10px; width: 30%" placeholder="Wert" type="number" min="0"
                   class="skill-magic-input skill-input" :max="skillMaxNumSingleMagic"

                   v-bind:style="((value ? value[skills.magic.indexOf(s) + skills.combat.length + skills.general.length] : 0) == skillMaxNumSingleMagic) 
                   ? 'background: #4A89BF;'
                   : ((value ? value[skills.magic.indexOf(s) + skills.combat.length + skills.general.length] : 0) > 0) ? 'background: #D5E8F6;' : ''"
                   
                   v-bind:disabled="(value ? value[skills.magic.indexOf(s) + skills.combat.length + skills.general.length] : 0) == 0
                                    && (getTotalValueForClass('skill-magic-input') == skillMaxNumTotalMagic || getTotalValueForClass('skill-input') == points)"

                   @change="onSkillInputChange" v-bind:value="value ? value[skills.magic.indexOf(s) + skills.combat.length + skills.general.length] : 0" />
          </div>
        </div>
      </div>
    </div>

    <!-- Resource -->
    <div v-else-if="category === 'resource'">
      <div v-for="res in resources" :key="res" style="display: flex">
        <span style="display: block; margin-right: 10px; margin-top: auto; margin-bottom: auto; width:15%;
                     max-width: 15%; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">{{res}}</span>
        <input class="res-input-value" style="display: block; margin-right: 10px; width: 100px;" placeholder="Wert" type="number"
               @change="onResInputChange" min="0"
               
               v-bind:style="((value ? value[resources.indexOf(res)].value : 0) > 0) ? 'background: #D5E8F6;' : ''"

               v-bind:disabled="((value ? value[resources.indexOf(res)].value : 0) == 0)
                                && (getTotalValueForClass('res-input-value') == points)"

               v-bind:value="value ? value[resources.indexOf(res)].value : 0" />
        <input class="res-input-description" style="display: block;" placeholder="Bedeutung" type="text"
               @change="onResInputChange"
               v-bind:value="value ? value[resources.indexOf(res)].description : ''" />
      </div>
    </div>

    <!-- Attribute -->
    <div v-else-if="category === 'attribute'" style="display: flex;">
      <div v-for="attr in attributes " :key="attr" style="width:50%; margin-right:10px;">
        <span style="text-align: center; display: block; margin: 10px 0px;">{{ attr }}</span>
        <input class="attribute-input" type="number"
               :max="attrMaxSingle" :min="attrMinSingle"
               @change="onAttributeInputChange"

               v-bind:style="((value ? value[attributes.indexOf(attr)] : (attrMinSingle ? attrMinSingle : 0)) == attrMaxSingle) 
               ? 'background: #4A89BF;'
               : ((value ? value[attributes.indexOf(attr)] : (attrMinSingle ? attrMinSingle : 0)) > (attrMinSingle ? attrMinSingle : 0)) ? 'background: #D5E8F6;' : ''"

               v-bind:disabled="(attrDisabled && attrDisabled.indexOf(attr) !== -1)
                                || (((value ? value[attributes.indexOf(attr)] : (attrMinSingle ? attrMinSingle : 0)) == attrMinSingle) && (getTotalValueForClass('attribute-input') == points))"

               v-bind:value="value ? value[attributes.indexOf(attr)] : (attrMinSingle ? attrMinSingle : 0)" />
      </div>
    </div>

    <!-- Strength -->
    <div v-else-if="category === 'strength'">
      <select class="strength-select"
              v-for="idx in strengthsInputCount" :key="idx"
              style="margin-top:7px;"
              @change="onStrengthSelectChange" 
              v-bind:value="value ? value[idx-1] : 0">
        <option hidden disabled selected value></option>
        <option v-for="strength in strengths" :key="strength.name" style="display: flex">{{strength.name}}</option>
      </select>
    </div>

    <!-- Master -->
    <div v-else-if="category === 'master'">
      <select class="master-select"
              v-for="idx in mastersInputCount" :key="idx"
              style="margin-top:7px;"
              @change="onMasterSelectChange"
              v-bind:value="value ? value[idx-1] : 0">
        <option hidden disabled selected value></option>
        <option v-for="master in masters" :key="master.name" style="display: flex">{{master.name}}</option>
      </select>
    </div>

    <!-- Else -->
    <div v-else><span style="color: red;">ERROR: Unknown Category "{{category}}"</span></div>

  </div>
</template>

<script>
const strengthsValues = require('/data/strengths.js');
const mastersValues = require('/data/master.js');
const skillsValues = require('/data/skills.js');
const resourcesValues = require('/data/resources.js');
const attributesValues = Object.keys(require('/data/attributes.js'));

export default {
    props: [
      'id', 'category', 'value',
      'points',
      'skillMaxNumTotalCombat', 'skillMaxNumTotalGeneral', 'skillMaxNumTotalMagic',
      'skillMaxNumSingleCombat', 'skillMaxNumSingleGeneral', 'skillMaxNumSingleMagic',
      'strengthMaxSingle',
      'masterMaxSingle',
      'attrMinSingle', 'attrMaxSingle',
      'attrDisabled'
    ],
    data() {
      return {
        skills: skillsValues,
        resources: resourcesValues,
        attributes: attributesValues,

        mastersInputCountValue: 1,
        strengthsInputCountValue: 1,
      }
    },
    computed: {
      strengths() {
        if (this.strengthMaxSingle) {
          return strengthsValues.filter(str => {
            return str.cost <= this.strengthMaxSingle;
          })
        }
        return strengthsValues;
      },
      masters() {
        if (this.masterMaxSingle) {
          return mastersValues.filter(m => {
            return m.tier <= this.masterMaxSingle;
          })
        }
        return mastersValues;
      },
      mastersInputCount() {
        if (this.value && Object.keys(this.value).length > this.mastersInputCountValue) {
          this.mastersInputCountValue = Object.keys(this.value).length;
        }
        return this.mastersInputCountValue;
      },
      strengthsInputCount() {
        if (this.value && Object.keys(this.value).length > this.strengthsInputCountValue) {
          this.strengthsInputCountValue = Object.keys(this.value).length;
        }
        return this.strengthsInputCountValue;
      }
    },
    methods: {
      onSkillInputChange(event) {
        // enforce min / max
        if (parseInt(event.target.value) > event.target.max) {
          event.target.value = parseInt(event.target.max);
        }
        
        if (parseInt(event.target.value) < event.target.min) {
          event.target.value = parseInt(event.target.min);
        }

        // get category total
        var currentCategoryTotal = this.getTotalValueForClass(event.target.className)

        // enforce category cap
        switch (event.target.className.split(" ")[0]) {
          case "skill-combat-input":
            var freePoints = this.skillMaxNumTotalCombat - currentCategoryTotal;
            break;
          case "skill-general-input":
            var freePoints = this.skillMaxNumTotalGeneral - currentCategoryTotal;
            break;
          case "skill-magic-input":
            var freePoints = this.skillMaxNumTotalMagic - currentCategoryTotal;
            break;
        }
        
        if (freePoints < 0) {
          event.target.value = parseInt(event.target.value) + freePoints;
        }

        // get total
        var allTotal = this.getTotalValueForClass("skill-input");

        // enforce total cap
        freePoints = this.points - allTotal;
        
        if (freePoints < 0) {
          event.target.value = parseInt(event.target.value) + freePoints;
        }

        // change event
        var val = {}
        var elements = document.getElementsByClassName("skill-input");
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          if (element.value) {
            val[i] = parseInt(element.value);
          }
        }
        
        const e = {
          target: {
            id: this.id,
            value: val
          }
        }
        this.$emit('change', e);
      },
      onStrengthSelectChange(event) {
        // generate save value
        var val = {}
        var allTotal = 0;
        var allElements = document.getElementsByClassName("strength-select");
        for (let i = 0; i < allElements.length; i++) {
          const element = allElements[i];
          val[i] = element.value;
          for (let y = 0; y < this.strengths.length; y++) {
            if (this.strengths[y].name == element.value) {
              allTotal += this.strengths[y].cost;
              break;
            }
          }
        }

        // add new input if not all points have been used
        if (allTotal < this.points) {
          this.strengthsInputCountValue += 1;
        }

        // change event
        const e = {
          target: {
            id: this.id,
            value: val
          }
        }
        this.$emit('change', e);
      },
      onMasterSelectChange(event) {
        // generate save value
        var val = {}
        var allTotal = 0;
        var allElements = document.getElementsByClassName("master-select");
        for (let i = 0; i < allElements.length; i++) {
          const element = allElements[i];
          val[i] = element.value;
          for (let y = 0; y < this.masters.length; y++) {
            if (this.masters[y].name == element.value) {
              allTotal += this.masters[y].tier;
              break;
            }
          }
        }

        // add new input if not all points have been used
        if (allTotal < this.points) {
          this.mastersInputCountValue += 1;
        }

        // change event
        const e = {
          target: {
            id: this.id,
            value: val
          }
        }
        this.$emit('change', e);
      },
      onResInputChange(event) {

        // enforce total cap
        var allTotal = this.getTotalValueForClass("res-input-value");

        var freePoints = this.points - allTotal;
        
        if (freePoints < 0) {
          event.target.value = parseInt(event.target.value) + freePoints;
        }

        // generate save value
        var val = {}
        var allElements = document.getElementsByClassName("res-input-value");
        for (let i = 0; i < allElements.length; i++) {
          const element = allElements[i];
          val[i] = {value: element.value};
        }
        var allElements = document.getElementsByClassName("res-input-description");
        for (let i = 0; i < allElements.length; i++) {
          const element = allElements[i];
          val[i].description = element.value;
        }

        // change event
        const e = {
          target: {
            id: this.id,
            value: val
          }
        }
        this.$emit('change', e);
      },
      onAttributeInputChange(event) {
        // enforce min / max
        if (parseInt(event.target.value) > event.target.max) {
          event.target.value = parseInt(event.target.max);
        }
        
        if (parseInt(event.target.value) < event.target.min) {
          event.target.value = parseInt(event.target.min);
        }

        // enforce total cap
        var allTotal = this.getTotalValueForClass("attribute-input");
        var freePoints = this.points - allTotal;
        
        if (freePoints < 0) {
          event.target.value = parseInt(event.target.value) + freePoints;
        }

        // generate save value
        var val = {}
        var allElements = document.getElementsByClassName("attribute-input");
        for (let i = 0; i < allElements.length; i++) {
          const element = allElements[i];
          val[i] = element.value;
        }

        // change event
        const e = {
          target: {
            id: this.id,
            value: val
          }
        }
        this.$emit('change', e);
      },
      getTotalValueForClass(className) {
        var elements = document.getElementsByClassName(className);
        var classTotal = 0;
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          if (element.value) {
            classTotal += parseInt(element.value);
          }
        }
        return classTotal;
      }
    }
}
</script>

<style>
</style>
