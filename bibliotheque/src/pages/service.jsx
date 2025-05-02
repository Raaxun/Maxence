import React from 'react';
import '../styles/Service.css'; // Assurez-vous que le chemin est correct

function Service() {
    return (
      <div className="Service">
        <div className="Section Horaire">
          <h2>Horaire d'ouverture</h2>
          <p>Ouvert du mardi au samedi de 10h à 18h, sauf le vendredi où les horaires sont de 14h à 18h.</p>
          <p>Ouvert du mardi au samedi de 10h à 18h, sauf le vendredi où les horaires sont de 14h à 18h.</p>    
        </div>
        <div className="Section Abonnement">
          <h2>Abonnements</h2>
          <p>Informations sur le prix des abonnements et les possibilités de gratuité.</p>
          <ul>
            <li>Abonnement annuel : 22€</li>
            <li>Abonnement mensuel : 11.50€</li>
            <li>Gratuit pour les résidents de l'agglomération de Montpellier</li>
            <li>Gratuit pour les enfants de moins de 12 ans</li>
            <li>Gratuit pour les jeunes de moins de 18 ans scolarisés dans l'agglomération</li>
          </ul>
        </div>
        <div className="Section Reservation">
          <h2>Réservations</h2>
          <p>Informations sur les possibilités de réservation, le temps de réservation et le nombre maximum de livres empruntables.</p>
          <ul>
            <li>Réservation en ligne ou sur place</li>
            <li>Durée de réservation : 7 jours</li>
            <li>Nombre maximum de livres empruntables : 5</li>
          </ul>
        </div>
        <div className="Section Malus">
          <h2>Pénalités</h2>
          <p>Informations sur les pénalités en cas de retard ou de détérioration du matériel emprunté.</p>
          <ul>
            <li>Retard : 0.50€ par jour de retard</li>
            <li>Détérioration : coût de remplacement du matériel</li>
          </ul>
        </div>
      </div>
    );
}

export default Service;
