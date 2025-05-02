export type CdPayload = {
    nomCD: string,
    codeBarreBiblioCD: string,
    codeBarreBaseCD: string,
    dateCD: string,
    priceCD: string,
    etatCD: string,
    dureeCD: string,
    nbPisteCD: string,
    describCD: string
};

export const verifCD = ({
    nomCD,
    codeBarreBiblioCD,
    codeBarreBaseCD,
    dateCD,
    priceCD,
    etatCD,
    dureeCD,
    nbPisteCD,
    describCD
}: CdPayload) => {
    const regexPatterns = {
        nom: /^[a-zA-Z0-9\s]{1,50}$/,
        codebarre: /^[a-zA-Z0-9\s]{1,50}$/,
        date: /^\d{4}-\d{2}-\d{2}$/,
        prix: /^\d+(\.\d{1,2})?$/,
        etat: /^(neuf|correct|delabrer)$/i,
        duree: /^\d+$/,
        nombrePiste: /^\d+$/,
        description: /^.{0,255}$/
    };

    const validations = [
        { value: nomCD, pattern: regexPatterns.nom, message: "Nom non valide." },
        { value: codeBarreBiblioCD, pattern: regexPatterns.codebarre, message: "Code-barres non valide." },
        { value: codeBarreBaseCD, pattern: regexPatterns.codebarre, message: "Code-barres non valide." },
        { value: dateCD, pattern: regexPatterns.date, message: "Date non valide." },
        { value: priceCD, pattern: regexPatterns.prix, message: "Prix non valide." },
        { value: etatCD, pattern: regexPatterns.etat, message: "État non valide." },
        { value: dureeCD, pattern: regexPatterns.duree, message: "Durée non valide." },
        { value: nbPisteCD, pattern: regexPatterns.nombrePiste, message: "Nombre de pistes non valide." },
        { value: describCD, pattern: regexPatterns.description, message: "Description non valide." }
    ];

    for (const { value, pattern, message } of validations) {
        if (!pattern.test(value)) {
            throw new Error(message);
        }
    }
    return true;
};


export type DVDPayload = {
    nomDVD: string,
    codeBarreBiblioDVD: string,
    codeBarreBaseDVD: string,
    dateDVD: string,
    priceDVD: string,
    etatDVD: string,
    dureeDVD: string,
    formatDVD: string,
    resumeDVD: string
};

export const verifDVD = ({
    nomDVD,
    codeBarreBiblioDVD,
    codeBarreBaseDVD,
    dateDVD,
    priceDVD,
    etatDVD,
    dureeDVD,
    formatDVD,
    resumeDVD    
}: DVDPayload) => {

    const regexPatterns = {
        nom: /^[a-zA-Z0-9\s]{1,50}$/,
        codebarre: /^[a-zA-Z0-9\s]{1,50}$/,
        date: /^\d{4}-\d{2}-\d{2}$/,
        prix: /^\d+(\.\d{1,2})?$/,
        etat: /^(neuf|correct|delabrer)$/i,
        duree: /^\d+$/,
        format: /^(DVD|Blu-ray)$/i,
        description: /^.{0,255}$/
    };

    const validations = [
        { value: nomDVD, pattern: regexPatterns.nom, message: "Nom non valide." },
        { value: codeBarreBaseDVD, pattern: regexPatterns.codebarre, message: "Code-barres non valide." },
        { value: codeBarreBiblioDVD, pattern: regexPatterns.codebarre, message: "Code-barres non valide." },
        { value: dateDVD, pattern: regexPatterns.date, message: "Date non valide." },
        { value: priceDVD, pattern: regexPatterns.prix, message: "Prix non valide." },
        { value: etatDVD, pattern: regexPatterns.etat, message: "État non valide." },
        { value: dureeDVD, pattern: regexPatterns.duree, message: "Durée non valide." },
        { value: formatDVD, pattern: regexPatterns.format, message: "Format non valide." },
        { value: resumeDVD, pattern: regexPatterns.description, message: "Description non valide." }
    ];

    for (const { value, pattern, message } of validations) {
        if (!pattern.test(value)) {
            throw new Error(message);
        }
    }
    return true;
};

export type LivrePayload = {
    nomLivre: string,
    codeBarreBiblioLivre: string,
    codeBarreBaseLivre: string,
    dateLivre: string,
    priceLivre: string,
    etatLivre: string,
    nbPageLivre: string,
    resumeLivre: string
};

export const verifLivre = ({
    nomLivre,
    codeBarreBiblioLivre,
    codeBarreBaseLivre,
    dateLivre,
    priceLivre,
    etatLivre,
    nbPageLivre,
    resumeLivre
}: LivrePayload) => {

    const regexPatterns = {
        nom: /^[a-zA-Z0-9\s]{1,50}$/,
        codebarre: /^[a-zA-Z0-9\s]{1,50}$/,
        date: /^\d{4}-\d{2}-\d{2}$/,
        prix: /^\d+(\.\d{1,2})?$/,
        etat: /^(neuf|correct|delabrer)$/i,
        nbPage: /^\d+$/,
        description: /^.{0,255}$/
    };

    const validations = [
        { value: nomLivre, pattern: regexPatterns.nom, message: "Nom non valide." },
        { value: codeBarreBaseLivre, pattern: regexPatterns.codebarre, message: "Code-barres non valide." },
        { value: codeBarreBiblioLivre, pattern: regexPatterns.codebarre, message: "Code-barres non valide." },
        { value: dateLivre, pattern: regexPatterns.date, message: "Date non valide." },
        { value: priceLivre, pattern: regexPatterns.prix, message: "Prix non valide." },
        { value: etatLivre, pattern: regexPatterns.etat, message: "État non valide." },
        { value: nbPageLivre, pattern: regexPatterns.nbPage, message: "Nombre de pages non valide." },
        { value: resumeLivre, pattern: regexPatterns.description, message: "Description non valide." }
    ];

    for (const { value, pattern, message } of validations) {
        if (!pattern.test(value)) {
            throw new Error(message);
        }
    }
    return true;
};

export type PeriodiquePayload = {
    nomPeriodique: string,
    codeBarreBiblioPeriodique: string,
    codeBarreBasePeriodique: string,
    datePeriodique: string,
    pricePeriodique: string,
    etatPeriodique: string,
    titrePeriodique: string,
    resumePeriodique: string
};

export const verifPeriodique = ({
    nomPeriodique,
    codeBarreBiblioPeriodique,
    codeBarreBasePeriodique,
    datePeriodique,
    pricePeriodique,
    etatPeriodique,
    titrePeriodique,
    resumePeriodique
}: PeriodiquePayload) => {

    const regexPatterns = {
        nom: /^[a-zA-Z0-9\s]{1,50}$/,
        codebarre: /^[a-zA-Z0-9\s]{1,50}$/,
        date: /^\d{4}-\d{2}-\d{2}$/,
        prix: /^\d+(\.\d{1,2})?$/,
        etat: /^(neuf|correct|delabrer)$/i,
        titre: /^[a-zA-Z0-9\s]{1,100}$/,
        description: /^.{0,255}$/
    };

    const validations = [
        { value: nomPeriodique, pattern: regexPatterns.nom, message: "Nom non valide." },
        { value: codeBarreBasePeriodique, pattern: regexPatterns.codebarre, message: "Code-barres non valide." },
        { value: codeBarreBiblioPeriodique, pattern: regexPatterns.codebarre, message: "Code-barres non valide." },
        { value: datePeriodique, pattern: regexPatterns.date, message: "Date non valide." },
        { value: pricePeriodique, pattern: regexPatterns.prix, message: "Prix non valide." },
        { value: etatPeriodique, pattern: regexPatterns.etat, message: "État non valide." },
        { value: titrePeriodique, pattern: regexPatterns.titre, message: "Titre non valide." },
        { value: resumePeriodique, pattern: regexPatterns.description, message: "Description non valide." }
    ];

    for (const { value, pattern, message } of validations) {
        if (!pattern.test(value)) {
            throw new Error(message);
        }
    }
    return true;
};