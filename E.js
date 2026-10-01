const myName = "Pokline";
let force = 7;
let magie = 6;
let pieces = 0;
let niveau = 0;
let classe = "";
let possedeCle = false;
let possedeChapeau = false;

const afficherNom = document.querySelector("#myName");
const afficherClasse = document.querySelector("#classe");
const afficherForce = document.querySelector("#force");
const afficherMagie = document.querySelector("#magie");
const afficherNiveau = document.querySelector("#niveau");
const afficherPiece = document.querySelector("#pieces");
const afficherCle = document.querySelector("#cle");
const afficherChapeau = document.querySelector("#chapeau");
const barreForce = document.querySelector("#barre-force");
const barreMagie = document.querySelector("#barre-magie");
const zoneMessage = document.querySelector("#message");

const boutonFantome = document.querySelector("#fantome");
const boutonLoup = document.querySelector("#loup");
const boutonPaladin = document.querySelector("#paladin");
const boutonAcheterCle = document.querySelector("#acheter-cle");
const boutonAcheterChapeau = document.querySelector("#acheter-chapeau");
const boutonBoss = document.querySelector("#boss");
const boutonRecommencer = document.querySelector("#recommencer");

function verifierPersonnage() {
    let message = "";

    if (typeof myName !== "string") {
        message += "Nom invalide. ";
    }

    if (typeof force !== "number" || typeof magie !== "number") {
        message += "Force et magie doivent être des nombres. ";
    }

    if (force < 0 || force > 10 || magie < 0 || magie > 10) {
        message += "Force et magie doivent être comprises entre 0 et 10. ";
    }

    if (typeof pieces !== "number" || pieces < 0) {
        message += "Les pièces doivent être un nombre supérieur ou égal à 0. ";
    }

    if (message === "") {
        return "Personnage valide";
    }
    return message;
}

function calculerNiveau() {
    niveau = force + magie;
}

function calculerClasse() {
    if (force > 0 && force >= magie * 2) {
        classe = "Guerrier";
    } else if (magie > 0 && magie >= force * 2) {
        classe = "Mage";
    } else {
        classe = "Aventurier";
    }
}

function afficherMessage(message) {
    zoneMessage.textContent = message;
}

function afficherPieces() {
    afficherPiece.textContent = pieces;
}

function afficherPersonnage() {
    afficherNom.textContent = myName;
    afficherClasse.textContent = classe;
    afficherClasse.className = "badge " + classe.toLowerCase();
    afficherForce.textContent = force;
    afficherMagie.textContent = magie;
    afficherNiveau.textContent = niveau;
    afficherPieces();

    if (possedeCle) {
        afficherCle.textContent = "oui";
    } else {
        afficherCle.textContent = "non";
    }

    if (possedeChapeau) {
        afficherChapeau.textContent = "oui";
    } else {
        afficherChapeau.textContent = "non";
    }

    barreForce.style.width = force * 10 + "%";
    barreMagie.style.width = magie * 10 + "%";

    boutonAcheterCle.disabled = possedeCle;
    boutonAcheterChapeau.disabled = possedeChapeau;
}

function battreAdversaire(adversaire) {
    if (adversaire === "fantome") {
        pieces += 2;
        magie += 1;
    } else if (adversaire === "loup") {
        pieces += 2;
        force += 1;
    } else if (adversaire === "paladin") {
        pieces += 1;
        force += 1;
        magie += 1;
    } else {
        afficherMessage("Adversaire inconnu.");
        return;
    }

    if (force > 10) {
        force = 10;
    }

    if (magie > 10) {
        magie = 10;
    }

    calculerNiveau();
    calculerClasse();
    afficherMessage("Victoire contre " + adversaire + " ! Force : " + force + ", magie : " + magie + ", niveau : " + niveau + ".");
}

function acheterObjet(objet) {
    if (objet === "cle") {
        if (possedeCle) {
            afficherMessage("Vous avez déjà la clé.");
        } else if (pieces < 3) {
            afficherMessage("Fonds insuffisants : la clé coûte 3 pièces.");
        } else {
            pieces -= 3;
            possedeCle = true;
            afficherMessage("Vous avez acheté la clé !");
        }
    } else if (objet === "chapeau") {
        if (possedeChapeau) {
            afficherMessage("Vous avez déjà le chapeau.");
        } else if (pieces < 5) {
            afficherMessage("Fonds insuffisants : le chapeau coûte 5 pièces.");
        } else {
            pieces -= 5;
            possedeChapeau = true;
            afficherMessage("Vous avez acheté le chapeau !");
        }
    } else {
        afficherMessage("Objet inconnu.");
    }
}

function battreBoss() {
    if (niveau === 20 && possedeCle) {
        pieces += 10;
        possedeCle = false;
        afficherMessage("Victoire contre le boss ! +10 pièces. La clé est consommée.");
    } else if (niveau !== 20 && !possedeCle) {
        afficherMessage("Clé manquante et niveau insuffisant (il faut le niveau 20).");
    } else if (niveau !== 20) {
        afficherMessage("Niveau insuffisant (il faut le niveau 20).");
    } else {
        afficherMessage("Il vous manque la clé pour affronter le boss.");
    }
}

function recommencer() {
    force = 7;
    magie = 6;
    pieces = 0;
    possedeCle = false;
    possedeChapeau = false;
    calculerNiveau();
    calculerClasse();
    afficherMessage("Nouvelle partie !");
}

boutonFantome.addEventListener("click", function () {
    battreAdversaire("fantome");
    afficherPersonnage();
});

boutonLoup.addEventListener("click", function () {
    battreAdversaire("loup");
    afficherPersonnage();
});

boutonPaladin.addEventListener("click", function () {
    battreAdversaire("paladin");
    afficherPersonnage();
});

boutonAcheterCle.addEventListener("click", function () {
    acheterObjet("cle");
    afficherPersonnage();
});

boutonAcheterChapeau.addEventListener("click", function () {
    acheterObjet("chapeau");
    afficherPersonnage();
});

boutonBoss.addEventListener("click", function () {
    battreBoss();
    afficherPersonnage();
});

boutonRecommencer.addEventListener("click", function () {
    recommencer();
    afficherPersonnage();
});

calculerNiveau();
calculerClasse();
console.log(verifierPersonnage());
afficherPersonnage();