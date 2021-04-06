<template>
  <div style="padding-top: 25px; padding-bottom: 200px;">
    <div id="creation-main">
      <h1 style="font-size: 35px;">{{ title }}</h1>
      <ul>
        <li v-for="field in fields" :key="field.name">
          <span><b>{{ field.name }}</b></span><br>

          <!-- text -->
          <div v-if="field.type === 'text'">
            <input :id="field.id" style="margin-top:7px;" type="text" v-bind:value="values[field.id]"
                  @change="onValueUpdated"/>
          </div>

          <!-- text area -->
          <div v-else-if="field.type === 'textarea'">
            <textarea :id="field.id" style="margin-top:7px; height:300px;" v-bind:value="values[field.id]"
                      @change="onValueUpdated" />
          </div>

          <!-- note -->
          <div v-else-if="field.type === 'note'">
            <p style="margin-top:7px;">{{ field.note }}</p>
          </div>

          <!-- select -->
          <div v-else-if="field.type === 'select'">
            <select :id="field.id" style="margin-top:7px;" v-bind:value="values[field.id]" @change="onValueUpdated"
                    v-model="selectModels[field.id]">
              <option hidden disabled selected value/>
              <option v-for="option in field.options" :key="option" :value="option">{{option}}</option>
            </select>

            <!-- Description -->
            <br v-if="field.descriptions">
            <p v-if="field.descriptions" style="white-space: pre-line;">{{ field.descriptions[field.options.indexOf(selectModels[field.id])] }}</p>

            <!-- Race Attributes -->
            <PointBuySelector v-bind:id="field.id + '-extra-' + values[field.id]"
                              v-if="field.id == 'race' && values[field.id] && values[field.id] != ''"
                              category="attribute"
                              :points="2"
                              :attrMinSingle="-1"
                              :attrMaxSingle="raceMaxSingle[values[field.id]]"
                              :attrDisabled="raceAttrDisabled[values[field.id]]"
                              v-bind:value="values[field.id + '-extra-' + values[field.id]] ? values[field.id + '-extra-' + values[field.id]] : raceAttrStarting[values[field.id]]"
                              @change="onValueUpdated" />
          </div>

          <!-- pointbuy -->
          <div v-else-if="field.type === 'pointbuy'">
            <PointBuySelector :id="field.id" style="margin-top:7px;"
                              :points="field.points" :category="field.category"

                              :skillMaxNumTotalCombat="field.skillMaxNumTotalCombat"
                              :skillMaxNumTotalGeneral="field.skillMaxNumTotalGeneral"
                              :skillMaxNumTotalMagic="field.skillMaxNumTotalMagic"
                              
                              :skillMaxNumSingleCombat="field.skillMaxNumSingleCombat"
                              :skillMaxNumSingleGeneral="field.skillMaxNumSingleGeneral"
                              :skillMaxNumSingleMagic="field.skillMaxNumSingleMagic"

                              :strengthMaxSingle="field.strengthMaxSingle"
                              :masterMaxSingle="field.masterMaxSingle"

                              :attrMinSingle="field.attrMinSingle"
                              :attrMaxSingle="field.attrMaxSingle"
                              
                              v-bind:value="values[field.id]" @change="onValueUpdated"/>
          </div>

          <!-- master-6fp -->
          <div v-else-if="field.type === 'master-6fp'">
            <div v-for="skill in skills6" :key="skill">
              <p>{{skill}}</p>
              <select :id="field.id + skill" style="margin-top:7px;" v-bind:value="values[field.id + skill]" @change="onValueUpdated"
                      v-model="selectModels[field.id + skill]">
                <option hidden disabled value/>
                <option v-for="master in masters" :key="master.name" :value="master.name">{{master.name}}</option>
              </select>
            </div>
          </div>

          <!-- magic-1fp -->
          <div v-else-if="field.type === 'magic-1fp'">
            <div v-for="skill in magic1" :key="skill">
              <p>{{skill}}</p>
              <select :id="field.id + skill" style="margin-top:7px;" v-bind:value="values[field.id + skill]" @change="onValueUpdated"
                      v-model="selectModels[field.id + skill]">
                <option hidden disabled selected value/>
                <option v-for="spell in spellsBySchoolAndLevel[skillToSchool[skill]][0]" :key="spell" :value="spell">{{spell}}</option>
              </select>
            </div>
          </div>

          <!-- magic-3fp -->
          <div v-else-if="field.type === 'magic-3fp'">
            <div v-for="skill in magic3" :key="skill">
              <p>{{skill}}</p>
              <select :id="field.id + skill" style="margin-top:7px;" v-bind:value="values[field.id + skill]" @change="onValueUpdated"
                      v-model="selectModels[field.id + skill]">
                <option hidden disabled selected value/>
                <option v-for="spell in spellsBySchoolAndLevel[skillToSchool[skill]][1]" :key="spell" :value="spell">{{spell}}</option>
              </select>
            </div>
          </div>

          <!-- magic-6fp -->
          <div v-else-if="field.type === 'magic-6fp'">
            <div v-for="skill in magic6" :key="skill">
              <p>{{skill}}</p>
              <select :id="field.id + skill" style="margin-top:7px;" v-bind:value="values[field.id + skill]" @change="onValueUpdated"
                      v-model="selectModels[field.id + skill]">
                <option hidden disabled selected value/>
                <option v-for="spell in spellsBySchoolAndLevel[skillToSchool[skill]][2]" :key="spell" :value="spell">{{spell}}</option>
              </select>
            </div>
          </div>

          <!-- result -->
          <div v-else-if="field.type === 'result'">
            <ResultSheet v-bind:stepsValues="values"/>
          </div>

          <!-- error -->
          <div v-else>
            <span style="color: red;">ERROR: Unknown Type "{{field.type}}"</span>
          </div>
        </li>
      </ul>
    </div>

    <div id="creation-sidebar">
      <h1>Charakter:</h1>
      <div v-html="modelsString"></div>
    </div>
    <div id="creation-sidebar-before"></div>
    <div id="creation-sidebar-after"></div>
  </div>
</template>

<script>
  const PointBuySelector = require('/components/PointBuySelector.vue').default;
  const StepHelper = require('/helpers/StepHelper.js')
  const mastersValues = require('/data/master.js');
  const spellsValues = require('/data/spells.js');
  
  if(typeof(String.prototype.trim) === "undefined") {
    String.prototype.trim = function() {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
  }

  const pbsData = PointBuySelector.data();
  const skills = pbsData.skills;
  const idxToSkill = skills.combat.concat(
    skills.general,
    skills.magic
  );

  const idxToResource = pbsData.resources;

  const keyToName = {
    "name": "Name",
    "skills": "Fertigkeiten",
    "stats": "Werte",
    "stats2": "Abgeleitete Werte",
    "race": "Rasse",
    "moon": "Mondzeichen",
    "notes": "Notizen / Backstory",
    "weakness": "Schwächen",
    "resources": "Ressourcen",
    "strengths": "Stärken"
  }
  export default {
    props: ['title', 'fields', 'values'],
    data() {
      return {
        selectModels: {},
        modelsString: '',
        resultValues: {},
        masters: mastersValues,
        raceMaxSingle: {
          "Alb": 2,
          "Gnom": 2,
          "Mensch": 1,
          "Varg": 2,
          "Zwerg": 2
        },
        raceAttrDisabled: {
          "Alb": [],
          "Gnom": [],
          "Mensch": [],
          "Varg": ["STÄ"],
          "Zwerg": []
        },
        raceAttrStarting: {
          "Alb": {0: '1', 1: '1', 2: '0', 3: '-1', 4: '0', 5: '0', 6: '0', 7: '0'},
          "Gnom": {0: '0', 1: '0', 2: '0', 3: '0', 4: '1', 5: '-1', 6: '1', 7: '0'},
          "Mensch": {0: '0', 1: '0', 2: '0', 3: '0', 4: '0', 5: '0', 6: '0', 7: '0'},
          "Varg": {0: '0', 1: '0', 2: '0', 3: '0', 4: '0', 5: '2', 6: '0', 7: '-1'},
          "Zwerg": {0: '0', 1: '-1', 2: '0', 3: '1', 4: '0', 5: '0', 6: '0', 7: '1'},
        },
        skillToSchool: {
          "Bannmagie": "Bann",
          "Beherrschungsmagie": "Beherrschung",
          "Bewegungsmagie": "Bewegung",
          "Erkenntnismagie": "Erkenntnis",
          "Felsmagie": "Fels",
          "Feuermagie": "Feuer",
          "Heilungsmagie": "Heilung",
          "Illusionsmagie": "Illusion",
          "Kampfmagie": "Kampf",
          "Lichtmagie": "Licht",
          "Naturmagie": "Natur",
          "Schattenmagie": "Schatten",
          "Schicksalsmagie": "Schicksal",
          "Schutzmagie": "Schutz",
          "Stärkungsmagie": "Stärkung",
          "Todesmagie": "Tod",
          "Verwandlungsmagie": "Verwandlung",
          "Wassermagie": "Wasser",
          "Windmagie": "Wind",
        }
      };
    },
    computed: {
      skills6() {
        var ret = [];
        for (var i = 0; i < this.resultValues.skills?.length; i++) {
          const val = this.resultValues.skills[i];
          if (val >= 6) {
            ret.push(idxToSkill[i])
          }
        }

        return ret;
      },
      magic1() {
        return this.filterMagicSkillsByValue(1);
      },
      magic3() {
        return this.filterMagicSkillsByValue(3);
      },
      magic6() {
        return this.filterMagicSkillsByValue(6);
      },
      spellsBySchoolAndLevel() {
        var ret = {};

        for (var i = 0; i < spellsValues.length; i++) {
          for (let school in spellsValues[i].schools) {
            if (Object.keys(ret).indexOf(school) != -1) {
              // school key exists
              if (Object.keys(ret[school]).indexOf(spellsValues[i].schools[school]) != -1) {
                // school key level exists
                ret[school][spellsValues[i].schools[school]].push(spellsValues[i].name)
              } else {
                ret[school][spellsValues[i].schools[school]] = [spellsValues[i].name]
              }
            } else {
              ret[school] = {}
              ret[school][spellsValues[i].schools[school]] = [spellsValues[i].name]
            }
          }
        }

        return ret;
      }
    },
    beforeMount() {
      window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll() {
        var extra = window.scrollY;
        const maxExtra = 75 + 50 + 64 + 2;
        if (extra > maxExtra) {
          extra = maxExtra;
        }
        document.getElementById("creation-sidebar").style.top = (window.innerHeight * 0.22) - extra + "px";
        document.getElementById("creation-sidebar-before").style.top = (window.innerHeight * 0.205) - extra + "px";
        document.getElementById("creation-sidebar").style.height = (window.innerHeight * 0.75) + extra + "px";
      },
      onValueUpdated(event) {
        this.$emit('callback', {id: event.target.id, value: event.target.value});
        this.resultValues = StepHelper.parse(this.values);
        this.modelsString = this.generateStateString(this.resultValues);
      },
      filterMagicSkillsByValue(limit) {
        if (typeof this.resultValues.skills == "undefined") return [];
        const magicValues = this.resultValues.skills.slice(34);
        var ret = [];
        for (var i = 0; i < magicValues.length; i++) {
          const val = magicValues[i];
          if (val >= limit) {
            ret.push(idxToSkill[i+34])
          }
        }

        return ret;
      },
      generateStateString(state, indent=0, parentKey="") {
        var result = '';
        const keys = Object.keys(state);
        keys.sort((a, b) => {
          const valA = state[a];
          const valB = state[b];
          
          var aList = false;
          if (typeof valA != "undefined" && Object.keys(valA).length > 0 && typeof valA != 'string') {
            aList = true;
          }
          var bList = false;
          if (typeof valB != "undefined" && Object.keys(valB).length > 0 && typeof vavalBlA != 'string') {
            bList = true;
          }

          if (aList && bList) {
            if (a < b) {
              return -1;
            }
            if (a > b) {
              return 1;
            }
            return 0;
          }

          if (aList) {
            return 1;
          }
          return -1;
        }); 
        for (let i in keys) {
          const key = keys[i];
          var value = state[key];
          if (typeof value == "undefined" || value == 0 || (value.value == 0 && (value.description?.trim() == "" || typeof value.description == "undefined"))) {
            continue
          }
          var keyName = key;
          if (key in keyToName) {
            keyName = keyToName[key];
          }
          if (Object.keys(value).length > 0 && typeof value != 'string') {
            if (parentKey == "resources") {
              keyName = idxToResource[key];
            }
            result += ' '.repeat(4*indent) + keyName + ":\n";
            result += this.generateStateString(value, indent+1, key);
          } else {
            if (parentKey == "skills") {
              keyName = idxToSkill[key];
            }

            var keyString = keyName.trim() + ": ";
            if (keyName.trim().length == 1) {
              keyString = ""
            }
            result += ' '.repeat(4*indent) + (keyString + value).replace("\n", "").replace("\r", "") + "\n";
          }
        }

        if (indent == 0) {
          result = '<div style=" white-space: pre;">' + result + '</div>'
        }

        return result;
      }
  
    }
  }
</script>

<style>
  ul {
    padding: 0;
    margin: 0;
  }

  ul > li {
    list-style-type: none;
    padding-bottom: 20px;
  }

  #creation-sidebar {
    position: fixed;
    
    overflow-y: auto;

    background: url("/image--025.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;

    display: inline-block;

    padding: 10px 15px;
    
    top: 22%;
    right: 19%;
    height: 75%;
    width: 29.5%;

  }
  #creation-sidebar::-webkit-scrollbar {
    display: none;
  }
  #creation-sidebar-before {
    display: inline-block;

    padding: 10px;
    
    top: 20.5%;
    right: 17.8%;
    height: 20px;
    width: 32%;
    position: fixed;

    background: url("/image--080.png");
    background-repeat: no-repeat;
    background-size: cover;

    display: block;
  }
  #creation-sidebar-after {
    display: inline-block;

    padding: 10px;
    
    top: 95.5%;
    right: 17.8%;
    height: 20px;
    width: 32%;
    position: fixed;

    background: url("/image--080.png");
    background-repeat: no-repeat;
    background-size: cover;

    display: block;
  }
</style>
