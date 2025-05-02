import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="logo-container">
                    <a href='https://www.montpellier3m.fr/' target="_blank" rel="noopener noreferrer">
                        <img src="https://mediatheques.montpellier3m.fr/ui/skins/camo/images/brandville.png" alt="Logo Montpellier" className="logo" />
                    </a>
                </div>
                <div className="contact">
                    <h3>Contact</h3>
                    <p>
                        Bibliothèque municipale de Montpellier <br />
                        240, rue de l'Acropole - 34000 Montpellier <br />
                        Téléphone: 04 67 34 87 00 <br />
                        Email: <a href="mailto:bm@bm-Montpellier.fr">bm@bm-Montpellier.fr</a>
                    </p>
                </div>
                <div className="reseau">
                    <h3>Réseaux Sociaux</h3>
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-youtube"></i> YouTube
                    </a>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook"></i> Facebook
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter"></i> Twitter
                    </a>
                </div>
                <div className="information">
                    <h3>Informations</h3>
                    <p>Fait par Arnaud Goldberg</p>
                    <p><a href="/mentions-legales">Mentions légales</a></p>
                    <p><a href="/plan-du-site">Plan du site</a></p>
                    <p><a href="/newsletter">Newsletter</a></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
