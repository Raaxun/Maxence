import React from "react";

const AddPeriodique = ({ handleChange, handleSubmit }) => {
  return (
    <>
      <h1>Ajouter un Periodique</h1>
      <form onSubmit={(e) => handleSubmit(e, "/periodique")}>
        <div>
          <label htmlFor="nomPeriodique">Nom du Periodique</label>
          <input required onChange={handleChange} type="text" id="nomPeriodique" name="nomPeriodique" />
        </div>

        <div>
          <label htmlFor="codeBarreBiblioPeriodique">Code barre bibliotheque du Periodique</label>
          <input required onChange={handleChange} type="text" id="codeBarreBiblioPeriodique" name="codeBarreBiblioPeriodique" />
        </div>

        <div>
          <label htmlFor="codeBarreBasePeriodique">Code barre de base du Periodique</label>
          <input required onChange={handleChange} type="text" id="codeBarreBasePeriodique" name="codeBarreBasePeriodique" />
        </div>

        <div>
          <label htmlFor="datePeriodique">Date publication du Periodique</label>
          <input required onChange={handleChange} type="date" id="datePeriodique" name="datePeriodique" />
        </div>

        <div>
          <label htmlFor="pricePeriodique">Prix du Periodique</label>
          <input required onChange={handleChange} type="text" id="pricePeriodique" name="pricePeriodique" />
        </div>

        <div className="radio">
          <label>Etat du Periodique</label>
          <div>
            <input required onChange={handleChange} type="radio" id="etatPeriodiqueNeuf" name="etatPeriodique" value="neuf" />
            <label htmlFor="etatPeriodiqueNeuf">Neuf</label>
          </div>
          <div>
            <input required onChange={handleChange} type="radio" id="etatPeriodiqueCorrect" name="etatPeriodique" value="correct" />
            <label htmlFor="etatPeriodiqueCorrect">Correct</label>
          </div>
          <div>
            <input required onChange={handleChange} type="radio" id="etatPeriodiqueDelabrer" name="etatPeriodique" value="delabrer" />
            <label htmlFor="etatPeriodiqueDelabrer">Delabrer</label>
          </div>
        </div>

        <div>
          <label htmlFor="titrePeriodique">Titre du Periodique</label>
          <input required onChange={handleChange} type="text" id="titrePeriodique" name="titrePeriodique" />
        </div>

        <div>
          <label htmlFor="resumePeriodique">Description du Periodique</label>
          <input required onChange={handleChange} type="text" id="resumePeriodique" name="resumePeriodique" />
        </div>

        <button type="submit">Créer le Periodique</button>
      </form>
    </>
  );
};

export default AddPeriodique;
