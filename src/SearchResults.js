import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiCalendar, FiUsers } from "react-icons/fi";// hadi 3la 9bl les icones
import "./SearchResults.css";

const SearchResults = () => {
  // hna lfiltartion dyal dakchi li f state
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    min: "",
    max: "",
    seats: "",
    date: "",
    time: "",
  });
 // hana la liste dyal gaaa3e les offre li kaynin
  const offers = [
    { id: 0, from: "Laayoune", to: "Boujdour", date: "2025-11-28", time: "21:00", persons: 2, price: 75, tag: "Trajet Rapide", color: "orange" },
    { id: 1, from: "Laayoune", to: "Boujdour", date: "2025-11-28", time: "23:00", persons: 1, price: 60 },
    { id: 2, from: "Laayoune", to: "Gwera", date: "2025-11-28", time: "10:00", persons: 3, price: 50, tag: "Meilleur prix", color: "blue" },
    { id: 3, from: "Agadir", to: "Boujdour", date: "2025-11-28", time: "19:00", persons: 1, price: 160 },
    { id: 4, from: "Laayoune", to: "Gwera", date: "2025-11-28", time: "06:00", persons: 2, price: 70 },
    { id: 5, from: "Laayoune", to: "Boujdour", date: "2025-11-28", time: "21:00", persons: 4, price: 40 },
    { id: 6, from: "Sidi Ifni", to: "Boujdour", date: "2025-11-28", time: "09:00", persons: 2, price: 80 },
  ];

  // hna kaytb9e lfiltration 3la les offres 
const filteredOffers = offers.filter(o => {
  return (
    (filters.from ? o.from.toLowerCase().includes(filters.from.toLowerCase()) : true) &&  // kay9lb 3la la ville de départ li ktbna wach kayna 
    (filters.to ? o.to.toLowerCase().includes(filters.to.toLowerCase()) : true) && // kay9lb 3la la ville d'arrivée li ktbna wach kayna
    (filters.date ? o.date === filters.date : true) && // kay9lb 3la la date li ktbna wach kayna
    (filters.time ? o.time === filters.time : true) && // kay9lb 3la sa3a li ktbna wach kayna
    (filters.min !== "" ? o.price >= Number(filters.min) : true) && // kanhdedo a9al tamane
    (filters.max !== "" ? o.price <= Number(filters.max) : true) && // kanhdedo aktar tamane
    (filters.seats ? o.persons === Number(filters.seats) : true)  // kay9lb 3la les pffres li 3ndhom dak le nombre de place li ktbna wach kayna
  );
});

  return (
    <div className="dini-wrapper">       {/* ---- dakchi li kayban f la page mn hna kaybda ---- */}


      <aside className="filters-box">  {/* ---- han kaybda lfiltre ---- */}
        <h3 className="filters-title">Filtrer par :</h3>

        <label>Trajet</label>
        <label className="mini-label">Ville départ</label>
        <input type="text" placeholder="Laayoune" onChange={(e)=> setFilters({...filters, from: e.target.value})} /> {/* ---- hna kaya5ed dakchi li kaykteb l'utilisateur f input o kay5bih f state bach n5dro n5dmo bih mn b3d ---- */}

        <label className="mini-label">Ville d’arrivée</label>
        <input type="text" placeholder="Boujdour" onChange={(e)=> setFilters({...filters, to: e.target.value})} /> {/* ---- nfs chi ---- */}

        <div className="date-time-row">
          <div>
            <label className="mini-label">Date</label>
            <input type="date" onChange={(e)=> setFilters({...filters, date: e.target.value})} /> {/* ---- nfs chi ---- */}
          </div>

          <div>
            <label className="mini-label">Heure</label>
            <input type="time" onChange={(e)=> setFilters({...filters, time: e.target.value})} /> {/* ---- nfs chi ---- */}
          </div>
        </div>

        <label>Places & Prix</label>

        <div className="date-time-row">
          <div>
            <label className="mini-label">Prix min</label>
            <input type="number" min="0" onChange={(e)=> setFilters({...filters, min: e.target.value})} /> {/* ---- nfs chi ---- */}
          </div>

          <div>
            <label className="mini-label">Prix max</label>
            <input type="number" min="0" onChange={(e)=> setFilters({...filters, max: e.target.value})} /> {/* ---- nfs chi ---- */}
          </div>
        </div>

        <label>Places & Bagage</label>
        <select onChange={(e)=> setFilters({...filters, seats: e.target.value})}> {/* ---- nfs chi ---- */}
          <option value="">Toutes les places</option>
          <option value="1">1 Personne</option>
          <option value="2">2 Personnes</option>
          <option value="3">3 Personnes</option>
          <option value="4">4 Personnes</option>
        </select>


        <div className="toggle">
          <span>Baggage autorisé</span>

          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>
      </aside>

      {/* ---- OFFERS ---- */}
      <main className="offers-area">
        <div className="offers-header">
          <h2>{filteredOffers.length} offres trouvée</h2>
          <span className="sort">Plus récent</span>
        </div>
       {/* ---- hna kay9elb 3la les offres o kayhthom  ---- */}
        {filteredOffers.map(o => (
          <div 
            className={`offer-card ${o.color === "orange" ? "highlight-orange" : ""} ${o.color === "blue" ? "highlight-blue" : ""}`}
            key={o.id} // hadi z3ma kamchi kaychof les offret li fihom dik l3iba lfo9e kaydirom ya b orange ya blue
          >

            {/* BADGE EN HAUT */}
            {o.tag && (
              <span className={`tag ${o.color}`}>{o.tag}</span>
            )}

            <div className="offer-left">
              <div className="route-line">
                <FiMapPin /> {o.from} → {o.to}  {/* ---- mn fin htal fin ---- */}
              </div>

              <div className="details-line">
                <FiCalendar /> {o.date} <strong>{o.time}</strong> {/* ---- tari5e o lw9t ---- */}
              </div>

              <div className="details-line">
                <FiUsers /> {o.persons} Persons {/* ---- nombre de place ---- */}
              </div>
            </div>

            <div className="offer-right">
              <div className="price">{o.price}.00 MAD</div> {/* ---- kay9leb 3la tamane o kayhto lina kayzid .00 MAD ---- */}
              <Link to="/Details"><button className="voir-plus">voir plus</button></Link>
            </div>

          </div>
        ))}
      </main>
    </div>
  );
};

export default SearchResults;
