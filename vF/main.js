const coordonnees = [
  { x: 350, y: 200 },
  { x: 150, y: 150 },
  { x: 550, y: 300 },
  { x: 200, y: 350 },
  { x: 480, y: 130 },
  { x: 100, y: 280 },
  { x: 600, y: 420 },
  { x: 320, y: 400 },
  { x: 430, y: 380 },
  { x: 280, y: 200 },
  { x: 530, y: 220 },
  { x: 130, y: 430 }
];

const parseNombre = (valeur) => parseFloat(String(valeur).replace(",", ".")) || 0;

Promise.all([
  d3.dsv(";", "tab.csv"),
  d3.dsv(";", "tab2.csv"),
  d3.dsv(";", "tab3.csv"),
  d3.dsv(";", "tab4.csv")
]).then(([lignesMoyenne, lignesJournalieres, lignesSemaine2, lignesSemaine3]) => {
  const svg = d3.select("#svg");
  const selectSemaine1 = d3.select("#select-semaine1");
  const btnSemaine2 = d3.select("#btn-semaine2");
  const btnSemaine3 = d3.select("#btn-semaine3");

  const colonnesMoyenne = Object.keys(lignesMoyenne[0]);
  const colonneNomMoyenne = colonnesMoyenne[0];
  const colonneTempsMoyenne = colonnesMoyenne[colonnesMoyenne.length - 1];

  const colonnesJournalieres = Object.keys(lignesJournalieres[0]);
  const colonneNomJour = colonnesJournalieres[0];
  const colonneSamedi = colonnesJournalieres[2];
  const colonneDimanche = colonnesJournalieres[3];
  const colonneLundi = colonnesJournalieres[4];
  const colonneMardi = colonnesJournalieres[5];
  const colonnesSemaine2 = Object.keys(lignesSemaine2[0]);
  const colonneNomSem2 = colonnesSemaine2[0];
  const colonneTempsSem2 = colonnesSemaine2[colonnesSemaine2.length - 1];

  const colonnesSemaine3 = Object.keys(lignesSemaine3[0]);
  const colonneNomSem3 = colonnesSemaine3[0];
  const colonneTempsSem3 = colonnesSemaine3[colonnesSemaine3.length - 1];

  const donneesParVue = {
    moyenne: lignesMoyenne.map((ligne) => parseNombre(ligne[colonneTempsMoyenne])),
    samedi: lignesJournalieres.map((ligne) => parseNombre(ligne[colonneSamedi])),
    dimanche: lignesJournalieres.map((ligne) => parseNombre(ligne[colonneDimanche])),
    lundi: lignesJournalieres.map((ligne) => parseNombre(ligne[colonneLundi])),
    mardi: lignesJournalieres.map((ligne) => parseNombre(ligne[colonneMardi])),
    semaine2: lignesSemaine2.map((ligne) => parseNombre(ligne[colonneTempsSem2])),
    semaine3: lignesSemaine3.map((ligne) => parseNombre(ligne[colonneTempsSem3]))
  };

  const applications = lignesJournalieres.map((ligne, i) => ({
    app: ligne[colonneNomJour] || lignesMoyenne[i]?.[colonneNomMoyenne] || `App ${i + 1}`,
    valeur: donneesParVue.moyenne[i] ?? 0,
    x: coordonnees[i].x,
    y: coordonnees[i].y
  }));

  const appsSemaine1 = lignesJournalieres.map(ligne => ligne[colonneNomJour]);
  const appsSemaine2 = lignesSemaine2.map(ligne => ligne[colonneNomSem2]);
  const appsSemaine3 = lignesSemaine3.map(ligne => ligne[colonneNomSem3]);
  
  const toutesLesApps = [...new Set([...appsSemaine1, ...appsSemaine2, ...appsSemaine3])];
  
  //plus tard pour les couleurs 
  const categories = {
    "Instagram": "Réseaux sociaux",
    "WhatsApp": "Réseaux sociaux",
    "Snapchat": "Réseaux sociaux",
    "WeChat": "Réseaux sociaux",
    "Hinge": "Réseaux sociaux",
    "Safari": "Informations",
    "Clash Royale": "Jeux",
    "ChatGPT": "Productivité",
    "Grok (AI)": "Productivité",
    "Grok": "Productivité",
    "YouTube": "Divertissement",
    "Netflix": "Divertissement",
    "Spotify": "Divertissement",
    "AliExpress": "Shopping",
    "Mobile CFF": "Productivité",
    "LinkedIn": "Productivité",
    "Google Maps": "Productivité",
    "Photos": "Productivité"
  };
  
  const couleurCategorie = {
    "Réseaux sociaux": "#FF6B6B",
    "Jeux": "#4ECDC4",
    "Productivité": "#45B7D1",
    "Divertissement": "#FFA07A",
    "Informations": "#98D8C8",
    "Shopping": "#F7DC6F"
  };

  const Rayon = d3.scaleSqrt()
    .range([0, 148]);


  const mettreAJour = (vue, facteurDivision = 1) => {
    let appsActives = [];
    
    if (vue === "semaine2") {
      appsActives = lignesSemaine2.map((ligne, i) => ({
        app: ligne[colonneNomSem2],
        valeur: parseNombre(ligne[colonneTempsSem2]),
        valeurAffichee: parseNombre(ligne[colonneTempsSem2]) / facteurDivision,
        x: coordonnees[i % coordonnees.length].x,
        y: coordonnees[i % coordonnees.length].y,
        categorie: categories[ligne[colonneNomSem2]] || "Autre"
      }));
    } else if (vue === "semaine3") {
      appsActives = lignesSemaine3.map((ligne, i) => ({
        app: ligne[colonneNomSem3],
        valeur: parseNombre(ligne[colonneTempsSem3]),
        valeurAffichee: parseNombre(ligne[colonneTempsSem3]) / facteurDivision,
        x: coordonnees[i % coordonnees.length].x,
        y: coordonnees[i % coordonnees.length].y,
        categorie: categories[ligne[colonneNomSem3]] || "Autre"
      }));
    } else {
      const valeurs = donneesParVue[vue];
      appsActives = lignesJournalieres.map((ligne, i) => ({
        app: ligne[colonneNomJour],
        valeur: valeurs[i] ?? 0,
        valeurAffichee: valeurs[i] ?? 0,
        x: coordonnees[i].x,
        y: coordonnees[i].y,
        categorie: ligne["Catégorie"] || categories[ligne[colonneNomJour]] || "Autre"
      }));
      appsActives = appsActives.filter(app => app.valeurAffichee > 0);
    }

    Rayon.domain([0, d3.max(appsActives, (app) => app.valeurAffichee) || 1]);
    console.log(Rayon.domain())

    bulles = svg.selectAll("g")
      .data(appsActives, d => d.app);

   bulles.exit().remove();

    const bullesEnter = bulles.enter()
      .append("g")
      .attr("transform", (app) => `translate(${app.x},${app.y})`);

    bullesEnter.append("circle")
      .attr("fill", "none")
      .attr("stroke", "black");
    bullesEnter.append("text")
      .attr("class", "nom-app")
      .attr("dy", "-0.3em")
      .style("font-weight", "bold")
      .text((app) => app.app);

    bullesEnter.append("text")
      .attr("class", "valeur-app")
      .attr("dy", "1em");

      console.log(bullesEnter)

const bullesMerge = bulles.merge(bullesEnter);

bullesMerge.select("circle")
  .attr("r", (app) => Rayon(app.valeurAffichee));
bullesMerge.select(".valeur-app")
  .text((app) => `${app.valeur} min`);
 

    selectSemaine1.node().value = "";
    btnSemaine2.classed("active", false);
    btnSemaine3.classed("active", false);

    if (vue === "semaine2") {
      btnSemaine2.classed("active", true);
    } else if (vue === "semaine3") {
      btnSemaine3.classed("active", true);
    } else {
      selectSemaine1.node().value = vue;
    }
  };
  selectSemaine1.on("change", function() {
    const vue = this.value;
    if (vue) {
      mettreAJour(vue, 1);
    }
  });
  btnSemaine2.on("click", function() {
    mettreAJour("semaine2", 10);
  });

  btnSemaine3.on("click", function() {
    mettreAJour("semaine3", 10);
  });

  mettreAJour("moyenne", 1);
});

