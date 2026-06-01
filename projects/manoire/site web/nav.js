/* =====================================================================
   LE MANOÏRE — Navigation + footer partagés
   Injecte la barre de menu dans <div id="site-nav"></div>
   et le pied de page dans <div id="site-footer"></div>.
   POUR MODIFIER LE MENU : édite le tableau LIENS ci-dessous (un seul endroit).
   ===================================================================== */
(function () {
  // --- Les onglets du menu (ordre = ordre d'affichage) ---
  var LIENS = [
    { libelle: "Accueil",         page: "index.html" },
    { libelle: "Le Manoïre",      page: "le-manoire.html" },
    { libelle: "Carte",           page: "carte.html" },
    { libelle: "Galerie",         page: "galerie.html" },
    { libelle: "Infos pratiques", page: "infos-pratiques.html" }
  ];
  var LOGO = "https://i.postimg.cc/k5c7HJ3h/sans-fond.png";
  var PAGE_RESERVER = "reserver.html";

  // Page courante (nom de fichier) pour surligner l'onglet actif
  var courante = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (courante === "") courante = "index.html";

  function estActif(page) { return page.toLowerCase() === courante; }

  function lienHTML(l) {
    return '<a href="' + l.page + '"' + (estActif(l.page) ? ' class="active"' : '') + '>' + l.libelle + '</a>';
  }

  // Répartition gauche / droite autour du logo central (desktop)
  var moitie = Math.ceil(LIENS.length / 2);
  var gauche = LIENS.slice(0, moitie).map(lienHTML).join("");
  var droite = LIENS.slice(moitie).map(lienHTML).join("");
  var tous   = LIENS.map(lienHTML).join("");

  var navHTML =
    '<header class="site-nav">' +
      '<div class="nav-inner">' +
        '<button class="nav-burger" id="navBurger" aria-label="Ouvrir le menu" aria-expanded="false">☰</button>' +
        '<ul class="nav-group left">' + gauche + '</ul>' +
        '<a class="nav-brand" href="index.html" aria-label="Accueil — Le Manoïre">' +
          '<img src="' + LOGO + '" alt="" class="nav-brand-img">' +
          '<span class="nav-brand-name">Le Manoïre</span>' +
        '</a>' +
        '<ul class="nav-group right">' + droite + '</ul>' +
        '<a class="nav-reserver" href="' + PAGE_RESERVER + '">Réserver</a>' +
      '</div>' +
      '<nav class="nav-dropdown" id="navDropdown">' + tous +
        '<a href="' + PAGE_RESERVER + '"' + (estActif(PAGE_RESERVER) ? ' class="active"' : '') + '>Réserver</a>' +
      '</nav>' +
    '</header>';

  var footerHTML =
    '<footer class="footer">' +
      '<p style="font-size:0.95em;">Réalisé par Clockwork Ops</p>' +
      '<p style="margin-top:0.5rem;font-size:0.85em;color:rgba(239,229,219,0.7);">' +
        '&copy; 2026 Le Manoïre · Col de Jaman · 1820 Montreux | ' +
        '<a href="legal.html">Mentions légales &amp; Confidentialité (LPD)</a>' +
      '</p>' +
    '</footer>';

  // page-brand supprimé — la nav (logo + nom) suffit comme identité
  var brandHTML = '';

  function injecter() {
    var navMount = document.getElementById("site-nav");
    if (navMount) navMount.innerHTML = navHTML;

    var brandMount = document.getElementById("site-brand");
    if (brandMount) brandMount.innerHTML = brandHTML;

    var footerMount = document.getElementById("site-footer");
    if (footerMount) footerMount.innerHTML = footerHTML;

    // Toggle du menu mobile
    var burger = document.getElementById("navBurger");
    var dropdown = document.getElementById("navDropdown");
    if (burger && dropdown) {
      burger.addEventListener("click", function () {
        var ouvert = dropdown.classList.toggle("open");
        burger.setAttribute("aria-expanded", ouvert ? "true" : "false");
        burger.textContent = ouvert ? "✕" : "☰";
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injecter);
  } else {
    injecter();
  }
})();
