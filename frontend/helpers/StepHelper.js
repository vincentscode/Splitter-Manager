const gks = {
    "Alb": 5,
    "Gnom": 3,
    "Mensch": 5,
    "Varg": 6,
    "Zwerg": 4
}

class StepHelper {
    constructor() {}

    static parse(stepValues) {
        // process the values
        var attributes = [
            stepValues['attributes-attributes'],
            stepValues['race-extra-' + stepValues['race']],
        ]

        var skills = [
            stepValues['culture-skills'],
            stepValues['free-skill'],
            stepValues['lineage-skills'],
            stepValues['training-skills'],
        ]

        var resources = [
            stepValues['free-resource'],
            stepValues['lineage-resources'],
            stepValues['training-resources'],
        ]

        var strengths = [
            stepValues['culture-strength'],
            stepValues['free-strength'],
            stepValues['training-strengths'],
        ]

        var masters = [
            stepValues['culture-master'],
            stepValues['training-masters'],
        ]
        const keys = Object.keys(stepValues);
        for (let idx in keys) {
            if (keys[idx].indexOf("finalize-master") != -1) {
                masters.push([stepValues[keys[idx]]])
            }
        }

        var spells = []
        for (let idx in keys) {
            if (keys[idx].indexOf("finalize-magic") != -1) {
                spells.push(stepValues[keys[idx]])
            }
        }

        // define the model
        var model = {
            stats: {
                mods: {}
            },
            stats2: {
                mods: {}
            },
        };
        
        // basics
        model.name = stepValues['name'];

        model.race = stepValues['race'];
        model.culture = stepValues['culture'];
        model.culture = stepValues['culture'];

        model.notes = stepValues['notes'];
        model.weakness = stepValues['weakness'];
        
        const next_hg_cost = {
            1: 100,
        }

        model.hg = 1;
        model.xp = {
            total: 15,
            used: 0,
            unused: 15,
            next_hg: next_hg_cost[model.hg]
        }

        model.moon = stepValues['moon'];
        
        // stats
        for (let i = 0; i < attributes.length; i++) {
            if (i === 0) {
                model.stats.aus = parseInt(attributes[0] ? attributes[0][0] : 0);
                model.stats.bew = parseInt(attributes[0] ? attributes[0][1] : 0);
                model.stats.int = parseInt(attributes[0] ? attributes[0][2] : 0);
                model.stats.kon = parseInt(attributes[0] ? attributes[0][3] : 0);
                model.stats.mys = parseInt(attributes[0] ? attributes[0][4] : 0);
                model.stats.str = parseInt(attributes[0] ? attributes[0][5] : 0);
                model.stats.ver = parseInt(attributes[0] ? attributes[0][6] : 0);
                model.stats.wil = parseInt(attributes[0] ? attributes[0][7] : 0);
            } else {
                model.stats.aus += parseInt(attributes[i] ? attributes[i][0] : 0);
                model.stats.bew += parseInt(attributes[i] ? attributes[i][1] : 0);
                model.stats.int += parseInt(attributes[i] ? attributes[i][2] : 0);
                model.stats.kon += parseInt(attributes[i] ? attributes[i][3] : 0);
                model.stats.mys += parseInt(attributes[i] ? attributes[i][4] : 0);
                model.stats.str += parseInt(attributes[i] ? attributes[i][5] : 0);
                model.stats.ver += parseInt(attributes[i] ? attributes[i][6] : 0);
                model.stats.wil += parseInt(attributes[i] ? attributes[i][7] : 0);
            }
        }

        model.stats.mods.aus = 0;
        model.stats.mods.bew = 0;
        model.stats.mods.int = 0;
        model.stats.mods.kon = 0;
        model.stats.mods.mys = 0;
        model.stats.mods.str = 0;
        model.stats.mods.ver = 0;
        model.stats.mods.wil = 0;

        // secondary stats
        const gk_to_vtd = {
            1: 8,
            2: 6,
            3: 4,
            4: 2,
            5: 0,
            6: -2,
            7: -4,
            8: -6,
            9: -8,
            10: -10,
        }

        model.stats2.gk = gks[model.race];
        model.stats2.gsw = model.stats2.gk + model.stats.bew;
        model.stats2.ini = 10 - model.stats.int;
        model.stats2.lp = model.stats2.gk + model.stats.kon;
        model.stats2.fo = 2 * (model.stats.mys + model.stats.wil);
        model.stats2.vtd = 12 + model.stats.bew + model.stats.str + gk_to_vtd[model.stats2.gk];
        model.stats2.gw = 12 + model.stats.ver + model.stats.wil;
        model.stats2.kw = 12 + model.stats.kon + model.stats.wil;

        model.stats2.mods.gk = 0;
        model.stats2.mods.gsw = 0;
        model.stats2.mods.ini = 0;
        model.stats2.mods.lp = 0;
        model.stats2.mods.fo = 0;
        model.stats2.mods.vtd = 0;
        model.stats2.mods.gw = 0;
        model.stats2.mods.kw = 0;

        // strengths
        model.strengths = []
        for (let i = 0; i < strengths.length; i++) {
            if (strengths[i] != undefined) {
                Object.keys(strengths[i]).forEach(key => {
                    model.strengths.push(strengths[i][key])
                });
            }
        }
        const raceStrengths = {
            "Alb": ["Attraktivität", "Scharfes Gehör", "Dämmersicht"],
            "Gnom": ["Feensinn", "Hoher Geistiger Widerstand", "Flink"],
            "Mensch": ["Zusätzliche Splitterpunkte", "Zwei zusätzliche Punkte zur Stärkenauswahl"],
            "Varg": ["Natürlicher Rüstungsschutz", "Ausdauernd", "Natürliche Waffe"],
            "Zwerg": ["Giftresistenz", "Robust", "Orientierungssinn"]
        }
        for (let i = 0; i < raceStrengths[model.race]?.length; i++) {
            model.strengths.push(raceStrengths[model.race][i])
        }
        model.strengths.push("Kulturkunde (Heimatregion)")

        // masters
        model.masters = []
        masters.forEach(masterList => {
            if (typeof masterList == "undefined") return;
            for (let idx in masterList) {
                model.masters.push(masterList[idx]);
            }
        })

        // resources
        model.resources = []
        for (let i in resources) {
            const res = resources[i];
            if (typeof res == "undefined") continue;
            for (let y in res) {
                if (model.resources.length == 0) {
                    model.resources[y] = res[y];
                } else {
                    if (typeof model.resources[y] == "undefined") {
                        model.resources[y] = {
                            value: 0,
                            description: ''
                        }
                    }
                    model.resources[y] = {
                        value: parseInt(model.resources[y].value) + parseInt(res[y].value),
                        description: model.resources[y].description + "\n" + res[y].description,
                    }
                }
            }
        }

        // skill
        model.skills = []
        for (let i in skills) {
            const skill = skills[i];
            if (typeof skill == "undefined") continue;
            for (let y in skill) {
                if (typeof model.skills[y] == "undefined") {
                    model.skills[y] = parseInt(skill[y]);
                } else {
                    model.skills[y] += parseInt(skill[y]);
                }
            }
        }
        
        // spells
        model.spells = spells;

        return model;
    }
}

module.exports = StepHelper;