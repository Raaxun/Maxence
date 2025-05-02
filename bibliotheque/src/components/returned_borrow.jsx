import React, { useEffect } from "react";

const ReturnedBorrow = () => {
  const [borrows, setBorrows] = React.useState([]);
  const [etat, setEtat] = React.useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/returned_borrow", {
      credentials: "include",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        
        setBorrows(data);
      });
  }, []);

  async function handleReturnBorrow(contentId) {
    if (!etat) return alert("Veuillez choisir un état global.");

    const response = await fetch("http://localhost:3000/returned_borrow", {
      method: "PUT",
      credentials: "include",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: contentId,
        etat,
      }),
    });

    if (response.ok) {
      setBorrows(borrows.filter((borrow) => borrow.ContentId !== contentId));
    }

    const body = await response.text();
    return alert(body);
  }

  return (
    <div>
      <h2>Emprunts retournés</h2>
      {borrows.length > 0 ? (
        <ul className="boworred">
          {borrows.map((borrow) => (
            <li key={borrow.Id}>
              <p>Nome : {borrow.Name}</p>
              <p>Etat initial : {borrow.Status}</p>
              <span>Prix : {borrow.Price} €</span>
              <div>Date de publication {new Date(borrow.PublicationDate).toLocaleDateString()}</div>
              <p>Date de retour : {new Date(borrow.BorrowDate).toLocaleDateString()}</p>
              <div>
                <label htmlFor="etat">Etat global</label>
                <select name="etat" alue={etat} onChange={(e) => setEtat(e.target.value)} id="etat">
                  <option value={null}>...</option>
                  <option value="neuf">Neuf</option>
                  <option value="correct">Correct</option>
                  <option value="delabrer">Délabrer</option>
                </select>
              </div>
              <button onClick={()=>handleReturnBorrow(borrow.ContentId)}>Remettre en rayon</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun emprunt retourné.</p>
      )}
    </div>
  );
};

export default ReturnedBorrow;
