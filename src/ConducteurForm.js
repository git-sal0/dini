import React, { useState, useEffect } from "react";
import { FiLock, FiCheckCircle } from "react-icons/fi";
import { FaCar } from "react-icons/fa";
import "./Form.css";
import conducteur from "./conducteur3.png";
import FileUpload from "./FileUpload";

function ConducteurForm() {
  useEffect(() => {
    const onTabShown = (e) => {
      const activated = e.target.getAttribute("data-bs-target");

      document
        .querySelectorAll(".nav-link.completed")
        .forEach((el) => el.classList.remove("completed"));

      if (activated === "#profile") {
        document
          .querySelector('button[data-bs-target="#info-perso"]')
          ?.classList.add("completed");
      }

      if (activated === "#voiture") {
        document
          .querySelector('button[data-bs-target="#info-perso"]')
          ?.classList.add("completed");
        document
          .querySelector('button[data-bs-target="#profile"]')
          ?.classList.add("completed");
      }

      if (activated === "#terminer") {
        document
          .querySelector('button[data-bs-target="#info-perso"]')
          ?.classList.add("completed");
        document
          .querySelector('button[data-bs-target="#profile"]')
          ?.classList.add("completed");
        document
          .querySelector('button[data-bs-target="#voiture"]')
          ?.classList.add("completed");
      }
    };

    const tabButtons = document.querySelectorAll("button[data-bs-toggle='tab']");
    tabButtons.forEach((btn) =>
      btn.addEventListener("shown.bs.tab", onTabShown)
    );

    return () => {
      tabButtons.forEach((btn) =>
        btn.removeEventListener("shown.bs.tab", onTabShown)
      );
    };
  }, []);

  // ------------------------
  //    FORM STATES
  // ------------------------

  const [errorInfo, setErrorInfo] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  // Voiture
  const [marque, setMarque] = useState("");
  const [modele, setModele] = useState("");
  const [carImages, setCarImages] = useState([null, null, null]);

  const goToTab = (id) => {
    document.querySelector(`button[data-bs-target="${id}"]`)?.click();
  };

  const [selected, setSelected] = useState([]);

const [errorVehicule, setErrorVehicule] = useState("");


  const togglePref = (p) => {
    setSelected((prev) =>
      prev.includes(p) ? prev.filter((e) => e !== p) : [...prev, p]
    );
  };

  const prefs = [
    { key: "silence", label: "J’aime le silence" },
    { key: "ponctuel", label: "Je suis ponctuel" },
    { key: "musique", label: "J’aime la musique" },
    { key: "discussions", label: "J’aime les discussions" },
    { key: "fumeur", label: "Je suis fumeur" },
    { key: "animal", label: "J'ai un animal" },
  ];

  const validateInfoTab = () => {
    if (!nom || !prenom || !email || !password) {
      setErrorInfo("Veuillez remplir tous les champs obligatoires.");
      return false;
    }
    if (password.length < 6) {
      setErrorInfo("Le mot de passe doit contenir au moins 6 caractères.");
      return false;
    }
    if (password !== confirmPassword) {
      setErrorInfo("Les mots de passe ne correspondent pas.");
      return false;
    }
    return true;
  };

  const validateProfileTab = () => {
    if (!telephone) {
      setErrorVehicule("Veuillez entrer un numéro de téléphone.");
      return false;
    }
    
    if (!username) {
      setErrorVehicule("Veuillez entrer un nom d'utilisateur.");
      return false;
    }
    return true;
  };
  
  return (
    <>
      <h2 className="pf-title">S’inscrire en tant que Conducteur</h2>

      <div className="pf-container">
        <nav>
          <div className="nav nav-tabs" role="tablist">
            <button
              className="nav-link active"
              data-bs-toggle="tab"
              data-bs-target="#info-perso"
              type="button"
              role="tab"
            >
              <FiLock className="tab-icon" /> Informations
            </button>

            <button
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#profile"
              type="button"
              role="tab"
            >
              <FaCar className="tab-icon" /> Profil conducteur
            </button>

            <button
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#voiture"
              type="button"
              role="tab"
            >
              <FaCar className="tab-icon" /> Voiture
            </button>

            <button
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#terminer"
              type="button"
              role="tab"
            >
              <FiCheckCircle className="tab-icon" /> Terminer
            </button>
          </div>
        </nav>

        <div className="tab-content">
          {/* TAB 1 : INFO */}
          <div className="tab-pane fade show active" id="info-perso">
            <h3>Informations personnelles</h3>

            <form className="p-form">
              <div className="left-content-f">
                <label>Nom :</label>
                <input value={nom} onChange={(e) => setNom(e.target.value)} />

                <label>Prénom :</label>
                <input
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                />

                <label>Email :</label>
                <input
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />



                <label>Mot de passe :</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <label>Ressaisir mot de passe :</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                </div> 

              <div className="Right-content-p">
                <img src={conducteur} alt="" />
              </div>

              <button
                type="button"
                className="btn btn-primary form-submit-btn1"
                onClick={() => {
                  if (validateInfoTab()) {
                    setErrorInfo("");
                    goToTab("#profile");
                  }
                }}
              >
                Suivant
              </button>
            </form>

            {errorInfo && <p className="error-message">{errorInfo}</p>}
          </div>

          {/* TAB 2 : PROFILE */}
          <div className="tab-pane fade" id="profile">
            <h3>Profil conducteur</h3>

            <form className="p-form profile-form">
              <div className="left-content-f">
                <label>Nom d'utilisateur :</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <label>Bio :</label>
                <textarea
                  rows="4"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                <label>Téléphone :</label>
                <input
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                />

                <label>Préférences :</label>
                <div className="preferences">
                  {prefs.map((p) => (
                    <div
                      key={p.key}
                      className={`pref-card ${
                        selected.includes(p.key) ? "selected" : ""
                      }`}
                      onClick={() => togglePref(p.key)}
                    >
                      {p.label}
                    </div>
                  ))}
                </div>
                {errorVehicule && <p className="error-message">{errorVehicule}</p>}

              </div>

              <div className="Right-content-p">
                <label>Photo de profil :</label>
                <FileUpload inputId="profile-image" setFile={setProfileImage}/>              </div>

                <button
  type="button"
  className="btn btn-primary form-submit-btn2"
  onClick={() => {
    if (validateProfileTab()) {
      goToTab("#voiture");
    }
  }}
>
  Suivant
</button>
            </form>
          </div>

{/* TAB 3 : CAR */}
<div className="tab-pane fade" id="voiture">
  <h3>Informations sur la voiture</h3>

  <form className="p-form car-form-full">

    {/* ---- NOUVELLE STRUCTURE EN 2 LIGNES ---- */}
    <div className="car-input-grid">

      {/* ROW 1 : MARQUE + MODELE */}
      <div className="car-row">
        <div className="car-field">
          <label>Marque :</label>
          <input value={marque} onChange={(e) => setMarque(e.target.value)} />
        </div>

        <div className="car-field">
          <label>Modèle :</label>
          <input value={modele} onChange={(e) => setModele(e.target.value)} />
        </div>
      </div>

    </div>

    {/* ---- PHOTOS ---- */}
    <h4 className="car-photo-title">Photos de la voiture :</h4>

    <div className="car-images-row">
      {[0, 1, 2].map((index) => (
        <div key={index} className="car-photo-item">
          <FileUpload
            inputId={`car-image-${index}`}
            setFile={(file) => {
              const updated = [...carImages];
              updated[index] = file;
              setCarImages(updated);
            }}
          />
        </div>
      ))}
    </div>

    <button
      type="button"
      className="btn btn-primary form-submit-btn2"
      onClick={() => goToTab("#terminer")}
    >
      Suivant
    </button>
  </form>
</div>



          {/* TAB 4 : FIN */}
          <div className="tab-pane fade" id="terminer">
            <h3>Aperçu final</h3>

            <div className="profile-preview">
              <div className="preview-photo-section">
                {profileImage ? (
                  <img
                    src={URL.createObjectURL(profileImage)}
                    className="preview-photo"
                    alt="carphoto"
                  />
                ) : (
                  <div className="preview-photo placeholder">
                    Aucune photo
                  </div>
                )}
              </div>
              

              <div className="preview-info">
                <h2>
                  {prenom} {nom}
                </h2>
                <p>@{username}</p>

                <h4>Bio</h4>
                <p>{bio}</p>
                <h4>Voiture</h4>

<div className="preview-car-info">
  <p><strong>Marque :</strong> {marque || "—"}</p>
  <p><strong>Modèle :</strong> {modele || "—"}</p>
</div>

<h3 className="finish-section-title">Photos du véhicule</h3>

<div className="finish-car-photos">
  {carImages.every((img) => img === null) ? (
    <div className="car-photo-placeholder">Aucune photo du véhicule</div>
  ) : (
    carImages.map((img, index) =>
      img ? (
        <img
          key={index}
          src={URL.createObjectURL(img)}
          alt={`car-${index}`}
          className="finish-car-photo"
        />
      ) : null
    )
  )}
</div>



                
              </div>
            </div>


            <button className="btn btn-primary finish-btn">Terminer</button>
            </div>
            </div>
            </div>
            </>
  );
}

export default ConducteurForm;
