import React, { useState } from "react";
import "./PaymentPage2.css";

function PaymentPage() {
  const [imageToShow, setImageToShow] = useState(null);
  const [method, setMethod] = useState("mastercard");
  const [showDetails, setShowDetails] = useState(false); // new
  

  return (
    <div className="page-container">

      {/* POPUP */}
      {imageToShow && (
        <div className="popup-bg" onClick={() => setImageToShow(null)}>
          <div className="popup-card">
            <img src={imageToShow} alt="Info" />
          </div>
        </div>
      )}

      <div className="white-card">

        {/* LEFT SIDE */}
        <div className="left-side">
          <h2 className="title">Méthode de Paiement</h2>

          {/* SELECT PAYMENT METHOD */}
          <div className="radio-group">

            {/* MASTERCARD */}
            <label className="radio-item">
              <input
                type="radio"
                name="method"
                value="mastercard"
                checked={method === "mastercard"}
                onChange={(e) => setMethod(e.target.value)}
              />

              <img
                className="payment-logo"
                src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                alt="MasterCard"
              />

              Master Card
            </label>

            {/* PAYPAL */}
            <label className="radio-item">
              <input
                type="radio"
                name="method"
                value="paypal"
                checked={method === "paypal"}
                onChange={(e) => setMethod(e.target.value)}
              />

              <img
                className="payment-logo"
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                alt="PayPal"
              />

              PayPal
            </label>

            {/* VISA */}
            <label className="radio-item">
              <input
                type="radio"
                name="method"
                value="visa"
                checked={method === "visa"}
                onChange={(e) => setMethod(e.target.value)}
              />

              <img
                className="payment-logo"
                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                alt="Visa"
              />

              Visa
            </label>

          </div>

          {/* FORMULAIRE DYNAMIQUE */}
          <div className="form-grid">

            {(method === "mastercard" || method === "visa") && (
              <>
                <div className="field">
                  <label>Nom sur la carte</label>
                  <input type="text" />
                </div>

                <div className="field">
                  <label>Prénom sur la carte</label>
                  <input type="text" />
                </div>

                <div className="field">
                  <label>
                    Date d'expiration
                    <button
                      className="help-btn"
                      onClick={() => setImageToShow("date-expiration.png")}
                    >
                      ?
                    </button>
                  </label>
                  <input type="text" placeholder="MM/AA" />
                </div>

                <div className="field">
                  <label>
                    CVV/CVC
                    <button
                      className="help-btn"
                      onClick={() => setImageToShow("cvv.png")}
                    >
                      ?
                    </button>
                  </label>
                  <input type="text" placeholder="000" />
                </div>

                <div className="field full">
                  <label>
                    Numéro de carte
                    <button
                      className="help-btn"
                      onClick={() => setImageToShow("numero.png")}
                    >
                      ?
                    </button>
                  </label>
                  <input type="text" placeholder="XXXX XXXX XXXX XXXX" />
                </div>
              </>
            )}

            {/* PAYPAL FORM */}
            {method === "paypal" && (
              <>
                <div className="field full">
                  <label>Email PayPal</label>
                  <input type="email" placeholder="email@paypal.com" />
                </div>

                <div className="field full">
                  <label>Mot de passe PayPal</label>
                  <input type="password" placeholder="********" />
                </div>
              </>
            )}

            <div className="field full">
              <label>Numéro de téléphone</label>
              <input type="text" placeholder="+212 6X XX XX XX" />
            </div>

            <div className="field full">
              <label>E-mail</label>
              <input type="text" placeholder="email@example.com" />
            </div>
          </div>

          <div className="checkbox-line">
            <input type="checkbox" /> Enregistrer mes informations
          </div>
          <div className="checkbox-line">
            <input type="checkbox" /> J'accepte les conditions d'utilisation
          </div>

          {/* BOUTON CENTRÉ APRÈS LE FORMULAIRE */}

        </div>



{/* RIGHT SIDE */}
{(showDetails || window.innerWidth > 600) && (
  <div className="right-side">
    <h2 className="reservation-title">Détails de la réservation</h2>

    <div className="detail-block">
      <label>Trajet</label>
      <p>Ville de départ</p>
      <input className="pill" value="Laayoune" readOnly />
      <p>Ville d'arrivée</p>
      <input className="pill" value="Boujdour" readOnly />
    </div>

    <div className="detail-block">
      <label>Date de départ</label>
      <div className="two-grid">
        <input className="pill" value="28/11/2025" readOnly />
        <input className="pill" value="13:00" readOnly />
      </div>
    </div>

    <div className="detail-block">
      <label>Date d'arrivée</label>
      <div className="two-grid">
        <input className="pill" value="29/11/2025" readOnly />
        <input className="pill" value="06:00" readOnly />
      </div>
    </div>

    <div className="detail-block">
      <label>Places et Baggage</label>
      <input className="pill" value="1 Person" readOnly />
    </div>

    <p className="baggage-text">✔ Baggage autorisé</p>
    <h1 className="price">60.00 DH</h1>
  </div>
)}

          <button
  className="show-details-btn"
  onClick={() => setShowDetails(!showDetails)}
>
  {showDetails ? "Masquer Détails" : "Voir Détails de la réservation"}
</button>
          
          <div className="third-section">
  <div className="pay-row">
    <button className="payment-button">Terminer Paiement</button>
  </div>
</div>


          {/* BOUTON RETIRÉ D'ICI */}
        


      </div>
    </div>
  );
}
export default PaymentPage;