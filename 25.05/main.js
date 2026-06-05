
d3.dsv(";", "tab.csv").then(lignes => {

    const svg = d3.select("#svg");

    //centres cercles
    const coordonnees = 
    [
      {x: 350, y: 200},
      {x: 150, y: 150},
      {x: 550, y: 300},
      {x: 200, y: 350},
      {x: 480, y: 130},
      {x: 100, y: 280},
      {x: 600, y: 420},
      {x: 320, y: 400},
      {x: 430, y: 380},
      {x: 280, y: 200},
      {x: 530, y: 220},
      {x: 130, y: 430},
    ];
  
    const colonnes = Object.keys(lignes[0]);

    const colonneNom = colonnes[0];
    
    const colonneTemps = colonnes[colonnes.length - 1];
  

    //expliquer
    const applications = lignes.map((ligne, i) => ({
      app: ligne[colonneNom],
      valeur: parseFloat(ligne[colonneTemps]),
      x: coordonnees[i].x,
      y: coordonnees[i].y
    }));

  //rayon du cercle selon colonne 2
    const Rayon = d3.scaleSqrt()
      .domain([0, d3.max(applications, app => app.valeur)])
      .range([0, 148]);
  

  
    const bulles = svg.selectAll("g")
      .data(applications)
      .join("g")
      .attr("transform", app => `translate(${app.x},${app.y})`);
  

    bulles.append("circle")
      .attr("r", app => Rayon(app.valeur))
      .attr("fill", "none")
      .attr("stroke", "black")
  
      //nom app
    bulles.append("text")
      .text(app => app.app);
  
      //temps
    bulles.append("text")
      .attr("dy", "1em")
      .text(app => app.valeur + " min");
  
  });


  d3.dsv(";", "tab2.csv").then(lignes => {

    const svg = d3.select("#svg");

    const coordonnees = 
    [
      {x: 350, y: 200},
      {x: 150, y: 150},
      {x: 550, y: 300},
      {x: 200, y: 350},
      {x: 480, y: 130},
      {x: 100, y: 280},
      {x: 600, y: 420},
      {x: 320, y: 400},
      {x: 430, y: 380},
      {x: 280, y: 200},
      {x: 530, y: 220},
      {x: 130, y: 430},
    ];

    const colonnes = Object.keys(lignes[0]);
    const colonneNom = colonnes[0];
    const TempsSam = colonnes[colonnes.length-2];
    const TempsDim = colonnes[colonnes.lenght-3]; 
    const TempsLun = colonnes[colonnes.lenght-4];


  const applications = lignes.map((ligne, i) => ({
      app: ligne[colonneNom],
      valeur: parseFloat(ligne[TempsSam]),
      x: coordonnees[i].x,
      y: coordonnees[i].y
    }));

    const Rayon = d3.scaleSqrt()
    .domain([0, d3.max(applications, app => app.valeur)])
    .range([0, 148]);

  const bulles = svg.selectAll("g")
    .data(applications)
    .join("g")
    .attr("transform", app => `translate(${app.x},${app.y})`);


  bulles.append("circle")
    .attr("r", app => Rayon(app.valeur))
    .attr("fill", "none")
    .attr("stroke", "red")

    //nom app
  bulles.append("text")
    .text(app => app.app);

















    
  });