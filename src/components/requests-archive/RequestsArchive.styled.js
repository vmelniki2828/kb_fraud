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
  width: 100%;
`;

export const RequestTable = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(108, 71, 255, 0.2);
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  padding: 16px;
  background: linear-gradient(135deg, rgba(108, 71, 255, 0.3) 0%, rgba(108, 71, 255, 0.1) 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #6c47ff, transparent);
  }
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  padding: 16px;
  transition: background-color 0.3s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  
  &:hover {
    background: rgba(108, 71, 255, 0.05);
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

export const CommentsSection = styled.div`
  grid-column: 1 / -1;
  background: rgba(108, 71, 255, 0.02);
  padding: 16px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

export const CommentItem = styled.div`
  margin-bottom: 16px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
`;

export const CommentUser = styled.span`
  color: #6c47ff;
  font-weight: 500;
`;

export const CommentDate = styled.span``;

export const CommentText = styled.p`
  color: #fff;
  font-size: 14px;
  margin: 0;
  line-height: 1.4;
`;

export const CommentFiles = styled.div`
  margin-top: 8px;
`;

export const CommentFileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: rgba(108, 71, 255, 0.1);
  border-radius: 6px;
  margin-bottom: 4px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const CommentFileInfo = styled.div`
  flex: 1;
  
  .file-name {
    color: #fff;
    font-size: 13px;
    font-weight: 500;
  }
  
  .file-meta {
    color: rgba(255, 255, 255, 0.6);
    font-size: 11px;
    margin-top: 2px;
  }
`;

export const DownloadCommentFileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(108, 71, 255, 0.2);
  border: 1px solid rgba(108, 71, 255, 0.3);
  border-radius: 4px;
  color: #6c47ff;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(108, 71, 255, 0.3);
    border-color: rgba(108, 71, 255, 0.5);
  }
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

export const NoCommentsText = styled.div`
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
  padding: 12px;
  font-size: 14px;
`;

export const ArchivePagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
`;

export const PaginationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 2px solid rgba(108, 71, 255, 0.3);
  background: rgba(108, 71, 255, 0.1);
  border-radius: 8px;
  color: #6c47ff;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 18px;
  
  &:hover {
    background: rgba(108, 71, 255, 0.2);
    border-color: rgba(108, 71, 255, 0.5);
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    
    &:hover {
      background: rgba(108, 71, 255, 0.1);
      border-color: rgba(108, 71, 255, 0.3);
      transform: none;
    }
  }
`;

export const TableCell = styled.div`
  color: #fff;
  font-size: 14px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  
  ${TableHeader} & {
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 0.5px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
  
  ${TableRow} & {
    &:first-child {
      font-weight: 600;
      color: #9d7bff;
    }
    
    &:nth-child(4) {
      font-weight: 700;
      color: #22c55e;
      text-shadow: 0 0 6px rgba(34, 197, 94, 0.3);
    }
    
    &:nth-child(2), &:nth-child(3) {
      font-family: 'Courier New', monospace;
      background: rgba(108, 71, 255, 0.1);
      border-radius: 4px;
      font-size: 0.85rem;
    }
  }
  
  &[data-status] {
    &::before {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 8px;
    }
    
    &[data-status="approved"]::before {
      background-color: #22c55e;
    }
    
    &[data-status="declined"]::before {
      background-color: #ef4444;
    }
    
    &[data-status="pending"]::before {
      background-color: #f59e0b;
    }
  }
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