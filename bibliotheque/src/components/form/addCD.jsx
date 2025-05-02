import React from "react";

const AddCD = ({ handleChange, handleSubmit }) => {
  return (
    <>
      <h1>Ajouter un CD</h1>
      <form onSubmit={(e) => handleSubmit(e, "/cd")}>
        <div>
          <label htmlFor="nomCD">Nom du CD</label>
          <input required onChange={handleChange} type="text" id="nomCD" name="nomCD" />
        </div>

        <div>
          <label htmlFor="codeBarreBiblioCD">Code barre de la Bibliotheque du CD</label>
          <input required onChange={handleChange} type="text" id="codeBarreBiblioCD" name="codeBarreBiblioCD" />
        </div>

        <div>
          <label htmlFor="codeBarreBaseCD">Code barre de base du CD</label>
          <input required onChange={handleChange} type="text" id="codeBarreBaseCD" name="codeBarreBaseCD" />
        </div>

        <div>
          <label htmlFor="dateCD">Date publication du CD</label>
          <input required onChange={handleChange} type="date" id="dateCD" name="dateCD" />
        </div>

        <div>
          <label htmlFor="priceCD">Prix</label>
          <input required onChange={handleChange} type="text" id="priceCD" name="priceCD" />
        </div>

        <div className="radio">
          <label>Etat du CD</label>
          <div>
            <input required onChange={handleChange} type="radio" id="etatCDNeuf" name="etatCD" value="neuf" />
            <label htmlFor="etatCDNeuf">Neuf</label>
          </div>
          <div>
            <input required onChange={handleChange} type="radio" id="etatCDCorrect" name="etatCD" value="correct" />
            <label htmlFor="etatCDCorrect">Correct</label>
          </div>
          <div>
            <input required onChange={handleChange} type="radio" id="etatCDDelabrer" name="etatCD" value="delabrer" />
            <label htmlFor="etatCDDelabrer">Delabrer</label>
          </div>
        </div>

        <div>
          <label htmlFor="dureeCD">Duree du CD</label>
          <input required onChange={handleChange} type="text" id="dureeCD" name="dureeCD" />
        </div>

        <div>
          <label htmlFor="nbPisteCD">Nombre Piste CD</label>
          <input required onChange={handleChange} type="number" id="nbPisteCD" name="nbPisteCD" />
        </div>

        <div>
          <label htmlFor="describCD">Description du CD</label>
          <input required onChange={handleChange} type="text" id="describCD" name="describCD" />
        </div>

        <button type="submit">Créer le cd</button>
      </form>
    </>
  );
};

export default AddCD;
