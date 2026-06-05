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
  d3.dsv(";", "tab2.csv")
]).then(([lignesMoyenne, lignesJournalieres]) => {
  const svg = d3.select("#svg");
  const boutons = d3.selectAll("#jour-buttons button");

  const colonnesMoyenne = Object.keys(lignesMoyenne[0]);
  const colonneNomMoyenne = colonnesMoyenne[0];
  const colonneTempsMoyenne = colonnesMoyenne[colonnesMoyenne.length - 1];

  const colonnesJournalieres = Object.keys(lignesJournalieres[0]);
  const colonneNomJour = colonnesJournalieres[0];
  const colonneSamedi = colonnesJournalieres[2];
  const colonneDimanche = colonnesJournalieres[3];
  const colonneLundi = colonnesJournalieres[4];
  const colonneMardi = colonnesJournalieres[5];

  const donneesParJour = {
    moyenne: lignesMoyenne.map((ligne) => parseNombre(ligne[colonneTempsMoyenne])),
    samedi: lignesJournalieres.map((ligne) => parseNombre(ligne[colonneSamedi])),
    dimanche: lignesJournalieres.map((ligne) => parseNombre(ligne[colonneDimanche])),
    lundi: lignesJournalieres.map((ligne) => parseNombre(ligne[colonneLundi])),
    mardi: lignesJournalieres.map((ligne) => parseNombre(ligne[colonneMardi]))
  };

  const applications = lignesJournalieres.map((ligne, i) => ({
    app: ligne[colonneNomJour] || lignesMoyenne[i]?.[colonneNomMoyenne] || `App ${i + 1}`,
    valeur: donneesParJour.moyenne[i] ?? 0,
    x: coordonnees[i].x,
    y: coordonnees[i].y
  }));

  const Rayon = d3.scaleSqrt()
    .range([0, 148]);

  const bulles = svg.selectAll("g")
    .data(applications)
    .join("g")
    .attr("transform", (app) => `translate(${app.x},${app.y})`);

  bulles.append("circle")
    .attr("fill", "none")
    .attr("stroke", "black");

  bulles.append("text")
    .text((app) => app.app);

  bulles.append("text")
    .attr("dy", "1em");

  const mettreAJour = (jour) => {
    const valeurs = donneesParJour[jour];

    applications.forEach((app, i) => {
      app.valeur = valeurs[i] ?? 0;
    });

    Rayon.domain([0, d3.max(applications, (app) => app.valeur) || 1]);

    bulles.select("circle")
      .transition()
      .duration(450)
      .attr("r", (app) => Rayon(app.valeur));

    bulles.select("text:nth-of-type(2)")
      .text((app) => `${app.valeur} min`);

    boutons.classed("active", false);
    d3.select(`#jour-buttons button[data-jour="${jour}"]`).classed("active", true);
  };

  boutons.on("click", function handleClick() {
    const jour = this.dataset.jour;
    mettreAJour(jour);
  });

  mettreAJour("moyenne");
});
