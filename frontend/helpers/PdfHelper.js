const { PDFDocument } = require('pdf-lib')
const fetch = require('node-fetch')
const StepHelper = require('/helpers/StepHelper.js')

const strengthsValues = require('/data/strengths.js');
const mastersValues = require('/data/master.js');

async function generatePdf(stepValues) {
    // generate properties from step values
    const characterModel = StepHelper.parse(stepValues)

    // get assets
    const baseUrl = "https://" + window.location.host + "/"
    const formPdfBytes = await fetch(baseUrl + 'sheet.pdf').then(res => res.arrayBuffer())
    const mainImageBytes = await fetch(baseUrl + 'sample.png').then(res => res.arrayBuffer())

    // parse assets
    const pdfDoc = await PDFDocument.load(formPdfBytes)
    const form = pdfDoc.getForm()
    const mainImage = await pdfDoc.embedPng(mainImageBytes)

    // populate
    const formKey = {
        "Name": characterModel.name,

        "Rasse": characterModel.race,
        "Kultur": characterModel.culture,
        "Abstammung": characterModel.lineage,
        "Variante": characterModel.training,
        // ...
        
        "GK": characterModel.stats2.gk,
        "GSW": characterModel.stats2.gsw,
        "INI": characterModel.stats2.ini,
        "LP": characterModel.stats2.lp,
        "FO": characterModel.stats2.fo,
        "VTD": characterModel.stats2.vtd,
        "GW": characterModel.stats2.gw,
        "KW": characterModel.stats2.kw,

        "GK mod": characterModel.stats2.mods.gk.toString(),
        "GSW mod": characterModel.stats2.mods.gsw.toString(),
        "INI mod": characterModel.stats2.mods.ini.toString(),
        "LP mod": characterModel.stats2.mods.lp.toString(),
        "FO mod": characterModel.stats2.mods.fo.toString(),
        "VTD mod": characterModel.stats2.mods.vtd.toString(),
        "GW mod": characterModel.stats2.mods.gw.toString(),
        "KW mod": characterModel.stats2.mods.kw.toString(),
        
        "AUS Start": characterModel.stats.aus.toString(),
        "BEW Start": characterModel.stats.bew.toString(),
        "INT Start": characterModel.stats.int.toString(),
        "KON Start": characterModel.stats.kon.toString(),
        "MYS Start": characterModel.stats.mys.toString(),
        "STÄ Start": characterModel.stats.str.toString(),
        "VER Start": characterModel.stats.ver.toString(),
        "WIL Start": characterModel.stats.wil.toString(),

        "AUS Wert": characterModel.stats.aus.toString(),
        "BEW Wert": characterModel.stats.bew.toString(),
        "INT Wert": characterModel.stats.int.toString(),
        "KON Wert": characterModel.stats.kon.toString(),
        "MYS Wert": characterModel.stats.mys.toString(),
        "STÄ Wert": characterModel.stats.str.toString(),
        "VER Wert": characterModel.stats.ver.toString(),
        "WIL Wert": characterModel.stats.wil.toString(),

        "AUS mod": characterModel.stats.mods.aus.toString(),
        "BEW mod": characterModel.stats.mods.bew.toString(),
        "INT mod": characterModel.stats.mods.int.toString(),
        "KON mod": characterModel.stats.mods.kon.toString(),
        "MYS mod": characterModel.stats.mods.mys.toString(),
        "STÄ mod": characterModel.stats.mods.str.toString(),
        "VER mod": characterModel.stats.mods.ver.toString(),
        "WIL mod": characterModel.stats.mods.wil.toString(),
        
        "Heldengrad": characterModel.hg.toString(),

        "Gesamt": characterModel.xp.total.toString(),
        "Eingesetzt": characterModel.xp.used.toString(),
        "Offen": characterModel.xp.unused.toString(),
        "Nächster Heldengrad": characterModel.xp.next_hg.toString(),

        "Mondzeichen": characterModel.moon,

        "Schwächen": characterModel.weakness?.split("\n")[0],
        "Schwächen 2": characterModel.weakness?.split("\n").slice(1).join("\n"),
        
        "Handgemenge": characterModel.skills[0]?.toString() ?? "0",
        "Text193": characterModel.skills[1]?.toString() ?? "0",
        "Text194": characterModel.skills[2]?.toString() ?? "0",
        "Text195": characterModel.skills[3]?.toString() ?? "0",
        "Text196": characterModel.skills[4]?.toString() ?? "0",
        "Text197": characterModel.skills[5]?.toString() ?? "0",
        "Text198": characterModel.skills[6]?.toString() ?? "0",

    }

    const generalSkill = ["Akrobatik", "Alchemie", "Anführen", "Arkane Kunde", "Athletik", "Darbietung", "Diplomatie", "Edelhandwerk", "Empathie", "Entschlossenheit", "Fingergertigkeit", "Geschichte", "Handwerk", "Heilkunde", "Heimlichkeit", "Jagdkunst", "Länderkunde", "Naturkunde", "Rede", "Schlösser", "Schwimmen", "Seefahrt", "Straßenkunde", "Tierführung", "Überleben", "Wahrnehmung", "Zähigkeit"];

    for (let i = 0; i < generalSkill.length; i++) {
        formKey[generalSkill[i] + " Punkte"] = characterModel.skills[i+7]?.toString() ?? "0";
    }

    const magicSkill = ["Bannmagie", "Beherrschungsmagie", "Bewegungsmagie", "Erkenntnismagie", "Felsmagie", "Feuermagie", "Heilungsmagie", "Illusionsmagie", "Kampfmagie", "Lichtmagie", "Naturmagie", "Schattenmagie", "Schicksalsmagie", "Schutzmagie", "Stärkungsmagie", "Todesmagie", "Verwandlungsmagie", "Wassermagie", "Windmagie"];
    var n = 0;
    for (let i = 0; i < magicSkill.length; i++) {
        const name = magicSkill[i];
        const value = characterModel.skills[i+34];
        if (value > 0) {
            if (n == 0) {
                formKey["Text30.0.0"] = name;
            } else {
                formKey["Text30." + n] = name;
            }
            formKey["MS FP " + n] = value;
            n += 1;
        }
    }

    for (let i = 1; i <= 17; i++) {
        const strength = characterModel.strengths[i-1];
        formKey["Stärke " + i] = strength;
        if (!strength) continue;
        for(var y in strengthsValues){
            const str = strengthsValues[y];
            if (str.name == strength) {
                formKey["Wirkung " + i] = str.description;
                break;
            }
        }
    }

    for (let i = 0; i <= 9; i++) {
        const res = characterModel.resources[i];
        if (!res) continue;
        formKey["Ansehen." + i] = res.value.toString();
        formKey["Ressourcen." + i] = res.description.toString();
    }

    const spellFields = [
        "Text32.0.0.0",
        "Text32.0.1",
        "Text32.0.2",
        "Text32.0.3",
        "Text32.0.4",
        "Text32.0.5",
        "Text32.0.6",
        "Text32.0.7.0",
        "Text32.0.7.1",
    ]
    for (let i in characterModel.spells) {
        formKey[spellFields[i]] = characterModel.spells[i]
    }

    Object.keys(formKey).forEach(key => {
        const field = form.getField(key);
        if (formKey[key]) field.setText(formKey[key].toString());
    })

    // draw main image
    const page = pdfDoc.getPages()[0]
    const w = 80;
    const h = 120;
    page.drawImage(mainImage, {
        x: page.getWidth() / 2 - w/2,
        y: page.getHeight() - h - 80,
        width: w,
        height: h,
    })

    return await pdfDoc.save();
}

export { generatePdf };