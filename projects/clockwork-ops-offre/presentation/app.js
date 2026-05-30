document.addEventListener('DOMContentLoaded', () => {
  // Pricing toggle elements
  const btnFr = document.getElementById('btn-fr');
  const btnCh = document.getElementById('btn-ch');
  const priceSetup = document.getElementById('price-setup');
  const priceMonthly = document.getElementById('price-monthly');

  // Interactive demo elements
  const btnGenerate = document.getElementById('btn-generate');
  const demoInput = document.getElementById('demo-input');
  const demoResults = document.getElementById('demo-results');
  const textInstagram = document.getElementById('text-instagram');
  const textFacebook = document.getElementById('text-facebook');
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabContents = document.querySelectorAll('.tab-content');

  // Pricing values
  const prices = {
    fr: {
      setup: '690 €',
      monthly: '29 € <span class="recur-period">/ mois</span>'
    },
    ch: {
      setup: '1 190 CHF',
      monthly: '59 CHF <span class="recur-period">/ mois</span>'
    }
  };

  // Pricing switch logic
  btnFr.addEventListener('click', () => {
    btnFr.classList.add('active');
    btnCh.classList.remove('active');
    priceSetup.textContent = prices.fr.setup;
    priceMonthly.innerHTML = prices.fr.monthly;
  });

  btnCh.addEventListener('click', () => {
    btnCh.classList.add('active');
    btnFr.classList.remove('active');
    priceSetup.textContent = prices.ch.setup;
    priceMonthly.innerHTML = prices.ch.monthly;
  });

  // Simulated AI responses based on input keywords
  const simulatedResponses = {
    massage: {
      instagram: `L'hiver s'éloigne et laisse place à la douceur du printemps... 🌸 C'est le moment idéal pour libérer votre corps des tensions accumulées. \n\nDécouvrez notre Rituel aux Pierres Chaudes. Une parenthèse de sérénité absolue où la chaleur pénètre vos muscles en profondeur pour chasser le stress et relancer vos énergies.\n\n✨ Offrez-vous cette pause bien méritée.\n👇 Réservation directe en lien en bio !`,
      facebook: `🌸 [BIEN-ÊTRE] Chassez les tensions accumulées cet hiver ! 🌸\n\nDécouvrez notre soin signature aux pierres chaudes, idéal pour libérer le corps et l'esprit. Notre table de massage vous attend pour un moment de relaxation intense dans notre cadre d'Evian.\n\n📅 Réservez votre créneau directement en ligne :\n👉 clockwork-ops.fr/reserver`,
      tags: '#Evian #BienEtre #Detente #MassageChablais'
    },
    ongles: {
      instagram: `Une touche de lumière jusqu'au bout des doigts... ✨💅\n\nPour ce Nail Art printanier, nous avons marié des teintes douces et pastel avec de subtiles feuilles d'or. Une pose délicate, soignée et résistante pour accompagner toutes vos journées.\n\nQuelle est votre couleur préférée pour ce mois-ci ? Dites-le moi en commentaire ! 👇\n\n📅 Pour réserver votre moment de beauté :\n👇 Cliquez sur le lien en bio !`,
      facebook: `✨💅 Sublimez vos mains pour le printemps ! 💅✨\n\nDécouvrez nos dernières créations Nail Art en institut. Des poses fines, soignées et adaptées à votre style unique.\n\n📅 Places limitées pour cette semaine. Réservez votre moment en ligne :\n👉 clockwork-ops.fr/ongles`,
      tags: '#NailArt #ManucureThonon #BeauteDesMains'
    },
    dos: {
      instagram: `Et si la douleur de dos n'était pas une fatalité ? 🩺💪\n\nAu quotidien, 80% des tensions cervicales et lombaires proviennent d'une mauvaise ergonomie face aux écrans. Dans ce post, je vous partage 3 étirements simples de 30 secondes à réaliser directement à votre bureau pour relâcher la pression.\n\nPrenez soin de votre posture, votre corps vous remerciera. ❤️\n\n👇 Plus de conseils & prises de RDV en lien en bio.`,
      facebook: `🩺 Soulagez votre dos au bureau ! 🩺\n\nAu quotidien, les tensions s'accumulent vite face aux écrans. Voici 3 mouvements d'étirement simples à faire en moins d'une minute pour libérer votre colonne.\n\n👉 Envie d'un diagnostic complet de votre posture ? Prenez rendez-vous en ligne :\n🔗 clockwork-ops.fr/osteopathe`,
      tags: '#SanteDuDos #Ergonomie #OsteopatheLocal #Chablais'
    },
    default: {
      instagram: `Une parenthèse de douceur s'offre à vous... ✨🌸\n\nParce que votre bien-être et votre temps sont précieux, nous vous accueillons chaque jour avec la même exigence et le même sourire. Que ce soit pour un soin profond, un conseil ou un moment de déconnexion, notre espace est le vôtre.\n\nPartagez ce post avec quelqu'un qui a besoin d'une pause détente aujourd'hui ! 💕\n\n👇 Réservation et tarifs en lien en bio.`,
      facebook: `✨ [BIENVENUE] Prenez un instant pour vous ! ✨\n\nDans notre havre de paix local, chaque soin est personnalisé pour répondre à vos besoins exacts. Découvrez notre carte complète et réservez votre moment de déconnexion.\n\n📅 Réservation en ligne simple et rapide :\n👉 clockwork-ops.fr/decouvrir`,
      tags: '#Evian #BienEtre #Proximite #PrendreSoinDeSoi'
    }
  };

  // Interactive post generation simulation
  btnGenerate.addEventListener('click', () => {
    const inputVal = demoInput.value.toLowerCase();
    let selectedResponse = simulatedResponses.default;

    if (inputVal.includes('massage') || inputVal.includes('pierres') || inputVal.includes('corps')) {
      selectedResponse = simulatedResponses.massage;
    } else if (inputVal.includes('ongles') || inputVal.includes('vernis') || inputVal.includes('mains')) {
      selectedResponse = simulatedResponses.ongles;
    } else if (inputVal.includes('dos') || inputVal.includes('posture') || inputVal.includes('osteo')) {
      selectedResponse = simulatedResponses.dos;
    }

    // Set texts
    textInstagram.innerHTML = selectedResponse.instagram.replace(/\n/g, '<br>') + `<br><br><span class="meta-tag">${selectedResponse.tags}</span>`;
    textFacebook.innerHTML = selectedResponse.facebook.replace(/\n/g, '<br>') + `<br><br><span class="meta-tag">${selectedResponse.tags}</span>`;

    // Reveal results with smooth scroll
    demoResults.style.display = 'flex';
    demoResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  // Tab switching logic
  tabLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Remove active from all links and contents
      tabLinks.forEach(item => item.classList.remove('active'));
      tabContents.forEach(item => item.classList.remove('active'));

      // Set active to clicked tab
      link.classList.add('active');
      const tabId = 'tab-' + link.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
});
