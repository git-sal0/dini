import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./details.css";
import car1 from "./car1.jpeg";
import car2 from "./car2.jpeg";
import car3 from "./car3.jpeg";
import car4 from "./car4.jpeg";
import Driver from "./driver.png"; 
const allImages = [
  car1,
  car2,
  car3,
  car4
];

function Details() {

  const goToDriverProfile = () => {
    alert("Page Profil (désactivée car pas de router).");
  };

  const [start, setStart] = useState(0);

  const images = [...allImages.slice(start), ...allImages.slice(0, start)];

  const nextImage = () => {
    setStart((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setStart((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const openWhatsApp = () => {
    const phone = "212600000000";
    const message = encodeURIComponent("Salam, je suis intéressé par votre offre.");
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  const goToPaymentPage = () => {
    window.location.href = "/PaymentPage2";
  };

  return (
    <div className="offer-container">
      <h2 className="section-title">Détails de l’offre</h2>

      <div className="map-card">
        <div className="map-left">

          {/* START */}
          <div className="time-block">
            <div className="time">14:30</div>
            <div className="place">LAAYOUNE</div>
            <div className="addr">Quartier 25Mars Rue Force Armee</div>
          </div>

          {/* VIA BLOCK (corrigé) 
          <div className="via">
            <span>|</span>
            <span className="dot">
            <div className="time">15:30</div>
            <div className="place">BOUJDOUR</div>
            </span>
            <span>|</span>
          </div>*/}
            {/* VIA BLOCK (corrigé) */}
            <div className="via">
            <span className="dot">
            <div className="time">15:30</div>
            <div className="place">BOUJDOUR</div>
            <div className="addr">Quartier 25Mars Rue Force Armee</div>
            </span>
          </div>

          {/* DESTINATION */}
          <div className="time-block">
            <div className="time">16:49</div>
            <div className="place">BOUJDOUR</div>
            <div className="addr">Quartier 25Mars Rue Force Armee</div>
          </div>

        </div>

        <div className="map-right">
          <iframe
            title="trajet-laayoune-boujdour"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d677732.0994031736!2d-13.472423899999999!3d26.839932649999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0xdb5b73f2f03f5c7%3A0xffe66909d028d391!2sLa%C3%A2youne!3m2!1d27.153611!2d-13.203333!4m5!1s0xdb6641dab09aead%3A0xeab97b4124950797!2sBoujdour!3m2!1d26.124166999999998!2d-14.484722!5e0!3m2!1sfr!2sma!4v1733527998000!5m2!1sfr!2sma"
            style={{
              border: 0,
              width: "100%",
              height: "100%",
            }}
          ></iframe>
        </div>
      </div>


      <div className="driver-row">
  <Link to="/DriverProfile2" className="driver-card" style={{ cursor: "pointer" }}>
    <img className="driver-photo" src={Driver} alt="Driver" />
    
    <div className="driver-meta">
      <div className="driver-name">Said kilo</div>
      <div className="driver-rating">⭐ 4.8 (24 Avis)</div>
      <div className="driver-badge">Profil vérifiée</div>
    </div>
  </Link>



        <div className="desc-card">
          <h4>Description :</h4>
          <p className="desc-text">
            Salamo3alikom Lah ykhelikom ghir nass l mohtarama w jo fliwe9t, mohim whafdo 3la nadafa dyal tonobil
          </p>

          <h4>Préférence :</h4>
          <div className="prefs">
            <span className="pref">✓ Musique</span>
            <span className="pref pref-no">✗ Animaux</span>
            <span className="pref pref-no">✗ Fumeur</span>
          </div>
        </div>
      </div>

      <h3 className="sub-title">Images du voiture :</h3>

      <div className="gallery-wrapper">
        <button className="arrow-btn left" onClick={prevImage}>‹</button>

        <div className="thumbs-wrapper">
          {images.map((img, i) => (
            <div className="thumb-box" key={i}>
              <img src={img} alt={`car-${i}`} />
            </div>
          ))}
        </div>

        <button className="arrow-btn right" onClick={nextImage}>›</button>
      </div>

      <div className="footer fixed-footer">
  <div className="price-col">
    <div className="per">par personne</div>
    <div className="price">60.00DH</div>
  </div>

  <div className="actions">
    <button className="msg-btn" onClick={openWhatsApp}>Messager</button>
    <button className="confirm-btn" onClick={goToPaymentPage}>Confirmer</button>
  </div>
</div>
    </div>
  );
}
export default Details;
