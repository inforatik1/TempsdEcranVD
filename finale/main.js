//tableaux trnasformés du CSV par KIMI AI. en un format admissinle par le pack d3.
const tab1 = [
  { Application: "Instagram", Moyenne: "196" },
  { Application: "WhatsApp", Moyenne: "31" },
  { Application: "Safari", Moyenne: "24" },
  { Application: "Clash Royale", Moyenne: "21" },
  { Application: "Snapchat", Moyenne: "11" },
  { Application: "WeChat", Moyenne: "4" },
  { Application: "Hinge", Moyenne: "2.5" },
  { Application: "ChatGPT", Moyenne: "10" },
  { Application: "YouTube", Moyenne: "9" },
  { Application: "Netflix", Moyenne: "7" },
  { Application: "Spotify", Moyenne: "11" },
  { Application: "Grok", Moyenne: "5" }
];

const tab2 = [
  { Application: "Instagram", Catégorie: "Réseaux sociaux", "Sam. 21/03": "145", "Dim. 22/03": "299", "Lun. 23/03": "197", "Mar. 24/03": "143" },
  { Application: "WhatsApp", Catégorie: "Réseaux sociaux", "Sam. 21/03": "7", "Dim. 22/03": "56", "Lun. 23/03": "60", "Mar. 24/03": "2" },
  { Application: "Safari", Catégorie: "Informations", "Sam. 21/03": "32", "Dim. 22/03": "13", "Lun. 23/03": "30", "Mar. 24/03": "20" },
  { Application: "Clash Royale", Catégorie: "Jeux", "Sam. 21/03": "19", "Dim. 22/03": "30", "Lun. 23/03": "29", "Mar. 24/03": "8" },
  { Application: "Snapchat", Catégorie: "Réseaux sociaux", "Sam. 21/03": "17", "Dim. 22/03": "25", "Lun. 23/03": "0", "Mar. 24/03": "2" },
  { Application: "WeChat", Catégorie: "Réseaux sociaux", "Sam. 21/03": "15", "Dim. 22/03": "0", "Lun. 23/03": "0", "Mar. 24/03": "0" },
  { Application: "Hinge", Catégorie: "Réseaux sociaux", "Sam. 21/03": "5", "Dim. 22/03": "5", "Lun. 23/03": "0", "Mar. 24/03": "0" },
  { Application: "ChatGPT", Catégorie: "Productivité", "Sam. 21/03": "0", "Dim. 22/03": "3", "Lun. 23/03": "13", "Mar. 24/03": "23" },
  { Application: "YouTube", Catégorie: "Divertissement", "Sam. 21/03": "0", "Dim. 22/03": "0", "Lun. 23/03": "37", "Mar. 24/03": "0" },
  { Application: "Netflix", Catégorie: "Divertissement", "Sam. 21/03": "0", "Dim. 22/03": "0", "Lun. 23/03": "26", "Mar. 24/03": "2" },
  { Application: "Spotify", Catégorie: "Divertissement", "Sam. 21/03": "6", "Dim. 22/03": "17", "Lun. 23/03": "16", "Mar. 24/03": "5" },
  { Application: "Grok (AI)", Catégorie: "Productivité", "Sam. 21/03": "0", "Dim. 22/03": "0", "Lun. 23/03": "11", "Mar. 24/03": "11" }
];

const tab3 = [
  { Application: "Instagram", Moyenne: "1034" },
  { Application: "Clash Royale", Moyenne: "335" },
  { Application: "Netflix", Moyenne: "332" },
  { Application: "YouTube", Moyenne: "250" },
  { Application: "Snapchat", Moyenne: "248" },
  { Application: "Safari", Moyenne: "163" },
  { Application: "Spotify", Moyenne: "136" },
  { Application: "WhatsApp", Moyenne: "108" },
  { Application: "ChatGPT", Moyenne: "94" },
  { Application: "Hinge", Moyenne: "75" },
  { Application: "AliExpress", Moyenne: "50" },
  { Application: "Mobile CFF", Moyenne: "36" },
  { Application: "LinkedIn", Moyenne: "33" }
];

const tab4 = [
  { Application: "Instagram", Moyenne: "1648" },
  { Application: "YouTube", Moyenne: "427" },
  { Application: "Snapchat", Moyenne: "391" },
  { Application: "Netflix", Moyenne: "376" },
  { Application: "Clash Royale", Moyenne: "240" },
  { Application: "Safari", Moyenne: "140" },
  { Application: "WhatsApp", Moyenne: "130" },
  { Application: "ChatGPT", Moyenne: "127" },
  { Application: "Spotify", Moyenne: "124" },
  { Application: "Hinge", Moyenne: "62" },
  { Application: "Google Maps", Moyenne: "43" },
  { Application: "LinkedIn", Moyenne: "26" },
  { Application: "Photos", Moyenne: "26" }
];
// fin


function normNom(nom) {
  return nom.toLowerCase().replace(/\s*\(.*?\)/g, "").trim();
}

function moyenneGlb() {

  const colonnesS1 = ["Sam. 21/03", "Dim. 22/03", "Lun. 23/03", "Mar. 24/03"];
  tab2.forEach(d => {
    const vals = colonnesS1.map(c => parseFloat(d[c]) || 0);

  });

  const appsS23 = {};
  tab3.forEach(d => {
    const k = normNom(d.Application);
    appsS23[k] = [parseFloat(d.Moyenne)];
  });
  tab4.forEach(d => {
    const k = normNom(d.Application);
    if (appsS23[k]) appsS23[k].push(parseFloat(d.Moyenne));
    else appsS23[k] = [parseFloat(d.Moyenne)];
  });
 
}
moyenneGlb();
let vueActive = "s1-moyenne";




const width = 900;
const height = 700;
const margin = 1;
const color = d3.scaleOrdinal(d3.schemeTableau10);
const format = d3.format(",d");

const svg = d3.select("#svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox", [-margin, -margin, width, height]);


const afficher = (donnees, colonneDonnee, diviseur = 1) => {
  const pack = d3.pack()
    .size([width - margin * 2, height - margin * 2])
    .padding(3);
    

  const children = donnees
    .map(d => ({
      id: d.Application,
      value: parseFloat(String(d[colonneDonnee]).replace(",", ".")) / diviseur
    }))
    .filter(d => d.value > 0);



  const root = pack(d3.hierarchy({ children }).sum(d => d.value));

  svg.selectAll("g").remove();


  const node = svg.selectAll("g")
    .data(root.leaves())
    .join("g")
    .attr("transform", d => `translate(${d.x},${d.y})`);


  node.append("circle")
    .attr("fill-opacity", 0.7)
    .attr("fill", d => color(d.data.id))
    .attr("r", d => d.r)
    .attr("r", d => d.r)
    .on("click", auClic);


  node.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", "-0.2em")
    .style("font-size", d => Math.max(8, Math.min(16, d.r / 3)) + "px")
    .style("font-weight", "bold")
    .style("fill", "white")
    .style("pointer-events", "none")
    .text(d => d.data.id);


  node.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", "0.8em")
    .style("font-size", d => Math.max(7, Math.min(14, d.r / 4)) + "px")
    .style("fill", "white")
    .style("pointer-events", "none")
    .text(d => format(d.value) + " min");
};

function auClic(event, d) {
  const appKey = normNom(d.data.id);

  const trouver = (tab, col) => {
    const ligne = tab.find(r => normNom(r.Application) === appKey);
    return ligne ? parseFloat(ligne[col]) || 0 : null;
  };

  const barres = [
    { label: "S1 moyenne", val: trouver(tab1, "Moyenne") },
    { label: "Samedi 21",  val: trouver(tab2, "Sam. 21/03") },
    { label: "Dimanche 22",val: trouver(tab2, "Dim. 22/03") },
    { label: "Lundi 23",   val: trouver(tab2, "Lun. 23/03") },
    { label: "Mardi 24",   val: trouver(tab2, "Mar. 24/03") },
    { label: "Semaine 2",  val: trouver(tab3, "Moyenne") },
    { label: "Semaine 3",  val: trouver(tab4, "Moyenne") },
  ].filter(b => b.val !== null);

  const max = Math.max(...barres.map(b => b.val));

const html = barres.map(b => `
  <div class="barre">
    <span class="barretxt">${b.label}</span>
    <div class="remplissage"
         style="width:${Math.round((b.val / max) * 200)}px;">
    </div>
    <span class="barrevaleur">${b.val} min</span>
  </div>
`).join("");

const moyenne = barres.reduce((a, b) => a + b.val, 0) / barres.length;
const valActuelle = d.value;
const pct = ((valActuelle - moyenne) / moyenne) * 100;
const signe = pct >= 0 ? "+" : "";

const sousTitre = `
<p class="popup">
  Vue actuelle :
  <strong>${Math.round(valActuelle)} min</strong>
  <strong>${signe}${pct.toFixed(0)}%</strong>
  par rapport à la moyenne (${Math.round(moyenne)} min)
</p>`;

Swal.fire({
  title: d.data.id,
  html: sousTitre + html,
  confirmButtonText: "Fermer",
  confirmButtonColor: "#533212",
});
}
// généré et expliqué par KIMI AI. (prompt : "voici mon code JS, pourquoi l'affichage des bonnes données du tableau ne marchent pas quand je sélectionne la semaine ?")
function changerVue(vue) {
  vueActive = vue;
  if (vue === "s1-moyenne")  afficher(tab1, "Moyenne",    1);
  if (vue === "s1-samedi")   afficher(tab2, "Sam. 21/03", 1);
  if (vue === "s1-dimanche") afficher(tab2, "Dim. 22/03", 1);
  if (vue === "s1-lundi")    afficher(tab2, "Lun. 23/03", 1);
  if (vue === "s1-mardi")    afficher(tab2, "Mar. 24/03", 1);
  if (vue === "s2-total")    afficher(tab3, "Moyenne",    1);
  if (vue === "s3-total")    afficher(tab4, "Moyenne",    1);
}

d3.select("#select-vue").on("change", function() {
  changerVue(this.value);
});

changerVue("s1-moyenne");

//fin