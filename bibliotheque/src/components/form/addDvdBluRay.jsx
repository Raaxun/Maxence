import React from "react";

const AddDVD = ({ handleChange, handleSubmit }) => {
  return (
    <>
      <h1>Ajouter un DVD</h1>
      <form onSubmit={(e) => handleSubmit(e, "/dvdBluray")}>
        <div>
          <label htmlFor="nomDVD">Nom du DVD</label>
          <input required onChange={handleChange} type="text" id="nomDVD" name="nomDVD" />
        </div>

        <div>
          <label htmlFor="codeBarreBiblioDVD">Code barre de la bibliotheque du DVD</label>
          <input required onChange={handleChange} type="text" id="codeBarreBiblioDVD" name="codeBarreBiblioDVD" />
        </div>

        <div>
          <label htmlFor="codeBarreBaseDVD">Code barre de base du DVD</label>
          <input required onChange={handleChange} type="text" id="codeBarreBaseDVD" name="codeBarreBaseDVD" />
        </div>

        <div>
          <label htmlFor="dateDVD">Date publication du DVD</label>
          <input required onChange={handleChange} type="date" id="dateDVD" name="dateDVD" />
        </div>

        <div>
          <label htmlFor="priceDVD">Prix du DVD</label>
          <input required onChange={handleChange} type="text" id="priceDVD" name="priceDVD" />
        </div>

        <div className="radio">
          <label>Etat du DVD</label>
          <div>
            <input required onChange={handleChange} type="radio" id="etatDVDNeuf" name="etatDVD" value="neuf" />
            <label htmlFor="etatDVDNeuf">Neuf</label>
          </div>
          <div>
            <input required onChange={handleChange} type="radio" id="etatDVDCorrect" name="etatDVD" value="correct" />
            <label htmlFor="etatDVDCorrect">Correct</label>
          </div>
          <div>
            <input required onChange={handleChange} type="radio" id="etatDVDDelabrer" name="etatDVD" value="delabrer" />
            <label htmlFor="etatDVDDelabrer">Delabrer</label>
          </div>
        </div>

        <div>
          <label htmlFor="dureeDVD">Duree du DVD</label>
          <input required onChange={handleChange} type="text" id="dureeDVD" name="dureeDVD" />
        </div>

        <div>
          <label htmlFor="formatDVD">Format du DVD</label>
          <input required onChange={handleChange} type="text" id="formatDVD" name="formatDVD" />
        </div>

        <div>
          <label htmlFor="resumeDVD">Resumer du DVD</label>
          <input required onChange={handleChange} type="text" id="resumeDVD" name="resumeDVD" />
        </div>

        <button type="submit">Créer le DVD</button>
      </form>
    </>
  );
};

export default AddDVD;
