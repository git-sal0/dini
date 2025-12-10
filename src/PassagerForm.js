import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FiLock, FiUser, FiCheckCircle } from "react-icons/fi";
import "./Form.css";
import passager from "./passager5.png";
import FileUpload from "./FileUpload";




function PassagerForm() {
  useEffect(() => {
    // handler for when a tab becomes shown (Bootstrap event)
    const onTabShown = (e) => {
      // e.target is the activated tab button (the one that is now active)
      const activated = e.target.getAttribute("data-bs-target"); // e.g. "#profile"

      // clear all completed classes first (keeps logic simple)
      document.querySelectorAll('.nav-link.completed').forEach(el => el.classList.remove('completed'));

      // if Profile activated -> mark Informations completed
      if (activated === "#profile") {
        const infoBtn = document.querySelector('button[data-bs-target="#info-perso"]');
        if (infoBtn) infoBtn.classList.add("completed");
      }

      // if Terminer activated -> mark Informations and Profile completed
      if (activated === "#terminer") {
        const infoBtn = document.querySelector('button[data-bs-target="#info-perso"]');
        const profileBtn = document.querySelector('button[data-bs-target="#profile"]');
        if (infoBtn) infoBtn.classList.add("completed");
        if (profileBtn) profileBtn.classList.add("completed");
      }
    };

    // attach listeners to all tab buttons (Bootstrap emits 'shown.bs.tab')
    const tabButtons = document.querySelectorAll('button[data-bs-toggle="tab"]');
    tabButtons.forEach(btn => btn.addEventListener("shown.bs.tab", onTabShown));

    // cleanup
    return () => {
      tabButtons.forEach(btn => btn.removeEventListener("shown.bs.tab", onTabShown));
    };
  }, []);


  const [errorInfo, setErrorInfo] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  
  

  const [profileImage, setProfileImage] = useState(null);
  const goToTab = (id) => {
    const tab = document.querySelector(`button[data-bs-target="${id}"]`);
    if (tab) tab.click();
  };
  const [selected, setSelected] = useState([]);

  const togglePref = (pref) => {
    setSelected(prev =>
      prev.includes(pref)
        ? prev.filter(p => p !== pref)  // remove
        : [...prev, pref]               // add
    );
  };

  const prefs = [
    { key: "silence", label: "J’aime le silence" },
    { key: "ponctuel", label: "Je suis ponctuel" },
    { key: "musique", label: "J’aime la musique" },
    { key: "discussions", label: "J’aime les discussions" },
    { key: "fumeur", label: "Je suis fumeur" },
    { key: "animal", label: "J'ai un animal" }
  ];
  const validateInfoTab = () => {
    if (!nom || !prenom || !email|| !password) {
      setErrorInfo("Veuillez remplir tous les champs obligatoires.");
      return false;
    }
  
    if (password.length < 6) {
      setErrorInfo("Le mot de passe doit contenir au moins 6 caractères.");
      return false;
    }
  
    return true;
  };
  return (
    <>
    <h2 className="pf-title">S’inscrire en tant que Passager</h2>

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
          <FiLock className="tab-icon" />
              Informations
          </button>

        <button 
            className="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            type="button"
            role="tab"
            >
              <FiUser className="tab-icon" />
            Profile
        </button>


          <button 
            className="nav-link"
            data-bs-toggle="tab"
            data-bs-target="#terminer"
            type="button"
            role="tab"
          >
            <FiCheckCircle className="tab-icon" />
            Terminer
          </button>

        </div>
      </nav>

      <div className="tab-content">

        {/* TAB 1 – PERSON */}
        <div className="tab-pane fade show active" id="info-perso" role="tabpanel">
          <h3>Informations personnelles</h3>

          <form className="p-form">
          <div className="left-content-f">
            <div>
              <label>Nom :</label>
            <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
            </div>

            <div>
              <label>Prénom :</label>
            <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
            </div>

            <div>
              <label>Email :</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>


            <div>
              <label>Mot de passe :</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div>
              <label>Ressaisir mot de passe :</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>





            </div>
 
            <div className="Right-content-p">
                <img src={passager} alt="passager"/>
            </div>

            <button
  type="button"
  className="btn btn-primary form-submit-btn1"
  onClick={() => {
    if (validateInfoTab()) {
      setErrorInfo("");   // clear error
      goToTab("#profile");
    }
  }}
>
  Suivant
</button>
</form>
{errorInfo && <p className="error-message">{errorInfo}</p>}
        </div>

        {/* TAB 2 – profile */}
        <div className="tab-pane fade" id="profile" role="tabpanel">
        <h3>Détails du passager</h3>

        <form className="p-form profile-form">
            <div className="left-content-f">

            <div>
                <label>Nom d'utilisateur :</label>
                <input type="text" placeholder="Ex : Amine_75" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
              <label>Numéro de téléphone :</label>
            <input type="tel" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
            </div>


            <div>
                <label>Bio :</label>
                <textarea rows="4" placeholder="Parle-nous un peu de toi..." value={bio} onChange={(e) => setBio(e.target.value)} />
                </div>

            <div>
  <label>Preferences :</label>

  <div className="preferences">
    {prefs.map(p => (
      <div
        key={p.key}
        className={`pref-card ${selected.includes(p.key) ? "selected" : ""}`}
        onClick={() => togglePref(p.key)}
      >
        {p.label}
      </div>
    ))}
  </div>
</div>

            </div>

            {/* RIGHT CONTENT */}
            <div className="Right-content-p">

            <label className="image-label">Photo de profil :</label>
            <FileUpload inputId="passager-photo" setFile={setProfileImage} />
            </div>
            <button type="button" className="btn btn-primary form-submit-btn2" onClick={() => goToTab("#terminer")}>Suivant</button>

        </form>
        </div>


{/* TAB 3 – FIN */}
<div className="tab-pane fade" id="terminer" role="tabpanel">
  <h3 className="finish-title">Aperçu du profil</h3>

  <div className="profile-preview">

    {/* LEFT SIDE — Image */}
    <div className="preview-photo-section">
      {profileImage ? (
        <img
          src={URL.createObjectURL(profileImage)}
          alt="Preview"
          className="preview-photo"
        />
      ) : (
        <div className="preview-photo placeholder">
          Aucune photo
        </div>
      )}
    </div>

    {/* RIGHT SIDE — Info */}
    <div className="preview-info">

      <h2 className="preview-name">
        {prenom || "Prénom"} {nom || "Nom"}
      </h2>
      <p className="preview-username">@{username || "username"}</p>

      <div className="preview-section">
        <h4>Bio</h4>
        <p>{bio || "Aucune bio renseignée."}</p>
      </div>

      <div className="preview-section">
        <h4>Préférences</h4>
        {selected.length > 0 ? (
          <ul className="preview-pref-list">
            {selected.map(pref => (
              <li key={pref} className="preview-pref-item">
                {prefs.find(p => p.key === pref)?.label}
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune préférence sélectionnée.</p>
        )}
      </div>

    </div>
  </div>

  <div className="finish-btn-container">
    <button type="submit" className="btn btn-primary finish-btn">
      Terminer
    </button>
  </div>
</div>

</div>
</div>

    </>
  );
}

export default PassagerForm;
