// Données en dur (plus de chargement CSV)
const data = [
  { Application: "Instagram", Moyenne: 196 },
  { Application: "WhatsApp", Moyenne: 31 },
  { Application: "Safari", Moyenne: 24 },
  { Application: "Clash Royale", Moyenne: 21 },
  { Application: "Snapchat", Moyenne: 11 },
  { Application: "WeChat", Moyenne: 4 },
  { Application: "Hinge", Moyenne: 2.5 },
  { Application: "ChatGPT", Moyenne: 10 },
  { Application: "YouTube", Moyenne: 9 },
  { Application: "Netflix", Moyenne: 7 },
  { Application: "Spotify", Moyenne: 11 },
  { Application: "Grok", Moyenne: 5 }
];

const width = 928;
const height = 928;

const pack = d3.pack()
  .size([width, height])
  .padding(3);

const color = d3.scaleOrdinal(d3.schemeTableau10);

// Construction de la hiérarchie
const rootStructure = {
  name: "root",
  children: data.map(d => ({ name: d.Application, value: d.Moyenne }))
};

const root = d3.hierarchy(rootStructure)
  .sum(d => d.value)
  .sort((a, b) => b.value - a.value);

const packedRoot = pack(root);

const svg = d3.select("#svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", [0, 0, width, height]);

// Dessiner les cercles
svg.append("g")
  .selectAll("circle")
  .data(packedRoot.descendants())
  .join("circle")
  .attr("cx", d => d.x)
  .attr("cy", d => d.y)
  .attr("r", d => d.r)
  .attr("fill", d => d.children ? "#e0e0e0" : color(d.data.name))
  .attr("fill-opacity", 0.7)
  .attr("stroke", "white")
  .attr("stroke-width", 1.5);

// Ajouter les noms des applications
svg.append("g")
  .selectAll("text")
  .data(packedRoot.leaves()) // seulement les feuilles (les applications)
  .join("text")
  .attr("x", d => d.x)
  .attr("y", d => d.y)
  .attr("dy", "0.35em")
  .attr("text-anchor", "middle")
  .style("fill", "white")
  .style("font-size", d => Math.min(16, d.r / 3))
  .style("font-weight", "bold")
  .style("pointer-events", "none")
  .text(d => d.data.name);