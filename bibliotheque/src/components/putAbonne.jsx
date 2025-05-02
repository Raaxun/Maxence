// import React, { useEffect, useState } from "react";

// const PutUser = () => {
//   const [abonne, setAbonne] = useState([]);
//   const [info, setInfo] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:3000/putAbonne", {
//       credentials: "include",
//       headers: {
//         accept: "application/json",
//         "Content-Type": "application/json",
//       },
//     })
//       .then((r) => r.json())
//       .then((data) => {
//         console.log(data);
//         setAbonne(data);
//       })
//       .catch((error) => {
//         console.error("Erreur lors de la récupération des utilisateurs:", error);
//       });
//   }, []);

//   const handleEdit = (user) => {
//     setInfo({ ...user });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setInfo((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleReturnUser = async (userId) => {
//     if (!info) return alert("Veuillez remplir les champs avant de soumettre.");

//     const response = await fetch("http://localhost:3000/putAbonne", {
//       method: "PUT",
//       credentials: "include",
//       headers: {
//         accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(info),
//     });

//     if (response.ok) {
//       setAbonne(abonne.map((user) => (user.Id !== userId ? user : info)));
//       setInfo(null);
//     } else {
//       const body = await response.text();
//       alert(body);
//     }
//   };

//   return (
//     <div>
//       <h2>Utilisateurs</h2>
//       {abonne.length > 0 ? (
//         <ul className="users">
//           {abonne.map((user) => (
//             <li key={user.Id}>
//               {info && info.Id === user.Id ? (
//                 <div>
//                   <input
//                     type="text"
//                     name="LastName"
//                     value={info.LastName}
//                     onChange={handleInputChange}
//                     placeholder="Nom"
//                   />
//                   <input
//                     type="text"
//                     name="FirstName"
//                     value={info.FirstName}
//                     onChange={handleInputChange}
//                     placeholder="Prénom"
//                   />
//                   <input
//                     type="password"
//                     name="Password"
//                     value={info.Password}
//                     onChange={handleInputChange}
//                     placeholder="Mot de passe"
//                   />
//                   <input
//                     type="date"
//                     name="Birthdate"
//                     value={info.Birthdate.split('T')[0]}
//                     onChange={handleInputChange}
//                   />
//                   <input
//                     type="email"
//                     name="Email"
//                     value={info.Email}
//                     onChange={handleInputChange}
//                     placeholder="Email"
//                   />
//                   <input
//                     type="text"
//                     name="PostalCode"
//                     value={info.PostalCode}
//                     onChange={handleInputChange}
//                     placeholder="Code postal"
//                   />
//                   <input
//                     type="text"
//                     name="PostalAddress"
//                     value={info.PostalAddress}
//                     onChange={handleInputChange}
//                     placeholder="Adresse postale"
//                   />
//                   <input
//                     type="text"
//                     name="Phone"
//                     value={info.Phone}
//                     onChange={handleInputChange}
//                     placeholder="Téléphone"
//                   />
//                   <input
//                     type="text"
//                     name="SchoolArea"
//                     value={info.SchoolArea}
//                     onChange={handleInputChange}
//                     placeholder="Secteur scolaire"
//                   />
//                   <select
//                     name="Role"
//                     value={info.Role}
//                     onChange={handleInputChange}
//                   >
//                     <option value="admin">Admin</option>
//                     <option value="client">Client</option>
//                   </select>
//                   <button onClick={() => handleReturnUser(user.Id)}>Soumettre</button>
//                   <button onClick={() => setInfo(null)}>Annuler</button>
//                 </div>
//               ) : (
//                 <div>
//                   <p>Nom : {user.LastName}</p>
//                   <p>Prénom : {user.FirstName}</p>
//                   <p>Email : {user.Email}</p>
//                   <p>Téléphone : {user.Phone}</p>
//                   <p>Rôle : {user.Role}</p>
//                   <p>Mot de passe : {user.Password}</p>
//                   <p>Date de naissance : {new Date(user.Birthdate).toLocaleDateString()}</p>
//                   <p>Code postal : {user.PostalCode}</p>
//                   <p>Adresse postale : {user.PostalAddress}</p>
//                   <p>Secteur scolaire : {user.SchoolArea}</p>
//                   <button onClick={() => handleEdit(user)}>Modifier</button>
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>Aucun utilisateur trouvé.</p>
//       )}
//     </div>
//   );
// };

// export default PutUser;
