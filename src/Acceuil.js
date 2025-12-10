import React, { useState, useRef, useEffect, useCallback, useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from "react-icons/fa";
// Importation du composant Counter pour animer les statistiques
import Counter from "./Counter";
import HeroImg from "./hero.jpg";
import "./Accueil.css";
// Importation du contexte de langue pour la traduction
import { LanguageContext } from './LanguageContext';
import IconFacebook from "./facebook-icon.webp";
import IconYoutube from "./youtube-app-white-icon.webp";
import IconInstagram from "./instagram-white-icon.webp";
import IconX from "./X_logo_2023_(white).png";
import IconLink from "./linkedin-app-white-icon.webp";
import IconTiktok from "./tiktok-icon-white-logo-tiktok-app-transparent-background-premium-social-media-design-for-digital-download-free-png.webp";
import IconPlaystore from "./google-play.png";
import IconApp from "./apple-app-store--v2.png";
import IconChercher from "./Chercher-icon.png";
import IconChoisir from "./Choisir-icon.png";
import IconPrendre from "./Prendre-icon.png";
import IconArriver from "./Arriver-icon.png";
import AboutImage from "./A propos.jpg";
import MissionImage from "./Notre mission.jpg";

// Liste constante des villes du sud du Maroc disponibles pour la recherche
const villesSudMaroc = [
  "Agadir",
  "Dakhla",
  "Laâyoune",
  "Guelmim",
  "Boujdour",
  "Akhfennir",
  "Gwera",
  "Sidi Ifni",
  "Tantan",
];

// Composant principal de la page d'accueil
export default function Accueil() {
  // Hook pour naviguer vers d'autres pages
  const navigate = useNavigate();
  // Récupération de la fonction de traduction depuis le contexte de langue
  const { t } = useContext(LanguageContext);
  
  // État pour stocker les données du formulaire de recherche
  const [formData, setFormData] = useState({
    depart: "",
    arrivee: "",
    date: "",
    passagers: 1
  });

  // État pour stocker les erreurs de validation du formulaire
  const [errors, setErrors] = useState({});
  // État pour afficher/masquer la liste déroulante des villes de départ
  const [showDepartList, setShowDepartList] = useState(false);
  // État pour afficher/masquer la liste déroulante des villes d'arrivée
  const [showArriveeList, setShowArriveeList] = useState(false);
  // État pour stocker la liste filtrée des villes de départ
  const [filteredVillesDepart, setFilteredVillesDepart] = useState(villesSudMaroc);
  // État pour stocker la liste filtrée des villes d'arrivée
  const [filteredVillesArrivee, setFilteredVillesArrivee] = useState(villesSudMaroc);
  
  // Référence pour le conteneur du champ de départ (pour détecter les clics extérieurs)
  const departRef = useRef(null);
  // Référence pour le conteneur du champ d'arrivée
  const arriveeRef = useRef(null);
  // Référence pour la liste déroulante des villes de départ
  const departListRef = useRef(null);
  // Référence pour la liste déroulante des villes d'arrivée
  const arriveeListRef = useRef(null);

  // Fonction de validation du formulaire (mémorisée pour éviter les recalculs)
  const validateForm = useCallback(() => {
    // Objet pour stocker les nouvelles erreurs
    const newErrors = {};
    
    // Validation de la ville de départ
    if (!formData.depart.trim()) {
      // Si le champ est vide, ajouter une erreur
      newErrors.depart = t('error_select_depart');
    } else if (!villesSudMaroc.includes(formData.depart)) {
      // Si la ville n'est pas dans la liste, ajouter une erreur
      newErrors.depart = t('error_invalid_ville');
    }
    
    // Validation de la ville d'arrivée
    if (!formData.arrivee.trim()) {
      // Si le champ est vide, ajouter une erreur
      newErrors.arrivee = t('error_arrivee_required');
    } else if (!villesSudMaroc.includes(formData.arrivee)) {
      // Si la ville n'est pas dans la liste, ajouter une erreur
      newErrors.arrivee = t('error_invalid_ville');
    }
    
    // Validation : la ville de départ et d'arrivée ne doivent pas être identiques
    if (formData.depart && formData.arrivee && formData.depart === formData.arrivee) {
      newErrors.arrivee = t('error_same_city');
    }
    
    // Validation de la date
    if (!formData.date) {
      // Si aucune date n'est sélectionnée, ajouter une erreur
      newErrors.date = t('error_date_required');
    } else {
      // Créer un objet Date à partir de la date sélectionnée
      const selectedDate = new Date(formData.date);
      // Créer un objet Date pour aujourd'hui
      const today = new Date();
      // Réinitialiser les heures pour comparer uniquement les dates
      today.setHours(0, 0, 0, 0);
      
      // Vérifier si la date sélectionnée est dans le passé
      if (selectedDate < today) {
        newErrors.date = t('error_date_past');
      }
    }
    
    // Validation du nombre de passagers
    if (!formData.passagers || formData.passagers < 1) {
      // Si le nombre est inférieur à 1, ajouter une erreur
      newErrors.passagers = t('error_passagers_min');
    } else if (formData.passagers > 8) {
      // Si le nombre est supérieur à 8, ajouter une erreur
      newErrors.passagers = t('error_passagers_max');
    }
    
    // Mettre à jour l'état des erreurs
    setErrors(newErrors);
    // Retourner true si aucune erreur, false sinon
    return Object.keys(newErrors).length === 0;
  }, [formData, t]); // Dépendances : formData et t

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = useCallback((e) => {
    // Récupérer la valeur saisie
    const value = e.target.value;
    // Récupérer le nom du champ (depart, arrivee, date, passagers)
    const name = e.target.name;
    
    // Mettre à jour l'état du formulaire avec la nouvelle valeur
    setFormData(prev => ({
      ...prev,        // Conserver les autres valeurs
      [name]: value   // Mettre à jour uniquement le champ modifié
    }));

    // Si une erreur existait pour ce champ, la supprimer
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""    // Effacer l'erreur pour ce champ
      }));
    }

    // Si le champ modifié est "depart", filtrer la liste des villes
    if (name === "depart") {
      // Filtrer les villes qui contiennent la valeur saisie (insensible à la casse)
      const filtered = villesSudMaroc.filter(ville =>
        ville.toLowerCase().includes(value.toLowerCase())
      );
      // Mettre à jour la liste filtrée
      setFilteredVillesDepart(filtered);
      // Afficher la liste déroulante
      setShowDepartList(true);
    } else if (name === "arrivee") {
      // Même logique pour le champ d'arrivée
      const filtered = villesSudMaroc.filter(ville =>
        ville.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredVillesArrivee(filtered);
      setShowArriveeList(true);
    }
  }, [errors]); // Dépendance : errors

  // Fonction pour gérer la sélection d'une ville dans la liste déroulante
  const handleVilleSelect = useCallback((ville, type) => {
    // Mettre à jour le formulaire avec la ville sélectionnée
    setFormData(prev => ({
      ...prev,
      [type]: ville   // type peut être "depart" ou "arrivee"
    }));
    
    // Si une erreur existait, la supprimer
    if (errors[type]) {
      setErrors(prev => ({
        ...prev,
        [type]: ""
      }));
    }
    
    // Masquer la liste déroulante et réinitialiser le filtre
    if (type === "depart") {
      setShowDepartList(false);
      setFilteredVillesDepart(villesSudMaroc);
    } else {
      setShowArriveeList(false);
      setFilteredVillesArrivee(villesSudMaroc);
    }
  }, [errors]); // Dépendance : errors

  // Fonction pour gérer le focus sur un champ (quand l'utilisateur clique dedans)
  const handleInputFocus = useCallback((type) => {
    if (type === "depart") {
      // Afficher la liste et réinitialiser le filtre
      setShowDepartList(true);
      setFilteredVillesDepart(villesSudMaroc);
    } else {
      // Même logique pour l'arrivée
      setShowArriveeList(true);
      setFilteredVillesArrivee(villesSudMaroc);
    }
  }, []); // Aucune dépendance

  // Fonction pour gérer le blur sur un champ (quand l'utilisateur clique ailleurs)
  const handleInputBlur = useCallback((type) => {
    // Utiliser setTimeout pour permettre le clic sur un élément de la liste avant de la masquer
    setTimeout(() => {
      if (type === "depart") {
        setShowDepartList(false);
      } else {
        setShowArriveeList(false);
      }
    }, 200); // Délai de 200ms
  }, []); // Aucune dépendance

  // Effet pour détecter les clics en dehors des listes déroulantes
  useEffect(() => {
    // Fonction pour gérer les clics
    const handleClickOutside = (event) => {
      // Vérifier si le clic est dans le champ de départ ou sa liste
      const isDepartClick = departRef.current?.contains(event.target) || 
                           departListRef.current?.contains(event.target);
      // Vérifier si le clic est dans le champ d'arrivée ou sa liste
      const isArriveeClick = arriveeRef.current?.contains(event.target) || 
                            arriveeListRef.current?.contains(event.target);
      
      // Si le clic est en dehors du champ de départ et que la liste est visible, la masquer
      if (!isDepartClick && showDepartList) {
        setShowDepartList(false);
      }
      // Même logique pour l'arrivée
      if (!isArriveeClick && showArriveeList) {
        setShowArriveeList(false);
      }
    };

    // Ajouter l'écouteur d'événement seulement si une liste est visible
    if (showDepartList || showArriveeList) {
      document.addEventListener("mousedown", handleClickOutside);
      // Nettoyer l'écouteur lors du démontage ou changement de dépendances
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showDepartList, showArriveeList]); // Dépendances : états des listes

  // Fonction pour gérer la soumission du formulaire de recherche
  const handleSearch = useCallback((e) => {
    // Empêcher le comportement par défaut du formulaire (rechargement de page)
    e.preventDefault();
    
    // Valider le formulaire
    if (validateForm()) {
      // Si la validation réussit, naviguer vers la page de résultats
      navigate("/SearchResults", {
        state: {
          // Passer les données du formulaire à la page de résultats
          depart: formData.depart,
          arrivee: formData.arrivee,
          date: formData.date,
          passagers: formData.passagers
        }
      });
    }
  }, [formData, validateForm, navigate]); // Dépendances

  // Calcul de la date minimale sélectionnable (aujourd'hui)
  const minDate = useMemo(() => {
    // Créer un objet Date pour aujourd'hui
    const today = new Date();
    // Convertir en format ISO (YYYY-MM-DD) pour l'input date
    return today.toISOString().split('T')[0];
  }, []); // Calculé une seule fois au montage

  // Rendu du composant
  return (
    // Conteneur principal de la page
    <div className="Accueil-Page">
      {/* Section Hero avec l'image de fond et le formulaire de recherche */}
      <section className="Accueil-Hero" style={{backgroundImage: `url(${HeroImg})`}}>
        {/* Overlay sombre pour améliorer la lisibilité */}
        <div className="Hero-Overlay"></div>
        {/* Contenu principal de la section hero */}
        <div className="Hero-Content">
          {/* Titre principal de la page */}
          <h1 className="Hero-Title-New">{t('hero_title')}</h1>
          
          {/* Conteneur pour le formulaire de recherche et le bouton */}
          <div className="Search-Container">
            {/* Formulaire de recherche avec effet glassmorphism */}
            <form className="Search-Form-Glass" onSubmit={handleSearch} noValidate>
              {/* Ligne horizontale contenant tous les champs */}
              <div className="Form-Row-Horizontal">
                
                {/* Groupe de champ : Ville de départ */}
                <div className="Form-Group-Glass" ref={departRef}>
                  {/* Icône de localisation */}
                  <FaMapMarkerAlt className="Form-Icon-Glass" />
                  {/* Wrapper pour le label et l'input */}
                  <div className="Form-Input-Wrapper">
                    {/* Label du champ */}
                    <label className="Form-Label-Glass">{t('search_depart_label')}</label>
                    {/* Input pour saisir la ville de départ */}
                    <input
                      type="text"
                      name="depart"
                      placeholder={t('search_depart_placeholder')}
                      value={formData.depart}
                      onChange={handleChange}
                      onFocus={() => handleInputFocus("depart")}
                      onBlur={() => handleInputBlur("depart")}
                      className={errors.depart ? "input-error" : ""}
                      aria-label="Ville de départ"
                    />
                  </div>
                  {/* Liste déroulante des villes (affichée conditionnellement) */}
                  {showDepartList && filteredVillesDepart.length > 0 && (
                    <div className="City-Dropdown-Glass" ref={departListRef}>
                      <ul className="City-List">
                        {/* Parcourir et afficher chaque ville filtrée */}
                        {filteredVillesDepart.map((ville, index) => (
                          <li
                            key={index}
                            className="City-Item"
                            onMouseDown={(e) => {
                              // Utiliser onMouseDown au lieu de onClick pour éviter le conflit avec onBlur
                              e.preventDefault();
                              // Sélectionner la ville
                              handleVilleSelect(ville, "depart");
                            }}
                          >
                            {ville}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Divider vertical pour séparer les champs */}
                <div className="Form-Divider-Glass"></div>
                
                {/* Groupe de champ : Ville d'arrivée */}
                <div className="Form-Group-Glass" ref={arriveeRef}>
                  {/* Icône de localisation */}
                  <FaMapMarkerAlt className="Form-Icon-Glass" />
                  <div className="Form-Input-Wrapper">
                    <label className="Form-Label-Glass">{t('search_arrivee_label')}</label>
                    <input
                      type="text"
                      name="arrivee"
                      placeholder={t('search_depart_placeholder')}
                      value={formData.arrivee}
                      onChange={handleChange}
                      onFocus={() => handleInputFocus("arrivee")}
                      onBlur={() => handleInputBlur("arrivee")}
                      className={errors.arrivee ? "input-error" : ""}
                      aria-label="Ville d'arrivée"
                    />
                  </div>
                  {/* Liste déroulante des villes d'arrivée */}
                  {showArriveeList && filteredVillesArrivee.length > 0 && (
                    <div className="City-Dropdown-Glass" ref={arriveeListRef}>
                      <ul className="City-List">
                        {filteredVillesArrivee.map((ville, index) => (
                          <li
                            key={index}
                            className="City-Item"
                            onMouseDown={(e) => {
                              e.preventDefault();
                              handleVilleSelect(ville, "arrivee");
                            }}
                          >
                            {ville}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Divider vertical */}
                <div className="Form-Divider-Glass"></div>
                
                {/* Groupe de champ : Date */}
                <div className="Form-Group-Glass">
                  {/* Icône de calendrier */}
                  <FaCalendarAlt className="Form-Icon-Glass" />
                  <div className="Form-Input-Wrapper">
                    <label className="Form-Label-Glass">{t('search_date_label')}</label>
                    {/* Input de type date */}
                    <input
                      type="date"
                      name="date"
                      placeholder="sélectionner une date"
                      value={formData.date}
                      onChange={handleChange}
                      min={minDate}
                      className={errors.date ? "input-error" : ""}
                      aria-label="Date de départ"
                    />
                  </div>
                </div>

                {/* Divider vertical */}
                <div className="Form-Divider-Glass"></div>
                
                {/* Groupe de champ : Nombre de passagers */}
                <div className="Form-Group-Glass Form-Group-Passagers-Glass">
                  {/* Icône utilisateur */}
                  <FaUser className="Form-Icon-Glass" />
                  <div className="Form-Input-Wrapper-Passagers">
                    {/* Input numérique pour le nombre de passagers */}
                    <input
                      type="number"
                      name="passagers"
                      value={formData.passagers}
                      onChange={handleChange}
                      min="1"
                      max="8"
                      className={`Passagers-Number ${errors.passagers ? "input-error" : ""}`}
                      aria-label="Nombre de passagers"
                    />
                    {/* Label en bas */}
                    <label className="Form-Label-Glass-Bottom">Person</label>
                  </div>
                </div>
              </div>
            </form>

            {/* Bouton de recherche en bas du formulaire */}
            <button type="button" onClick={handleSearch} className="Search-Button-Bottom">
              {t('search_button')}
            </button>
          </div>

          {/* Conteneur pour afficher les messages d'erreur */}
          {Object.keys(errors).length > 0 && (
            <div className="Error-Messages-Container">
              {/* Parcourir et afficher toutes les erreurs */}
              {Object.values(errors).map((error, index) => (
                <span key={index} className="Error-Message-Inline">{error}</span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Section "Pourquoi choisir DINI" avec les statistiques */}
      <section className="Why-Choose-Section">
        {/* Titre de la section */}
        <h2 className="Section-Title">{t('why_title')}</h2>
        {/* Grille pour afficher les 4 cartes de statistiques */}
        <div className="Stats-Grid">
          {/* Carte statistique 1 (bleue) */}
          <div className="Stat-Card Stat-Card-Blue">
            {/* Nombre animé avec le composant Counter */}
            <div className="Stat-Number Stat-Number-Blue">+<Counter from={0} to={200} duration={2000} /></div>
            {/* Texte descriptif */}
            <div className="Stat-Text">{t('stat1_text')}</div>
          </div>
          {/* Carte statistique 2 (bleue) */}
          <div className="Stat-Card Stat-Card-Blue">
            <div className="Stat-Number Stat-Number-Blue">+<Counter from={0} to={800} duration={2000} /></div>
            <div className="Stat-Text">{t('stat2_text')}</div>
          </div>
          {/* Carte statistique 3 (verte) */}
          <div className="Stat-Card Stat-Card-Green">
            <div className="Stat-Number Stat-Number-Green">+<Counter from={0} to={1240} duration={2000} /></div>
            <div className="Stat-Text">{t('stat3_text')}</div>
          </div>
          {/* Carte statistique 4 (verte) */}
          <div className="Stat-Card Stat-Card-Green">
            <div className="Stat-Number Stat-Number-Green">+<Counter from={0} to={70} duration={2000} />%</div>
            <div className="Stat-Text">{t('stat4_text')}</div>
          </div>
        </div>
      </section>

      {/* Section "Comment ça marche" avec les 4 étapes */}
      <section className="How-It-Works-Section">
        {/* Titre de la section */}
        <h2 className="Section-Title">{t('how_title')}</h2>
        {/* Grille pour afficher les 4 étapes */}
        <div className="Steps-Grid">
          {/* Étape 1 : Chercher */}
          <div className="Step-Card">
            {/* Icône de l'étape */}
            <img src={IconChercher} alt="Chercher" className="Step-Icon" />
            {/* Titre de l'étape */}
            <h3 className="Step-Title">{t('step1_title')}</h3>
            {/* Description de l'étape */}
            <p className="Step-Description">{t('step1_desc')}</p>
          </div>
          {/* Étape 2 : Choisir */}
          <div className="Step-Card">
            <img src={IconChoisir} alt="Choisir" className="Step-Icon" />
            <h3 className="Step-Title">{t('step2_title')}</h3>
            <p className="Step-Description">{t('step2_desc')}</p>
          </div>
          {/* Étape 3 : Prendre */}
          <div className="Step-Card">
            <img src={IconPrendre} alt="Prendre" className="Step-Icon" />
            <h3 className="Step-Title">{t('step3_title')}</h3>
            <p className="Step-Description">{t('step3_desc')}</p>
          </div>
          {/* Étape 4 : Arriver */}
          <div className="Step-Card">
            <img src={IconArriver} alt="Arriver" className="Step-Icon" />
            <h3 className="Step-Title">{t('step4_title')}</h3>
            <p className="Step-Description">{t('step4_desc')}</p>
          </div>
        </div>
      </section>

      {/* Section "À propos de nous" */}
      <section className="About-Section">
        {/* Premier bloc : Image à gauche, texte à droite */}
        <div className="About-Content">
          {/* Conteneur de l'image avec effet de carte derrière */}
          <div className="About-Image-Container">
            <img src={AboutImage} alt="À propos de nous" className="About-Image" />
          </div>
          {/* Conteneur du texte */}
          <div className="About-Text">
            <h2 className="About-Title">{t('about_title')}</h2>
            <p>{t('about_text')}</p>
          </div>
        </div>
        {/* Deuxième bloc : Texte à gauche, image à droite (ordre inversé) */}
        <div className="About-Content Reverse">
          <div className="About-Text">
            <h2 className="About-Title">{t('mission_title')}</h2>
            <p>{t('mission_text')}</p>
          </div>
          <div className="About-Image-Container">
            <img src={MissionImage} alt="Notre mission" className="About-Image" />
          </div>
        </div>
      </section>

      {/* Footer de la page */}
      <footer className="Footer">
        {/* Contenu principal du footer avec les colonnes */}
        <div className="Footer-Content">
          {/* Colonne 1 : Villes */}
          <div className="Footer-Column">
            <h4 className="Footer-Title">{t('footer_cities')}</h4>
            <ul className="Footer-Links">
              <li><a href="#casablanca">{t('city_casablanca')}</a></li>
              <li><a href="#rabat">{t('city_rabat')}</a></li>
              <li><a href="#marrakech">{t('city_marrakech')}</a></li>
              <li><a href="#fes">{t('city_fes')}</a></li>
            </ul>
          </div>
          {/* Colonne 2 : À propos */}
          <div className="Footer-Column">
            <h4 className="Footer-Title">{t('footer_about')}</h4>
            <ul className="Footer-Links">
              <li><a href="#qui-sommes-nous">{t('about_who')}</a></li>
              <li><a href="#contact">{t('about_contact')}</a></li>
              <li><a href="#blog">{t('about_blog')}</a></li>
            </ul>
          </div>
          {/* Colonne 3 : Services */}
          <div className="Footer-Column">
            <h4 className="Footer-Title">{t('footer_services')}</h4>
            <ul className="Footer-Links">
              <li><a href="#covoiturage">{t('services_covoiturage')}</a></li>
              <li><a href="#securite">{t('services_securite')}</a></li>
              <li><a href="#tarifs">{t('services_tarifs')}</a></li>
            </ul>
          </div>
          {/* Colonne 4 : DINI */}
          <div className="Footer-Column">
            <h4 className="Footer-Title">{t('footer_dini')}</h4>
            <ul className="Footer-Links">
              <li><a href="#aide">{t('dini_aide')}</a></li>
              <li><a href="#conditions">{t('dini_conditions')}</a></li>
              <li><a href="#confidentialite">{t('dini_confidentialite')}</a></li>
            </ul>
          </div>
        </div>
        {/* Section des réseaux sociaux */}
        <div className="Footer-Social">
          {/* Lien Facebook */}
          <a href="#book" className="Social-Icon" aria-label="Book"><img src={IconFacebook} alt="Book" /></a>
          {/* Lien YouTube */}
          <a href="#tv" className="Social-Icon" aria-label="TV"><img src={IconYoutube} alt="TV" /></a>
          {/* Lien Instagram */}
          <a href="#camera" className="Social-Icon" aria-label="Camera"><img src={IconInstagram} alt="Camera" /></a>
          {/* Lien X (Twitter) */}
          <a href="#twitter" className="Social-Icon" aria-label="Twitter"><img src={IconX} alt="Twitter" /></a>
          {/* Lien LinkedIn */}
          <a href="#briefcase" className="Social-Icon" aria-label="Briefcase"><img src={IconLink} alt="Briefcase" /></a>
          {/* Lien TikTok */}
          <a href="#music" className="Social-Icon" aria-label="Music"><img src={IconTiktok} alt="Music" /></a>
          {/* Lien Google Play Store */}
          <a href="#pin" className="Social-Icon" aria-label="Pin"><img src={IconPlaystore} alt="Pin" /></a>
          {/* Lien App Store */}
          <a href="#pin" className="Social-Icon" aria-label="Pin"><img src={IconApp} alt="Pin" /></a>
        </div>
        {/* Copyright */}
        <div className="Footer-Copyright">
          <p>© 2023 Copyright DINI. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
