import styled from 'styled-components';

export const RequestsArchiveWrapper = styled.div`
  min-height: 100vh;
  background: #12092A;
  display: flex;
  position: relative;
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 40px;
  transition: margin-left 0.3s ease;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  color: #fff;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
  background: linear-gradient(135deg, #6c47ff, #9d7bff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 8px rgba(108, 71, 255, 0.3);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, #6c47ff, #9d7bff);
    border-radius: 2px;
  }
`;

export const SearchSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

export const SearchInput = styled.input`
  width: 100%;
  max-width: 500px;
  padding: 16px 24px;
  border-radius: 12px;
  border: 2px solid rgba(108, 71, 255, 0.3);
  outline: none;
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    border-color: #6c47ff;
    box-shadow: 0 0 0 4px rgba(108, 71, 255, 0.2);
    background: rgba(255, 255, 255, 0.08);
  }
  
  &:hover {
    border-color: rgba(108, 71, 255, 0.5);
  }
`;

export const ResultsSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 20px;
`;

export const LoadingText = styled.div`
  color: #6c47ff;
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  padding: 20px;
`;

export const NoResultsText = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.1rem;
  text-align: center;
  padding: 20px;
`; 