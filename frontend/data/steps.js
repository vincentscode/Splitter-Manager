module.exports = [
    { 
        "title": "Idee", 
        "fields": [
            {
                "id": "name",
                "name": "Name",
                "type": "text"
            },
            {
                "id": "race",
                "name": "Rasse",
                "type": "select",
                "options": [
                    "Alb",
                    "Gnom",
                    "Mensch",
                    "Varg",
                    "Zwerg"
                ],
                "descriptions": [
                    [
                        "Alben sind in vielen Regionen des Kontinents vertreten ist. Sie gelten als leidenschaftlich und kunstfertig.",
                        "",
                        "Attributsmodifikatoren:",
                        "+1 auf Ausstrahlung",
                        "+1 auf Beweglichkeit",
                        "+1 auf ein beliebiges Attribut",
                        "-1 auf Konstitution",
                        "",
                        "Größenklasse: 5",
                        "",
                        "Stärken: Attraktivität, Scharfes Gehör, Dämmersicht",
                    ].join("\n"),
                    [
                        "Gnome kamen vor vielen Tausend Jahren aus den Feenwelten nach Lorakis und sind heute in allen Regionen des Kontinents vertreten. Sie gelten als neugierig und besitzen den Feensinn.",
                        "",
                        "Attributsmodifikatoren:",
                        "+1 auf Mystik",
                        "+1 auf Verstand",
                        "+1 auf ein beliebiges Attribut",
                        "-1 auf Stärke",
                        "",
                        "Größenklasse: 3",
                        "",
                        "Stärken: Feensinn, Hoher Geistiger Widerstand, Flink",
                    ].join("\n"),
                    [
                        "Menschen sind die am weitesten verbreitete Rasse auf Lorakis - und wohl auch eine der Ältesten. Sie gelten als vielseitig und anpassungsfähig.",
                        "",
                        "Attributsmodifikatoren:",
                        "+1 auf zwei unterschiedliche Attribute",
                        "",
                        "Größenklasse: 5",
                        "",
                        "Stärken: Zusätzliche Splitterpunkte, Zwei zusätzliche Punkte zur Stärkenauswahl"
                    ].join("\n"),
                    [
                        "Varge sind vor allem im Norden und in der Wüste Surmakar ansässig. Einzelne Varge oder kleine Gemeinschaften sind allerdings überall anzutreffen. Sie gelten als impulsiv, aber loyal.",
                        "",
                        "Attributsmodifikatoren:",
                        "+2 auf Stärke",
			            "+1 auf ein beliebiges anderes Attribut",
                        "-1 auf Willenskraft",
                        "",
                        "Größenklasse: 6",
                        "",
                        "Stärken: Natürlicher Rüstungsschutz, Ausdauernd, Natürliche Waffe",
                    ].join("\n"),
                    [
                        "Zwerge sind in vielen Regionen des Kontinents vertreten. Sie werden als Handwerker und Händler oft geschätzt und geachtet.",
                        "",
                        "Attributsmodifikatoren:",
                        "+1 auf Konstitution",
                        "+1 auf Willenskraft",
                        "+1 auf ein beliebiges Attribut",
                        "-1 auf Beweglichkeit",
                        "",
                        "Größenklasse: 4",
                        "",
                        "Stärken: Giftresistenz, Robust, Orientierungssinn",
                    ].join("\n"),
                ]
            },
            {
                "id": "moon",
                "name": "Mondzeichen",
                "type": "select",
                "options": [
                    "Blutiges Antlitz des Mondes",
                    "Das zweite Gesicht",
                    "Der Blitz",
                    "Der Fels",
                    "Der Spieler",
                    "Freundschaft der Trabanten",
                    "Geist der Gedanken",
                    "Gunst des reichen Mannes",
                    "Omen des schwarzen Mondes",
                    "Segen der Mondkraft"
                ],
                "descriptions": [
                    [
                        "Träger dieses Splitters gelten als aufopferungsbereit und scheinen keinen Schmerz zu kennen. Der Einsatz dieser Gabe verwandelt für eine Probe die Wundabzüge aufgrund angebrochener Gesundheitsstufen in einen einmaligen Bonus in gleicher Höhe.",
                        "Verstärkt: Für 2 Splitterpunkte erhöht sich der Bonus um 3 Punkte.",
                        "Geheime Gabe: Der Splitterträger übernimmt für maximal eine Stunde die bis zu diesem Zeitpunkt erlittenen Wundabzüge eines Gefährten, sodass dieser ohne Abzüge agieren kann.",
                    ].join("\n\n"),
                    [
                        "Träger dieses Splitters sind stets wachsam und vorausschauend, neigen aber zur Schwarzseherei. Sie können bei einem Hinterhalt normal agieren, als wären sie nicht überrascht worden und erhalten einen Bonus in Höhe von 2 Punkten auf die Initiative in einer solchen Situation.",
                        "Verstärkt: Für 2 Splitterpunkte gibt es einen Bonus in Höhe von 4 Punkten auf die Initiative in einer Überraschungssituation.",
                        "Geheime Gabe: Der Splitterträger und ein Gefährte tauschen ihre Initiative-Ergebnisse.",
                    ].join("\n\n"),
                    [
                        "Träger dieses Splitters fackeln nicht lange und handeln schnell, sie neigen bisweilen zur Ungeduld. Eine einzelne Kampfhandlung wird um 4 Ticks verkürzt, dauert aber nicht weniger als 2 Ticks.",
                        "Verstärkt: Für 2 Splitterpunkte beträgt die Zeitverkürzung 6 Ticks, das Minimum beträgt weiterhin 2 Ticks.",
                        "Geheime Gabe: Ein Gefährte, der mit anderen Kampfteilnehmern auf dem gleichen Tick-Feld steht, wird an vorderste Stelle gerückt, darf also als erster in dieser Gruppe handeln.",
                    ].join("\n\n"),
                    [
                        "Träger dieses Splitters verfügen häufig über eine stoische Ruhe, die sich für Außenstehende als Phlegma zeigen kann. Wenn der höchste Würfel eines Sicherheitswurfes nur maximal 5 zeigt, darf der Abenteurer beide Würfel doch addieren und als Ergebnis werten. Ein Patzer ist hier trotzdem nicht möglich.",
                        "Verstärkt: Für 2 Splitterpunkte wird ein dritter Würfel geworfen und auf die ersten beiden addiert, sofern der höchste Würfel nur maximal 5 zeigt. Dabei gelten die Patzerregeln ebenfalls nicht.",
                        "Geheime Gabe: Ein Gefährte darf nachträglich einen Sicherheitswurf als Standardwurf werten, also beide Ergebnisse addieren.",
                    ].join("\n\n"),
		            [
                        "Träger dieses Splitters lassen sich bisweilen zu waghalsigen Aktionen verleiten und setzen gerne viel aufs Spiel. Mit der Gabe darf, sofern kein Patzer vorliegt, bei einer Risiko-Probe der zweitniedrigste Würfel neu geworfen werden. Es gilt stets der zweite Würfelwurf, die Probe wird anschließend ganz normal ausgewertet.",
                        "Verstärkt: Für 2 Splitterpunkte wird stattdessen der niedrigste Würfel neu geworfen, sofern kein Patzer vorliegt.",
                        "Geheime Gabe: Ein Gefährte darf den zweitniedrigsten Würfel einer Risiko-Probe neu werfen, sofern kein Patzer vorliegt.",
                    ].join("\n\n"),
		            [
                        "Träger dieses Splitters haben einen gewissen Beschützerinstinkt. Aktiviert der Splitterträger diese Gabe, kann er für eine bestimmte Probe seine eigenen Fertigkeitspunkte an einen Gefährten verleihen. Dieser benutzt die geliehenen Punkte statt seiner eigenen für diese eine Probe.",
                        "Verstärkt: Für 2 Splitterpunkte überträgt sich der komplette Fertigkeitswert.",
                        "Geheime Gabe: Der gewählte Gefährte verleiht seine Fertigkeitspunkte für eine Probe an den Splitterträger.",
                    ].join("\n\n"),
		            [
                        "Träger dieses Splitters haben eine enge Verbindung mit der Magie, die allerdings häufig mit hoher Risikobereitschaft einhergeht. Mit Einsatz dieser Gabe kann der Splitterträger Schaden auf seine Fokuspunkte umleiten beziehungsweise aufgewendete Fokuspunkte auf seine Lebensenergie.",
                        "Verstärkt: Für 2 Splitterpunkte werden bis zu 3 Punkte Verzehrung aus einer gerade auftretenden Quelle zu Erschöpfung vermindert.",
                        "Geheime Gabe: Ein Gefährte kann die Kosten eines gerade gewirkten Zaubers ganz oder teilweise auf den Splitterträger umlenken.",
                    ].join("\n\n"),
		            [
                        "Träger dieses Splitters gelten als freigiebige Gönner, die Bequemlichkeit zu schätzen wissen. Der Splitterträger legt nach einer Risiko-Probe ein beliebiges Würfelergebnis beiseite, das hierdurch für die aktuelle Probe nicht genutzt werden kann. Würfel, die einen Patzer erzeugen, können nicht ausgewählt werden. Diesen Würfel kann er für eine spätere Probe während der Spielsitzung verwenden und wirft in diesem Fall einen Würfel weniger. Es kann stets nur ein Würfel bereitgehalten werden.",
                        "Verstärkt: Für 2 Splitterpunkte werden zwei nicht genutzte Würfel beiseite gelegt. Eingesetzt werden dürfen sie aber nur einzeln.",
                        "Geheime Gabe: Ein Gefährte des Splitterträgers nutzt ein beiseite gelegtes Würfelergebnis für eine konkrete Probe.",
                    ].join("\n\n"),
		            [
                        "Träger dieses Splitters vertrauen auf ihr Glück, sind optimistisch und handeln bisweilen leichtsinnig. Der Einsatz dieser Gabe zwingt den Spielleiter zur Wiederholung einer Probe, die sich unmittelbar gegen den Splitterträger richtet. Die zweite Probe gilt in jedem Fall. Die Gabe muss vor einer etwaigen Gegen- oder Vergleichsprobe des Abenteurers eingesetzt werden.",
                        "Verstärkt: Für 2 Splitterpunkte bekommt die Probenwiederholung einen Malus in Höhe von 3 Punkten.",
                        "Geheime Gabe: Ein Gefährte darf einen einzelnen Würfel neu werfen, sofern kein Patzer vorliegt.",
                    ].join("\n\n"),
		            [
                        "Träger dieses Splitters sind oft stille Zeitgenossen mit einer Vorliebe für Ruhe. Auch die Dauer einer Verschnaufpause kann halbiert werden. Der Einsatz dieser Gabe halbiert die Dauer von Gift- und Krankheitsverläufen und den Ruhebedarf bei natürlicher Lebenspunkte-Heilung. Letzteres bedeutet, dass der Splitterträger in einer Ruhephase zweimal regeneriert oder bereits durch eine halbe Ruhephase einmal regenerieren kann.",
                        "Verstärkt: Für 2 Splitterpunkte sinkt die Dauer einer Ruhephase auf ein Drittel oder es kann in einer Ruhephase dreimal regeneriert werden. Alternativ kann die Dauer einer Verschnaufpause gedrittelt werden.",
                        "Geheime Gabe: Ein Gefährte kann sich die Zeit leichter Tätigkeit (Wandern, Reiten) als Ruhephase anrechnen lassen.",
                    ].join("\n\n"),
                ]
            },
            {
                "id": "weakness",
                "name": "Schwächen",
                "type": "textarea"
            },
            {
                "id": "notes",
                "name": "Notizen / Backstory",
                "type": "textarea"
            },
        ]
    },
    {
        "title": "Kultur",
        "fields": [
            {
                "id": "culture-skills",
                "name": "15 Punkte auf Fertigkeiten (je maximal +2, Magieschulen maximal eine einzelne +1)",
                "type": "pointbuy",
                "category": "skill",
                "points": 15,
                "skillMaxNumTotalCombat": 15,
                "skillMaxNumTotalGeneral": 15,
                "skillMaxNumTotalMagic": 1,
                "skillMaxNumSingleCombat": 2,
                "skillMaxNumSingleGeneral": 2,
                "skillMaxNumSingleMagic": 1,
            },
            {
                "id": "culture-strength",
                "name": "1 Stärke im Wert von 1 Punkt",
                "type": "pointbuy",
                "category": "strength",
                "points": 1,
                "strengthMaxSingle": 1,
            },
            {
                "id": "culture-note-home-region",
                "name": "Stärke \"Kulturkunde\" der Heimatregion des Abenteurers",
                "type": "note",
                "note": "Der Abenteurer kennt sich intuitiv mit den Sitten und Bräuchen einer bestimmten Region oder eines Volkes (etwa im Umfang eines Kultur-Moduls) aus. Im sozialen Umgang mit Personen, die dieselbe Kulturkunde besitzen, erhält der Abenteurer einen leicht positiven Umstand (Bonus in Höhe von 2 Punkten)."
            },
            {
                "id": "culture-master",
                "name": "1 passende Meisterschaft der Schwelle 1, für die die üblichen Voraussetzungen in Bezug auf Fertigkeitswerte nicht erfüllt werden müssen (dennoch muss die Fertigkeit am Ende der Generierung mindestens 1 Fertigkeitspunkt aufweisen)",
                "type": "pointbuy",
                "category": "master",
                "points": 1,
                "masterMaxSingle": 1
            }
        ]
    },
    {
        "title": "Abstammung",
        "fields": [
            {
                "id": "lineage-skills",
                "name": "5 Punkte auf Fertigkeiten (je maximal +1, keine Magieschulen)",
                "type": "pointbuy",
                "category": "skill",
                "points": 5,
                "skillMaxNumTotalCombat": 5,
                "skillMaxNumTotalGeneral": 5,
                "skillMaxNumTotalMagic": 0,
                "skillMaxNumSingleCombat": 1,
                "skillMaxNumSingleGeneral": 1,
                "skillMaxNumSingleMagic": 0,
            },
            {
                "id": "lineage-resources",
                "name": "4 Punkte auf Ressourcen",
                "type": "pointbuy",
                "points": 4,
                "category": "resource"
            }
        ]
    },
    {
        "title": "Ausbildung",
        "fields": [
            {
                "id": "training-skills",
                "name": "30 Punkte auf Fertigkeiten (je maximal +3, Magieschulen maximal +4)",
                "type": "pointbuy",
                "category": "skill",
                "points": 30,
                "skillMaxNumTotalCombat": 30,
                "skillMaxNumTotalGeneral": 30,
                "skillMaxNumTotalMagic": 30,
                "skillMaxNumSingleCombat": 3,
                "skillMaxNumSingleGeneral": 3,
                "skillMaxNumSingleMagic": 4,
            },
            {
                "id": "training-resources",
                "name": "2 Punkte auf Ressourcen",
                "type": "pointbuy",
                "points": 2,
                "category": "resource"
            },
            {
                "id": "training-strengths",
                "name": "Stärken im Wert von 2 Punkten",
                "type": "pointbuy",
                "category": "strength",
                "points": 2,
                "strengthMaxSingle": 2,
            },
            {
                "id": "training-masters",
                "name": "2 Meisterschaften der 1. Schwelle, für die ein Punkt in der Fertigkeit ausreichend ist",
                "type": "pointbuy",
                "category": "master",
                "points": 2,
                "masterMaxSingle": 1,
            },
        ]
    },
    {
        "title": "Attribute",
        "fields": [
            {
                "id": "attributes-attributes",
                "name": "Zu verteilen sind 18 Punkte auf die 8 Attribute. Jedes Attribut erhält dabei 1 bis 3 Punkte.",
                "type": "pointbuy",
                "category": "attribute",
                "points": 18,
                "attrMinSingle": 1,
                "attrMaxSingle": 3,
            }
        ]
    },
    {
        "title": "Stärken, Ressourcen und freie Fertigkeitspunkte",
        "fields": [
            {
                "id": "free-strength",
                "name": "Jeder Charakter erhält 3 freie Punkte für Stärken",
                "type": "pointbuy",
                "category": "strength",
                "points": 3,
                "strengthMaxSingle": 3,
            },
            {
                "id": "free-resource",
                "name": "Jeder Charakter erhält 2 freie Punkte für Ressourcen",
                "type": "pointbuy",
                "points": 2,
                "category": "resource"
            },
            {
                "id": "free-skill",
                "name": "Jeder Charakter erhält 5 freie Punkte für Fertigkeiten",
                "type": "pointbuy",
                "category": "skill",
                "points": 5,
                "skillMaxNumTotalCombat": 5,
                "skillMaxNumTotalGeneral": 5,
                "skillMaxNumTotalMagic": 5,
                "skillMaxNumSingleCombat": 5,
                "skillMaxNumSingleGeneral": 5,
                "skillMaxNumSingleMagic": 5,
            }
        ]
    },
    {
        "title": "Start-Erfahrung",
        "fields": [
            {
                "name": "Jeder neu erschaffene Abenteurer erhält 15 Erfahrungspunkte, die er ganz normal zum Steigern einsetzen kann.",
                "type": "note",
                "note": "+15 XP"
            }
        ]
    },
    {
        "title": "Feinschliff",
        "fields": [
            {
                "id": "finalize-master",
                "name": "Für alle Fertigkeiten mit 6 Fertigkeitspunkten erhält der Charakter eine Meisterschaft",
                "type": "master-6fp",
            },
            {
                "id": "finalize-magic1",
                "name": "Für alle Magieschulen mit mindestens 1 Fertigkeitspunkt erhält der Charakter einen Zauber des 0. Grades",
                "type": "magic-1fp",
                "note": ""
            },
            {
                "id": "finalize-magic3",
                "name": "Für alle Magieschulen mit mindestens 3 Fertigkeitspunkten erhält der Charakter einen Zauber des 1. Grades",
                "type": "magic-3fp",
            },
            {
                "id": "finalize-magic6",
                "name": "Für alle Magieschulen mit 6 Fertigkeitspunkten erhält der Charakter einen Zauber des 2. Grades",
                "type": "magic-6fp",
            },
            {
                "id": "start-equip",
                "name": "Startausrüstung",
                "type": "textarea"
            },
            {
                "name": "TODO",
                "type": "note",
                "note": "Der Abenteurer erhält eine gewisse Menge an Geld um sich weitere Ausrüstung zu kaufen"
            }
        ]
    },
    {
        "title": "Resultat",
        "fields": [
            {
                name: "Resultat",
                type: "result"
            }
        ]
    }
]