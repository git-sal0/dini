import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMapPin,
  FiCalendar,
  FiUsers,
  FiFilter
} from "react-icons/fi";
import "./SearchResults.css";

const SearchResults = () => {
  // Filters state
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    min: "",
    max: "",
    seats: "",
    date: "",
    time: "",
  });

  // Mobile: toggle filters panel
  const [showFilters, setShowFilters] = useState(false);

  // Offers list
  const offers = [
    {
      id: 0,
      from: "Laayoune",
      to: "Boujdour",
      date: "2025-11-28",
      time: "21:00",
      persons: 2,
      price: 75,
      tag: "Trajet Rapide",
      color: "orange"
    },
    {
      id: 1,
      from: "Laayoune",
      to: "Boujdour",
      date: "2025-11-28",
      time: "23:00",
      persons: 1,
      price: 60
    },
    {
      id: 2,
      from: "Laayoune",
      to: "Gwera",
      date: "2025-11-28",
      time: "10:00",
      persons: 3,
      price: 50,
      tag: "Meilleur prix",
      color: "blue"
    },
    {
      id: 3,
      from: "Agadir",
      to: "Boujdour",
      date: "2025-11-28",
      time: "19:00",
      persons: 1,
      price: 160
    },
    {
      id: 4,
      from: "Laayoune",
      to: "Gwera",
      date: "2025-11-28",
      time: "06:00",
      persons: 2,
      price: 70
    },
    {
      id: 5,
      from: "Laayoune",
      to: "Boujdour",
      date: "2025-11-28",
      time: "21:00",
      persons: 4,
      price: 40
    },
    {
      id: 6,
      from: "Sidi Ifni",
      to: "Boujdour",
      date: "2025-11-28",
      time: "09:00",
      persons: 2,
      price: 80
    },
  ];

  // Filter logic
  const filteredOffers = offers.filter((o) => {
    return (
      (filters.from ? o.from.toLowerCase().includes(filters.from.toLowerCase()) : true) &&
      (filters.to ? o.to.toLowerCase().includes(filters.to.toLowerCase()) : true) &&
      (filters.date ? o.date === filters.date : true) &&
      (filters.time ? o.time === filters.time : true) &&
      (filters.min !== "" ? o.price >= Number(filters.min) : true) &&
      (filters.max !== "" ? o.price <= Number(filters.max) : true) &&
      (filters.seats ? o.persons === Number(filters.seats) : true)
    );
  });

  return (
    <div className="dini-wrapper">

      {/* MOBILE filter button */}
      <button
        className="filter-toggle-btn"
        onClick={() => setShowFilters(!showFilters)}
      >
        <FiFilter size={18} />
        Filtrer
      </button>

      {/* FILTERS PANEL */}
      <aside className={`filters-box ${showFilters ? "show" : ""}`}>
        <h3 className="filters-title">Filtrer par :</h3>

        <label>Trajet</label>
        <br/>
        <label className="mini-label">Ville départ</label><br/>
        <input
          type="text"
          placeholder="Laayoune"
          onChange={(e) =>
            setFilters({ ...filters, from: e.target.value })
          }
        />
<br/>
        <label className="mini-label">Ville d’arrivée</label><br/>
        <input
          type="text"
          placeholder="Boujdour"
          onChange={(e) =>
            setFilters({ ...filters, to: e.target.value })
          }
        />

        <div className="date-time-row">
          <div>
            <label className="mini-label">Date</label><br/>
            <input
              type="date"
              onChange={(e) =>
                setFilters({ ...filters, date: e.target.value })
              }
            />
          </div>

          <div>
            <label className="mini-label">Heure</label><br/>
            <input
              type="time"
              onChange={(e) =>
                setFilters({ ...filters, time: e.target.value })
              }
            />
          </div>
        </div>

        <label>Places & Prix</label>

        <div className="date-time-row">
          <div>
            <label className="mini-label">Prix min</label><br/>
            <input
              type="number"
              min="0"
              onChange={(e) =>
                setFilters({ ...filters, min: e.target.value })
              }
            />
          </div>

          <div>
            <label className="mini-label">Prix max</label><br/>
            <input
              type="number"
              min="0"
              onChange={(e) =>
                setFilters({ ...filters, max: e.target.value })
              }
            />
          </div>
        </div>

        <label>Places & Bagage</label>

        <select
          onChange={(e) =>
            setFilters({ ...filters, seats: e.target.value })
          }
        >
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

      {/* =====================
          OFFERS LIST
      ====================== */}
      <main className="offers-area">
        <div className="offers-header">
          <h2>{filteredOffers.length} offres trouvée</h2>
          <span className="sort">Plus récent</span>
        </div>

        {filteredOffers.map((o) => (
          <div
            className={`offer-card ${
              o.color === "orange" ? "highlight-orange" : ""
            } ${o.color === "blue" ? "highlight-blue" : ""}`}
            key={o.id}
          >
            {/* BADGE */}
            {o.tag && <span className={`tag ${o.color}`}>{o.tag}</span>}

            <div className="offer-left">
              <div className="route-line">
                <FiMapPin /> {o.from} → {o.to}
              </div>

              <div className="details-line">
                <FiCalendar /> {o.date} <strong>{o.time}</strong>
              </div>

              <div className="details-line">
                <FiUsers /> {o.persons} Persons
              </div>
            </div>

            <div className="offer-right">
              <div className="price">{o.price}.00 MAD</div>
              <Link to="/Details">
                <button className="voir-plus">voir plus</button>
              </Link>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default SearchResults;
