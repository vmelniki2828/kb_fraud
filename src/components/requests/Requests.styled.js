import styled from 'styled-components';

export const RequestsWrapper = styled.div`
  min-height: 100vh;
  background: #12092A;
  display: flex;
  position: relative;
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${props => props.hasRequest ? 'flex-start' : 'center'};
  padding: ${props => props.hasRequest ? '40px 20px 0 20px' : '0'};
  transition: margin-left 0.3s ease;
`;

export const GetRequestButton = styled.button`
  padding: 16px 32px;
  border-radius: 8px;
  border: none;
  background: ${props => props.disabled ? '#4a5568' : '#6c47ff'};
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(108, 71, 255, 0.3);
  min-width: 200px;
  
  &:hover {
    background: ${props => props.disabled ? '#4a5568' : '#4b2bbd'};
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.disabled ? '0 4px 16px rgba(108, 71, 255, 0.3)' : '0 6px 20px rgba(108, 71, 255, 0.4)'};
  }
  
  &:active {
    transform: ${props => props.disabled ? 'none' : 'translateY(0)'};
    box-shadow: ${props => props.disabled ? '0 4px 16px rgba(108, 71, 255, 0.3)' : '0 2px 8px rgba(108, 71, 255, 0.3)'};
  }
`;

export const ConnectionStatus = styled.div`
  margin-top: 20px;
  padding: 12px 24px;
  border-radius: 6px;
  background: ${props => props.isConnected ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
  border: 1px solid ${props => props.isConnected ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'};
  color: ${props => props.isConnected ? '#22c55e' : '#ef4444'};
  font-size: 1rem;
  text-align: center;
  font-weight: 500;
`;

export const DisconnectButton = styled.button`
  margin-top: 15px;
  padding: 12px 24px;
  border-radius: 6px;
  border: none;
  background: #ef4444;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #dc2626;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const RequestTable = styled.table`
  margin-top: 30px;
  width: 100%;
  max-width: 1200px;
  border-collapse: separate;
  border-spacing: 0;
  background: linear-gradient(135deg, rgba(108, 71, 255, 0.1) 0%, rgba(18, 9, 42, 0.8) 100%);
  border-radius: 16px;
  overflow: hidden;
  backdrop-filter: blur(20px);
  box-shadow: 
    0 8px 32px rgba(108, 71, 255, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(108, 71, 255, 0.3);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #6c47ff, #9d7bff, #6c47ff);
    background-size: 200% 100%;
    animation: shimmer 3s infinite;
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

export const TableHeader = styled.tr`
  background: linear-gradient(135deg, rgba(108, 71, 255, 0.4) 0%, rgba(108, 71, 255, 0.2) 100%);
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

export const TableRow = styled.tr`
  background: rgba(255, 255, 255, 0.02);
  transition: background-color 0.3s ease;
  
  &:hover {
    background: rgba(108, 71, 255, 0.05);
  }
`;

export const TableCell = styled.td`
  padding: 16px 20px;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  position: relative;
  vertical-align: middle;
  
  ${TableHeader} & {
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    font-size: 0.9rem;
    letter-spacing: 1px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    border-bottom: 2px solid rgba(108, 71, 255, 0.5);
    background: linear-gradient(135deg, rgba(108, 71, 255, 0.2), rgba(157, 123, 255, 0.1));
  }
  
  ${TableRow} & {
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    
    &:first-child {
      text-align: center;
      font-weight: 600;
      color: #9d7bff;
    }
    
    &:nth-child(4) {
      font-weight: 700;
      color: #22c55e;
      text-shadow: 0 0 8px rgba(34, 197, 94, 0.3);
    }
    
    &:nth-child(2), &:nth-child(3) {
      font-family: 'Courier New', monospace;
      background: rgba(108, 71, 255, 0.1);
      border-radius: 4px;
      font-size: 0.9rem;
    }
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ActionButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  border: 2px solid;
  background: transparent;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
  
  border-color: ${props => {
    switch(props.color) {
      case 'green': return '#22c55e';
      case 'red': return '#ef4444'; 
      case 'blue': return '#3b82f6';
      case 'yellow': return '#f59e0b';
      default: return '#6c47ff';
    }
  }};
  
  color: ${props => {
    switch(props.color) {
      case 'green': return '#22c55e';
      case 'red': return '#ef4444';
      case 'blue': return '#3b82f6'; 
      case 'yellow': return '#f59e0b';
      default: return '#6c47ff';
    }
  }};
  
  &:hover {
    background: ${props => {
      switch(props.color) {
        case 'green': return 'rgba(34, 197, 94, 0.1)';
        case 'red': return 'rgba(239, 68, 68, 0.1)';
        case 'blue': return 'rgba(59, 130, 246, 0.1)';
        case 'yellow': return 'rgba(245, 158, 11, 0.1)';
        default: return 'rgba(108, 71, 255, 0.1)';
      }
    }};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px ${props => {
      switch(props.color) {
        case 'green': return 'rgba(34, 197, 94, 0.3)';
        case 'red': return 'rgba(239, 68, 68, 0.3)';
        case 'blue': return 'rgba(59, 130, 246, 0.3)';
        case 'yellow': return 'rgba(245, 158, 11, 0.3)';
        default: return 'rgba(108, 71, 255, 0.3)';
      }
    }};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const NextRequestButton = styled.h2`
  margin: 0 0 20px 0;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  background: linear-gradient(135deg, #6c47ff, #ff6b9d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, #6c47ff, #ff6b9d);
    border-radius: 2px;
  }
`;

export const CommentSection = styled.div`
  margin-top: 30px;
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const CommentTextarea = styled.textarea`
  width: 100%;
  max-width: 600px;
  height: 200px;
  padding: 16px;
  border-radius: 12px;
  border: 2px solid rgba(108, 71, 255, 0.3);
  background: linear-gradient(135deg, rgba(108, 71, 255, 0.1) 0%, rgba(18, 9, 42, 0.8) 100%);
  color: #fff;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  resize: none;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  box-sizing: border-box;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: #6c47ff;
    box-shadow: 0 0 20px rgba(108, 71, 255, 0.3);
  }
`;

export const FileUploadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  padding: 12px 20px;
  border-radius: 12px;
  border: 2px dashed rgba(108, 71, 255, 0.5);
  background: transparent;
  color: #6c47ff;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-sizing: border-box;
  
  &:hover {
    border-color: #6c47ff;
    background: rgba(108, 71, 255, 0.1);
    transform: translateY(-1px);
  }
`;

export const ControlButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  justify-content: center;
`;

export const ControlButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  border-color: ${props => {
    if (props.disabled) return 'rgba(255, 255, 255, 0.3)';
    switch(props.color) {
      case 'yellow': return '#f59e0b';
      case 'red': return '#ef4444';
      default: return '#6c47ff';
    }
  }};
  
  color: ${props => {
    if (props.disabled) return 'rgba(255, 255, 255, 0.3)';
    switch(props.color) {
      case 'yellow': return '#f59e0b';
      case 'red': return '#ef4444';
      default: return '#6c47ff';
    }
  }};
  
  opacity: ${props => props.disabled ? '0.5' : '1'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  
  &:hover {
    background: ${props => {
      if (props.disabled) return 'transparent';
      switch(props.color) {
        case 'yellow': return 'rgba(245, 158, 11, 0.1)';
        case 'red': return 'rgba(239, 68, 68, 0.1)';
        default: return 'rgba(108, 71, 255, 0.1)';
      }
    }};
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.disabled ? 'none' : `0 4px 15px ${
      props.color === 'yellow' ? 'rgba(245, 158, 11, 0.3)' :
      props.color === 'red' ? 'rgba(239, 68, 68, 0.3)' :
      'rgba(108, 71, 255, 0.3)'
    }`};
  }

  &:active {
    transform: ${props => props.disabled ? 'none' : 'translateY(0)'};
  }
`;

export const FilesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

export const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(108, 71, 255, 0.2);
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(108, 71, 255, 0.4);
  }
`;

export const FileInfo = styled.div`
  flex: 1;
  
  .file-name {
    color: #fff;
    font-size: 0.95rem;
    font-weight: 600;
    margin-bottom: 4px;
  }
  
  .file-size {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.85rem;
  }
`;

export const RemoveFileButton = styled.button`
  background: transparent;
  border: 1px solid #ef4444;
  color: #ef4444;
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(239, 68, 68, 0.1);
    transform: translateY(-1px);
  }
`;

export const PauseMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 40px;
  background: linear-gradient(135deg, rgba(108, 71, 255, 0.1) 0%, rgba(18, 9, 42, 0.8) 100%);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(108, 71, 255, 0.3);
  box-shadow: 0 8px 32px rgba(108, 71, 255, 0.3);
`;

export const PauseMessage = styled.h2`
  color: #fff;
  font-size: 1.5rem;
  text-align: center;
  margin: 0;
  background: linear-gradient(135deg, #6c47ff, #ff6b9d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
`;

export const ResumeButton = styled.button`
  padding: 16px 32px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #6c47ff, #9d7bff);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(108, 71, 255, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(108, 71, 255, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(108, 71, 255, 0.2);
  border-top: 4px solid #6c47ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

export const LoadingText = styled.div`
  color: #6c47ff;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
`;

export const HoldRequestsSection = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const HoldListToggle = styled.button`
  background: linear-gradient(135deg, rgba(108, 71, 255, 0.1) 0%, rgba(18, 9, 42, 0.8) 100%);
  border: 1px solid rgba(108, 71, 255, 0.3);
  color: #6c47ff;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(108, 71, 255, 0.2);
  opacity: ${props => props.disabled ? '0.5' : '1'};
  
  &:hover {
    background: ${props => props.disabled ? 
      'linear-gradient(135deg, rgba(108, 71, 255, 0.1) 0%, rgba(18, 9, 42, 0.8) 100%)' :
      'linear-gradient(135deg, rgba(108, 71, 255, 0.2) 0%, rgba(18, 9, 42, 0.9) 100%)'
    };
    transform: ${props => props.disabled ? 'none' : 'translateY(-1px)'};
    box-shadow: ${props => props.disabled ? 
      '0 4px 16px rgba(108, 71, 255, 0.2)' :
      '0 6px 20px rgba(108, 71, 255, 0.3)'
    };
  }
  
  .icon {
    transition: transform 0.3s ease;
    transform: ${props => props.expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
    font-size: 1rem;
  }
`;

export const HoldRequestsContent = styled.div`
  max-height: ${props => props.expanded ? '800px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: #12092A;
  width: 100%;
`;

export const HoldRequestsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 40px;
  display: ${props => props.expanded ? 'table' : 'none'};
  opacity: ${props => props.expanded ? 1 : 0};
  transform: ${props => props.expanded ? 'translateY(0)' : 'translateY(-20px)'};
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const HoldPagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  padding: 12px;
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

export const PaginationInfo = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-weight: 500;
`;

export const HoldTableBody = styled.tbody`
  background: rgba(255, 255, 255, 0.02);
`;

export const HoldTableHeader = styled.tr`
  background: linear-gradient(135deg, rgba(108, 71, 255, 0.3) 0%, rgba(108, 71, 255, 0.1) 100%);
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

export const HoldTableRow = styled.tr`
  background: rgba(255, 255, 255, 0.02);
  transition: background-color 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(108, 71, 255, 0.05);
  }
  
  &:last-child td {
    border-bottom: none;
  }
`;

export const HoldTableCell = styled.td`
  padding: 12px 16px;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
  vertical-align: middle;
  
  ${HoldTableHeader} & {
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 0.5px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    border-bottom: 2px solid rgba(108, 71, 255, 0.4);
  }
  
  ${HoldTableRow} & {
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
`;

// Красивые стили для комментариев
export const RequestDetailsSection = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CommentsSection = styled.div`
  background: linear-gradient(145deg, 
    rgba(108, 71, 255, 0.12) 0%, 
    rgba(147, 51, 234, 0.08) 25%,
    rgba(18, 9, 42, 0.95) 50%,
    rgba(30, 13, 56, 0.9) 100%
  );
  border-radius: 12px;
  padding: 12px 16px;
  backdrop-filter: blur(25px);
  border: 1px solid rgba(147, 51, 234, 0.3);
  box-shadow: 
    0 4px 20px rgba(108, 71, 255, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      #6c47ff 25%, 
      #9333ea 50%, 
      #ec4899 75%, 
      transparent 100%
    );
    animation: shimmer 3s ease-in-out infinite;
  }
  
  @keyframes shimmer {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
`;

export const CommentsSectionTitle = styled.h3`
  color: #fff;
  font-size: 0.8rem;
  margin: 0 0 8px 0;
  background: linear-gradient(135deg, #6c47ff, #9333ea, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before {
    content: '💬';
    font-size: 0.7rem;
    filter: drop-shadow(0 0 4px rgba(108, 71, 255, 0.6));
  }
  
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, 
      rgba(108, 71, 255, 0.5), 
      rgba(147, 51, 234, 0.3), 
      transparent
    );
  }
`;

export const CommentItem = styled.div`
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.06) 0%, 
    rgba(108, 71, 255, 0.04) 100%
  );
  border: 1px solid rgba(147, 51, 234, 0.2);
  border-radius: 8px;
  padding: 6px 10px;
  margin-bottom: 6px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, #6c47ff, #9333ea);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.08) 0%, 
      rgba(108, 71, 255, 0.06) 100%
    );
    border-color: rgba(147, 51, 234, 0.4);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(108, 71, 255, 0.15);
    
    &::before {
      opacity: 1;
    }
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

export const CommentUser = styled.div`
  color: #c4b5fd;
  font-weight: 700;
  font-size: 0.7rem;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &::before {
    content: '👤';
    font-size: 0.9rem;
    filter: drop-shadow(0 0 4px rgba(196, 181, 253, 0.8))
            drop-shadow(0 0 8px rgba(108, 71, 255, 0.4));
    animation: userGlow 2s ease-in-out infinite alternate;
  }
  
  @keyframes userGlow {
    0% { 
      filter: drop-shadow(0 0 4px rgba(196, 181, 253, 0.8))
              drop-shadow(0 0 8px rgba(108, 71, 255, 0.4));
    }
    100% { 
      filter: drop-shadow(0 0 6px rgba(196, 181, 253, 1))
              drop-shadow(0 0 12px rgba(108, 71, 255, 0.6));
    }
  }
`;

export const CommentDate = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.58rem;
  font-family: 'Courier New', monospace;
  background: rgba(108, 71, 255, 0.1);
  padding: 2px 4px;
  border-radius: 4px;
  border: 1px solid rgba(108, 71, 255, 0.2);
`;

export const CommentText = styled.div`
  color: #f8fafc;
  font-size: 0.72rem;
  line-height: 1.3;
  word-wrap: break-word;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  padding-left: 2px;
`;

export const RequestFilesSection = styled.div`
  background: linear-gradient(135deg, rgba(108, 71, 255, 0.1) 0%, rgba(18, 9, 42, 0.8) 100%);
  border-radius: 16px;
  padding: 20px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(108, 71, 255, 0.3);
  box-shadow: 0 8px 32px rgba(108, 71, 255, 0.2);
`;

export const RequestFilesSectionTitle = styled.h3`
  color: #fff;
  font-size: 1.2rem;
  margin: 0 0 15px 0;
  background: linear-gradient(135deg, #6c47ff, #ff6b9d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 600;
`;

export const RequestFileItem = styled.div`
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.06) 0%, 
    rgba(16, 185, 129, 0.04) 100%
  );
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 6px;
  padding: 4px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  margin-top: 4px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, #10b981, #059669);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    background: linear-gradient(135deg, 
      rgba(255, 255, 255, 0.08) 0%, 
      rgba(16, 185, 129, 0.06) 100%
    );
    border-color: rgba(16, 185, 129, 0.4);
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(16, 185, 129, 0.15);
    
    &::before {
      opacity: 1;
    }
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const RequestFileInfo = styled.div`
  flex: 1;
  
  .file-name {
    color: #f0fdf4;
    font-size: 0.65rem;
    font-weight: 700;
    margin-bottom: 2px;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    position: relative;
    display: flex;
    align-items: center;
    gap: 6px;
    
    &::before {
      content: '📎';
      font-size: 1rem;
      filter: drop-shadow(0 0 4px rgba(16, 185, 129, 0.9))
              drop-shadow(0 0 8px rgba(5, 150, 105, 0.5))
              drop-shadow(0 0 12px rgba(34, 197, 94, 0.3));
      animation: fileGlow 2.5s ease-in-out infinite alternate;
      transform-origin: center;
    }
  }
  
  @keyframes fileGlow {
    0% { 
      filter: drop-shadow(0 0 4px rgba(16, 185, 129, 0.9))
              drop-shadow(0 0 8px rgba(5, 150, 105, 0.5))
              drop-shadow(0 0 12px rgba(34, 197, 94, 0.3));
      transform: scale(1);
    }
    100% { 
      filter: drop-shadow(0 0 6px rgba(16, 185, 129, 1))
              drop-shadow(0 0 12px rgba(5, 150, 105, 0.7))
              drop-shadow(0 0 16px rgba(34, 197, 94, 0.5));
      transform: scale(1.05);
    }
  }
  
  .file-meta {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.55rem;
    display: flex;
    gap: 6px;
    font-family: 'Courier New', monospace;
    background: rgba(16, 185, 129, 0.08);
    padding: 1px 4px;
    border-radius: 3px;
    border: 1px solid rgba(16, 185, 129, 0.15);
    width: fit-content;
  }
`;

export const DownloadFileButton = styled.button`
  background: linear-gradient(135deg, 
    rgba(16, 185, 129, 0.1) 0%, 
    rgba(5, 150, 105, 0.05) 100%
  );
  border: 1px solid #10b981;
  color: #10b981;
  padding: 3px 6px;
  border-radius: 5px;
  font-size: 0.6rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 3px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '⬇️';
    font-size: 0.8rem;
    filter: drop-shadow(0 0 4px rgba(16, 185, 129, 0.9))
            drop-shadow(0 0 6px rgba(5, 150, 105, 0.6));
    animation: downloadPulse 1.8s ease-in-out infinite;
    transform-origin: center;
  }
  
  @keyframes downloadPulse {
    0%, 100% { 
      transform: scale(1);
      filter: drop-shadow(0 0 4px rgba(16, 185, 129, 0.9))
              drop-shadow(0 0 6px rgba(5, 150, 105, 0.6));
    }
    50% { 
      transform: scale(1.1);
      filter: drop-shadow(0 0 6px rgba(16, 185, 129, 1))
              drop-shadow(0 0 10px rgba(5, 150, 105, 0.8))
              drop-shadow(0 0 14px rgba(34, 197, 94, 0.4));
    }
  }
  
  &:hover {
    background: linear-gradient(135deg, 
      rgba(16, 185, 129, 0.2) 0%, 
      rgba(5, 150, 105, 0.1) 100%
    );
    border-color: #22c55e;
    color: #22c55e;
    transform: translateY(-2px) scale(1.02);
    box-shadow: 
      0 4px 12px rgba(16, 185, 129, 0.25),
      0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(-1px) scale(1.01);
  }
`;

export const NoDataMessage = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
  text-align: center;
  padding: 20px;
`; 