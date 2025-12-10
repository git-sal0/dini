import React from "react";
import "./AjouterTrajet.css";
import { useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUsers, FaEuroSign, FaSuitcase } from "react-icons/fa";

export default function AjouterTrajet() {
	const villes = [
		"Agadir",
		"Dakhla",
		"Laayoune",
		"Guelmim",
		"Boujdour",
		"Akhfennir",
		"Legwira",
		"Sidi ifni",
		"Tantan",

	  ];
	  
  const [depart, setDepart] = useState("");
  const [arrivee, setArrivee] = useState("");
  const [date, setDate] = useState("");
  const [heure, setHeure] = useState("");
  const [prix, setPrix] = useState("");
  const [places, setPlaces] = useState(1);
  const [commentaire, setCommentaire] = useState("");
  const [stops, setStops] = useState([""]);
  const addStop = () => {
	setStops([...stops, ""]);
  };
  const updateStop = (index, value) => {
	const newStops = [...stops];
	newStops[index] = value;
	setStops(newStops);
  };
  const removeStop = (index) => {
	const newStops = stops.filter((_, i) => i !== index);
	setStops(newStops);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      depart, arrivee, date, heure, prix, places, commentaire
    });
  };

  return (
    <div className="trajet-page">
      <div className="trajet-card">
        <h2>Ajouter un trajet</h2>

        <form onSubmit={handleSubmit}>

          {/* Villes */}
          <div className="trajet-row">
		  <div className="trajet-input">
			<label><FaMapMarkerAlt /> Ville de départ</label>
			<input
				list="liste-villes"
				type="text"
				value={depart}
				onChange={(e) => setDepart(e.target.value)}
				placeholder="Choisir une ville"
				required
			/>
			</div>

			<div className="trajet-input">

				
  <label><FaMapMarkerAlt /> Ville d’arrivée</label>
  <input
    list="liste-villes"
    type="text"
    value={arrivee}
    onChange={(e) => setArrivee(e.target.value)}
    placeholder="Choisir une ville"
    required
  />
</div>
<datalist id="liste-villes">
  {villes.map((ville, idx) => (
    <option key={idx} value={ville} />
  ))}
</datalist>
          </div>
		  <div className="trajet-section">

  {/* BUTTON ROW (ALONE) */}
  <div className="row-add-stop">
    <button type="button" className="btn-add-stop" onClick={addStop}>
      + Ajouter un stop
    </button>
  </div>

  {/* LIST OF STOPS */}
  {stops.map((stop, index) => (
    <div className="stop-input-wrapper" key={index}>
      <input
	      list="liste-villes"
        type="text"
        className="stop-input"
        placeholder={`Stop ${index + 1}`}
        value={stop}
        onChange={(e) => updateStop(index, e.target.value)}
      />

      {/* X INSIDE INPUT */}
      <span className="remove-stop" onClick={() => removeStop(index)}>
        ✖
      </span>
    </div>
  ))}
</div>



          {/* Date + Heure */}
          <div className="trajet-row">
            <div className="trajet-input">
              <label><FaCalendarAlt /> Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>

            <div className="trajet-input">
              <label><FaClock /> Heure</label>
              <input type="time" value={heure} onChange={(e) => setHeure(e.target.value)} required />
            </div>
          </div>

          {/* Prix + Places */}
          <div className="trajet-row">
            <div className="trajet-input">
              <label><FaEuroSign /> Prix</label>
              <input type="number" value={prix} onChange={(e) => setPrix(e.target.value)} required />
            </div>

            <div className="trajet-input">
              <label><FaUsers /> Nombre de places</label>
              <input type="number" value={places} onChange={(e) => setPlaces(e.target.value)} required   min="1" max="4"/>
            </div>
          </div>

          {/* Commentaire */}
          <div className="trajet-input">
            <label>Commentaire</label>
            <textarea value={commentaire} onChange={(e) => setCommentaire(e.target.value)} placeholder="Informations supplémentaires…" />
          </div>

          {/* Button */}
          <button className="trajet-btn" type="submit">Ajouter le trajet</button>
        </form>
      </div>
    </div>
  );
}
