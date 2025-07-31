import React, { useState, useEffect } from 'react';
import { MdDownload, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Sidebar from '../Sidebar';
import { 
  RequestsArchiveWrapper, 
  MainContent,
  Title,
  SearchSection,
  SearchInput,
  ResultsSection,
  LoadingText,
  NoResultsText,
  RequestTable,
  TableHeader,
  TableRow,
  TableCell,
  CommentsSection,
  CommentItem,
  CommentHeader,
  CommentUser,
  CommentDate,
  CommentText,
  CommentFiles,
  CommentFileItem,
  CommentFileInfo,
  DownloadCommentFileButton,
  NoCommentsText,
  ArchivePagination,
  PaginationButton
} from './RequestsArchive.styled';

const RequestsArchive = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [expandedRequestId, setExpandedRequestId] = useState(null);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  // Настройка notiflix
  React.useEffect(() => {
    Notify.init({
      width: '400px',
      position: 'center-top',
      distance: '50px',
      opacity: 1,
      borderRadius: '8px',
      rtl: false,
      timeout: 3000,
      messageMaxLength: 110,
      backOverlay: false,
      backOverlayColor: 'rgba(0,0,0,0.5)',
      plainText: true,
      showOnlyTheLastOne: true,
      clickToClose: true,
      pauseOnHover: true,
      ID: 'NotiflixNotify',
      className: 'notiflix-notify',
      zindex: 4001,
      fontFamily: 'Quicksand',
      fontSize: '14px',
      cssAnimation: true,
      cssAnimationDuration: 400,
      cssAnimationStyle: 'fade',
      closeButton: false,
      useIcon: true,
      useFontAwesome: false,
      fontAwesomeIconStyle: 'basic',
      fontAwesomeIconSize: '34px',
      warning: {
        background: '#f59e0b',
        textColor: '#ffffff',
        childClassName: 'notiflix-notify-warning',
        notiflixIconColor: 'rgba(0,0,0,0.2)',
        fontAwesomeClassName: 'fas fa-exclamation-triangle',
        fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
        backOverlayColor: 'rgba(245,158,11,0.2)',
      },
      success: {
        background: '#22c55e',
        textColor: '#ffffff',
        childClassName: 'notiflix-notify-success',
        notiflixIconColor: 'rgba(0,0,0,0.2)',
        fontAwesomeClassName: 'fas fa-check',
        fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
        backOverlayColor: 'rgba(34,197,94,0.2)',
      },
      failure: {
        background: '#ef4444',
        textColor: '#ffffff',
        childClassName: 'notiflix-notify-failure',
        notiflixIconColor: 'rgba(0,0,0,0.2)',
        fontAwesomeClassName: 'fas fa-times',
        fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
        backOverlayColor: 'rgba(239,68,68,0.2)',
      },
    });
  }, []);

  const getBaseUrl = () => {
    return `https://${process.env.REACT_APP_API_DOMAIN}`;
  };

  const handleDownloadFile = async (filePathOrObject) => {
    try {
      const tokens = JSON.parse(localStorage.getItem('tokens'));
      if (!tokens || !tokens.access) {
        Notify.failure('Токен не найден для скачивания файла');
        return;
      }

      let downloadUrl;
      let fileName;
      
      if (typeof filePathOrObject === 'string') {
        // Используем только имя файла
        fileName = filePathOrObject.split('/').pop() || 'file';
        downloadUrl = `${getBaseUrl()}/antifraud-app/files/${fileName}`;
      } else {
        downloadUrl = filePathOrObject.url || `${getBaseUrl()}/antifraud-app/files/${filePathOrObject.id}`;
        fileName = filePathOrObject.name || filePathOrObject.filename || `file_${filePathOrObject.id}`;
      }
      
      console.log('Скачивание файла:', { downloadUrl, fileName, fileData: filePathOrObject });

      // Создаем URL с токеном
      const urlWithToken = new URL(downloadUrl);
      urlWithToken.searchParams.append('token', tokens.access);
      
      const response = await fetch(urlWithToken, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      Notify.success(`Файл "${fileName}" скачан`);
    } catch (error) {
      console.error('Ошибка скачивания файла:', error);
      Notify.failure('Ошибка скачивания файла');
    }
  };

  const searchArchivedRequests = async (id, page = 0) => {
    if (!id.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const tokens = JSON.parse(localStorage.getItem('tokens'));
      const response = await fetch(
        `https://${process.env.REACT_APP_API_DOMAIN}/antifraud-app/v1/antifraud/archived-request?id=${encodeURIComponent(id)}&page=${page}`,
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

  const handleRowClick = (requestId) => {
    setExpandedRequestId(expandedRequestId === requestId ? null : requestId);
  };

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
            <>
              <RequestTable>
                <TableHeader>
                  <TableCell>Project</TableCell>
                  <TableCell>User ID</TableCell>
                  <TableCell>Request ID</TableCell>
                  <TableCell>Sum</TableCell>
                  <TableCell>Currency</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableHeader>
                {searchResults.map((request) => (
                  <React.Fragment key={request.id}>
                    <TableRow onClick={() => handleRowClick(request.id)}>
                      <TableCell>{request.s_project?.name || '-'}</TableCell>
                      <TableCell>{request.s_user_id || '-'}</TableCell>
                      <TableCell>{request.s_request_id || '-'}</TableCell>
                      <TableCell>
                        {request.s_amount ? `${request.s_amount} RUB` : '-'}
                      </TableCell>
                      <TableCell>{request.s_currency ? `${request.s_currency}` : '-'}</TableCell>
                      <TableCell>{request.s_type || '-'}</TableCell>
                      <TableCell>
                        {request.s_created_at ? new Date(request.s_created_at).toLocaleString('ru-RU', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : '-'}
                      </TableCell>
                      <TableCell data-status={request.status?.toLowerCase()}>
                        {request.status || '-'}
                      </TableCell>
                    </TableRow>
                    {expandedRequestId === request.id && (
                      <CommentsSection>
                        {request.comments && request.comments.length > 0 ? (
                          request.comments.map((comment) => (
                            <CommentItem key={comment.id}>
                              <CommentHeader>
                                <CommentUser>{comment.username || comment.user_display || 'Пользователь'}</CommentUser>
                                <CommentDate>
                                  {new Date(comment.created_at).toLocaleString('ru-RU', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </CommentDate>
                              </CommentHeader>
                              <CommentText>{comment.text}</CommentText>
                              {comment.files && comment.files.length > 0 && (
                                <CommentFiles>
                                  {comment.files.map((filePath, fileIndex) => {
                                    const fileName = filePath.split('/').pop() || `Файл ${fileIndex + 1}`;
                                    const fileExtension = fileName.split('.').pop()?.toLowerCase();
                                    
                                    return (
                                      <CommentFileItem key={fileIndex}>
                                        <CommentFileInfo>
                                          <div className="file-name">{fileName}</div>
                                          <div className="file-meta">
                                            {fileExtension && <span>Тип: {fileExtension}</span>}
                                            <span>Путь: {filePath}</span>
                                          </div>
                                        </CommentFileInfo>
                                        <DownloadCommentFileButton onClick={() => handleDownloadFile(filePath)}>
                                          <MdDownload />
                                          Скачать
                                        </DownloadCommentFileButton>
                                      </CommentFileItem>
                                    );
                                  })}
                                </CommentFiles>
                              )}
                            </CommentItem>
                          ))
                        ) : (
                          <NoCommentsText>Нет комментариев</NoCommentsText>
                        )}
                      </CommentsSection>
                    )}
                  </React.Fragment>
                ))}
              </RequestTable>
              <ArchivePagination>
                <PaginationButton 
                  onClick={handlePrevPage} 
                  disabled={currentPage <= 0 || isLoading}
                >
                  <MdChevronLeft />
                </PaginationButton>
                <PaginationButton 
                  onClick={handleNextPage}
                  disabled={isLoading || searchResults.length === 0}
                >
                  <MdChevronRight />
                </PaginationButton>
              </ArchivePagination>
            </>
          )}
        </ResultsSection>
      </MainContent>
    </RequestsArchiveWrapper>
  );
};

export default RequestsArchive; 