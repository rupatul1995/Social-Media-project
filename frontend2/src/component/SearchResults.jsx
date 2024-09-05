import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Api from '../axiosConfig';
import '../style/searchresults.css';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await Api.post('/search', { searchedWord: searchTerm });
        if (response.data.success) {
          setResults(response.data.searchedUsers);
        }
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      }
    };

    fetchResults();
  }, [searchTerm]);

  return (
    <div className="searchResults">
      <h1>Search Results for "{searchTerm}"</h1>
      <ul>
        {results.map(user => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
