import React from "react";

const AddLivre = ({ handleChange, handleSubmit }) => {
  return (
    <>
      <h1>Ajouter un Livre</h1>
      <form onSubmit={(e) => handleSubmit(e, "/livre")}>
        <div>
          <label htmlFor="nomLivre">Nom du Livre</label>
          <input required onChange={handleChange} type="text" id="nomLivre" name="nomLivre" />
        </div>

        <div>
          <label htmlFor="codeBarreBiblioLivre">Code barre de la bibliotheque du Livre</label>
          <input required onChange={handleChange} type="text" id="codeBarreBiblioLivre" name="codeBarreBiblioLivre" />
        </div>

        <div>
          <label htmlFor="codeBarreBaseLivre">Code barre de base du Livre</label>
          <input required onChange={handleChange} type="text" id="codeBarreBaseLivre" name="codeBarreBaseLivre" />
        </div>

        <div>
          <label htmlFor="dateLivre">Date publication du Livre</label>
          <input required onChange={handleChange} type="date" id="dateLivre" name="dateLivre" />
        </div>

        <div>
          <label htmlFor="priceLivre">Prix du Livre</label>
          <input required onChange={handleChange} type="text" id="priceLivre" name="priceLivre" />
        </div>

        <div className="radio">
          <label>Etat du Livre</label>
          <div>
            <input required onChange={handleChange} type="radio" id="etatLivreNeuf" name="etatLivre" value="neuf" />
            <label htmlFor="etatLivreNeuf">Neuf</label>
          </div>
          <div>
            <input required onChange={handleChange} type="radio" id="etatLivreCorrect" name="etatLivre" value="correct" />
            <label htmlFor="etatLivreCorrect">Correct</label>
          </div>
          <div>
            <input required onChange={handleChange} type="radio" id="etatLivreDelabrer" name="etatLivre" value="delabrer" />
            <label htmlFor="etatLivreDelabrer">Delabrer</label>
          </div>
        </div>

        <div>
          <label htmlFor="nbPageLivre">Nombre de page du Livre</label>
          <input required onChange={handleChange} type="text" id="nbPageLivre" name="nbPageLivre" />
        </div>

        <div>
          <label htmlFor="resumeLivre">Resumer du Livre</label>
          <input required onChange={handleChange} type="text" id="resumeLivre" name="resumeLivre" />
        </div>

        <button type="submit">Créer le livre</button>
      </form>
    </>
  );
};

export default AddLivre;
