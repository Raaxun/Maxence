export const verifLogin = (email: string, password: string) => {
  if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(email)) {
    if (password.length > 8) {
      return { email, password };
    } else {
      throw new Error("Le mot de passe doit avoir plus de 8 caractere connard");
    }
  } else {
    throw new Error("Ce n'est pas le bon mail");
  }
};
 export type RegsterPayload = {
  nom: string,
  prenom: string,
  naissance: string,
  adressePostale: string,
  codePostal: string,
  telephone: string,
  aggloEcole: string,
  email: string,
  password: string,
  confirmPassword: string
 }


export const verifRegister = ({
  nom,
  prenom,
  naissance,
  adressePostale,
  codePostal,
  telephone,
  aggloEcole,
  email,
  password,
  confirmPassword
}: RegsterPayload) => {

  const regexPatterns = {
    name: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
    date: /^\d{4}-\d{2}-\d{2}$/,
    address: /^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
    postalCode: /^[0-9]{5}$/,
    phone: /^[0-9]{10}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  };

  // Validation checks
  const validations = [
    { value: nom, pattern: regexPatterns.name, message: "Nom non valide." },
    { value: prenom, pattern: regexPatterns.name, message: "Prenom non valide." },
    { value: naissance, pattern: regexPatterns.date, message: "Date de naissance non valide."},
    { value: adressePostale, pattern: regexPatterns.address, message: "Adresse Postal non valide." },
    { value: codePostal, pattern: regexPatterns.postalCode, message: "Code postal non valide." },
    { value: telephone, pattern: regexPatterns.phone, message: "Telephone non valide. " },
    { value: aggloEcole, pattern: regexPatterns.postalCode, message: "Aglomeration ecole non valide." },
    { value: email, pattern: regexPatterns.email, message: " email non valide." },
  
  ];

  // Perform validations
  for (const { value, pattern, message} of validations) {
    if (!pattern.test(value)) {
      throw new Error(message);
    }
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    throw new Error("Le mot de passe ne doit pas etre different");
  }

  // If all validations pass
  return true;
};