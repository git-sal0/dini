import React from "react";
import "./DriverProfile2.css";
import Driverphoto from "./driver.png";
import car1 from "./car1.jpeg";
import car2 from "./car2.jpeg";
import car3 from "./car3.jpeg";
import car4 from "./car4.jpeg";
import imane from "./Imane.png";
import yossef from "./Youssef.png";
import Rachid from "./Rachid.png";

import { 
  FaClock, 
  FaMusic, 
  FaComments, 
  FaLeaf, 
  FaCarSide, 
  FaStar 
} from "react-icons/fa";

function DriverProfile2() {
  return (
    <div className="container">

      <div className="profile-card">
        <img className="profile-photo" src={Driverphoto} alt="Conducteur" />

        <div className="profile-info">

          <h1>Said Kilo</h1>
          <p>
          </p>
          <div style={{ marginBottom: "10px" }}>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "18px",
                fontWeight: "700",
                color: "#FFA800",
              }}
            >
              <span style={{ fontSize: "22px" }}>⭐</span>
              <span>
                4.8{" "}
                <span style={{ fontSize: "16px", fontWeight: "600" }}>
                  (24 Avis)
                </span>
              </span>
            

            <div
              style={{
                marginTop: "6px",
                background: "#e8f5ff",
                color: "#1f6aed",
                padding: "5px 15px",
                width: "fit-content",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Profil vérifié
            </div>
</div>
          </div>
          <p>
            <strong>Bio :</strong> Je suis un conducteur avec plus de 20 ans
            d'expérience sur les routes du Maroc.
          </p>

        </div>
      </div>

      <div className="box">
        <h2>Préférences du conducteur</h2>
        <div className="prefs">

          <div className="pref-item">
            <FaClock className="pref-icon" /> Ponctuel
          </div>

          <div className="pref-item">
            <FaMusic className="pref-icon" /> Aime la musique
          </div>

          <div className="pref-item">
            <FaComments className="pref-icon" /> Aime discuter
          </div>

          <div className="pref-item">
            <FaLeaf className="pref-icon" /> Respectueux & calme
          </div>

          <div className="pref-item">
            <FaCarSide className="pref-icon" /> Conduite sécurisée
          </div>

          <div className="pref-item">
            <FaStar className="pref-icon" /> Voiture propre
          </div>

        </div>
      </div>

      <div className="box">
        <h2>Informations sur la voiture</h2>
        <p>
          <strong>Marque :</strong> Peugeot
        </p>
        <p>
          <strong>Modèle :</strong> 508
        </p>

        <h3>Photos du véhicule</h3>
        <div className="car-photos">
          <img src={car1} alt="car1" />
          <img src={car2} alt="car2" />
          <img src={car3} alt="car3" />
          <img src={car4} alt="car4" />
        </div>
      </div>

      <div className="box">
        <h2>Avis des passagers</h2>

        <div className="review-block">
          <img className="review-avatar" src={yossef} alt="avatar" />
          <div className="review-content">
            <strong>Youssef M.</strong>
            <div className="review-meta">5 avis • il y a 2 semaines</div>
            <div className="stars">★★★★★</div>
            <div className="verified">Passager vérifié</div>
            <p>
              Super trajet avec Said ! Très ponctuel, explications claires pour
              le point de rencontre. Conduite fluide, j’ai passé un trajet très
              confortable.
            </p>
          </div>
        </div>

        <div className="review-block">
          <img className="review-avatar" src={imane} alt="avatar" />
          <div className="review-content">
            <strong>Imane L.</strong>
            <div className="review-meta">1 avis • il y a 1 mois</div>
            <div className="stars">★★★★☆</div>
            <div className="verified">Passagère vérifiée</div>
            <p>
              Said est très respectueux et professionnel. La voiture était
              propre et bien entretenue. On a un peu discuté et c’était très
              agréable.
            </p>
          </div>
        </div>

        <div className="review-block">
          <img className="review-avatar" src={Rachid} alt="avatar"/>
          <div className="review-content">
            <strong>Rachid A.</strong>
            <div className="review-meta">3 avis • il y a 3 semaines</div>
            <div className="stars">★★★★★</div>
            <div className="verified">Passager vérifié</div>
            <p>
              Très bon conducteur, calme et prudent. J’ai même pu travailler sur
              mon PC pendant le trajet tellement c’était stable 😄.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DriverProfile2;
