import React, { useEffect, useMemo, useState } from "react";
import './filter.css';

export default function Filter(props, onFilter) {
    const [filterOptions, setFilterOptions] = useState({
        minRent: '',
        maxRent: '',
        minBedrooms: '',
        maxBedrooms: '',
        minBath: '',
        maxBath: '',
    });
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilterOptions({ ...filterOptions, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter(filterOptions);
    };

    return(
        <form className="Filter" onSubmit={handleSubmit}>
            <label>
                Min Rent:
                <input
                type="number"
                name="minRent"
                value={filterOptions.minRent}
                onChange={handleInputChange}
                />
            </label>
            <label>
                Max Rent:
                <input
                type="number"
                name="maxRent"
                value={filterOptions.maxRent}
                onChange={handleInputChange}
                />
            </label>
            <label>
                Min Baths:
                <input
                type="number"
                name="minBath"
                value={filterOptions.minBath}
                onChange={handleInputChange}
                />
            </label>
            <label>
                Max Baths:
                <input
                type="number"
                name="maxBath"
                value={filterOptions.maxBath}
                onChange={handleInputChange}
                />
            </label>
            <button type="submit">Apply Filters</button>
        </form>
    );
}