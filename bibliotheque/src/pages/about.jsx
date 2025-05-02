import React from 'react';
import '../styles/About.css'; 

function About() {
    return (
      <div className="About">
          <div className="Me">
            <h1>À propos de moi</h1>
            <p>Bonjour, je m'appelle Arnaud Goldberg et je suis un développeur passionné par les nouvelles technologies. Ce site a été entièrement développé par moi en utilisant React.</p>
            <p>Mon objectif avec ce site est de montrer un peu ce que je peux faire.</p>
            <p>N'hésitez pas à me contacter via <a href="mailto:arnaud.goldberg@ecoles-epsi.net">arnaud.goldberg@ecoles-epsi.net</a> pour toute question.</p>
          </div>
      </div>
    );
}

export default About;
