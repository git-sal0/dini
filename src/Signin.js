import React, { useState } from "react";
import Card from "./cards";
import ConducteurForm from "./ConducteurForm";
import PassagerForm from "./PassagerForm";
import conducteur1 from "./conducteur1.png";
import passager2 from "./passager2.png";

import "./Signin.css";

function SignIn() {
  const [roleSelected, setRoleSelected] = useState(null);

  const handleBack = () => setRoleSelected(null);

  if (roleSelected === "conducteur") {
    return <ConducteurForm onBack={handleBack} />;
  }

  if (roleSelected === "passager") {
    return <PassagerForm onBack={handleBack} />;
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Choisir Votre Rôle</h1>
      <div className="cards-wrapper">
        <Card
          image={conducteur1}
          title="Conducteur"
          bgCircleColor="#289adc"
          description="Gagnez de l'argent en conduisant et aidez les passagers à se déplacer facilement."
          onClickButton={() => setRoleSelected("conducteur")}
        />

        <Card
          image={passager2}
          title="Passager"
          bgCircleColor="#9bdc28"
          description="Trouvez rapidement un conducteur et voyagez confortablement et en toute sécurité."
          onClickButton={() => setRoleSelected("passager")}
        />
      </div>
    </div>
  );
}

export default SignIn;
