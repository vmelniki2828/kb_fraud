import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import { 
  RequestsArchiveWrapper, 
  MainContent,
  Title,
  SearchSection,
  SearchInput,
  ResultsSection,
  LoadingText,
  NoResultsText
} from './RequestsArchive.styled';

const RequestsArchive = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const searchArchivedRequests = async (id, page = 0) => {
    if (!id.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const tokens = JSON.parse(localStorage.getItem('tokens'));
      const response = await fetch(
        `https://209.38.237.223/antifraud-app/v1/antifraud/archived-request?id=${encodeURIComponent(id)}&page=${page}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${tokens.access}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
        console.log('Результаты поиска:', data);
      } else {
        console.error('Ошибка поиска:', response.status, await response.text());
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Ошибка запроса:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setCurrentPage(0);
  };

  // Debounce для поиска
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchValue) {
        searchArchivedRequests(searchValue, currentPage);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchValue, currentPage]);

  return (
    <RequestsArchiveWrapper>
      <Sidebar />
      <MainContent>
        <Title>Архив заявок</Title>
        <SearchSection>
          <SearchInput
            type="text"
            placeholder="Поиск по архиву заявок..."
            value={searchValue}
            onChange={handleSearchChange}
          />
        </SearchSection>
        
        <ResultsSection>
          {isLoading && <LoadingText>Поиск...</LoadingText>}
          {!isLoading && searchValue && searchResults.length === 0 && (
            <NoResultsText>Результаты не найдены</NoResultsText>
          )}
          {!isLoading && searchResults.length > 0 && (
            <div>
              {/* Здесь будут результаты поиска */}
              <p style={{color: '#fff'}}>Найдено результатов: {searchResults.length}</p>
              <pre style={{color: '#fff', fontSize: '12px', overflow: 'auto'}}>
                {JSON.stringify(searchResults, null, 2)}
              </pre>
            </div>
          )}
        </ResultsSection>
      </MainContent>
    </RequestsArchiveWrapper>
  );
};

export default RequestsArchive; 