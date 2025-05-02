import React, { useState } from 'react';
import ImageMediatheque from "../assets/Mediatheque.png";
import "../styles/Search.css";

function Search() {
    const CatalogItem = [
        { icon: 'fas fa-tachometer-alt', label: 'Catalogue' },
        { icon: 'far fa-address-book', label: 'Livres' },
        { icon: 'far fa-calendar-alt', label: 'TitrePeriodiques' },
        { icon: 'far fa-chart-bar', label: 'DVD & BluRay' },
        { icon: 'far fa-clone', label: 'CD' },
    ];

    const [searchType, setSearchType] = useState(CatalogItem[0]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchTypeChange = (event) => {
        const selectedIndex = event.target.selectedIndex;
        setSearchType(CatalogItem[selectedIndex]);
    };

    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        // Logique de recherche ici
        console.log(`Recherche de type: ${searchType.label}, Query: ${searchQuery}`);
    };

    return (
        <div className="Search-container">
            <div className="Img-Mediatheque">
                <img src={ImageMediatheque} alt="Image de la mediatheque de Montellier" />
                <div className="Search-bar">
                    <div className="Search-select-container">
                        <select className="Search-select" value={searchType.label} onChange={handleSearchTypeChange}>
                            {CatalogItem.map((item, index) => (
                                <option key={index} value={item.label}>
                                    <i className={item.icon}></i> {item.label}
                                </option>
                            ))}
                        </select>
                        <div className="Selected-item">
                            <i className={searchType.icon}></i> {searchType.label}
                        </div>
                    </div>
                    <input
                        type="text"
                        className="Search-input"
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                        placeholder="Tapez votre recherche"
                    />
                    <button className="Search-button" onClick={handleSearch}>
                        <img src="path_to_search_icon.png" alt="Search Icon" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Search;
