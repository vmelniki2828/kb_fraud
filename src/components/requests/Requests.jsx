import React, { useState, useRef } from 'react';
import { MdPause, MdStop, MdClose, MdAttachFile, MdExpandMore, MdDownload, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Sidebar from '../Sidebar';
import { 
  RequestsWrapper, 
  MainContent, 
  GetRequestButton,
  ConnectionStatus,
  DisconnectButton,
  RequestTable,
  TableHeader,
  TableRow,
  TableCell,
  ActionButtons,
  ActionButton,
  NextRequestButton,
  CommentSection,
  CommentTextarea,
  FileUploadButton,
  ControlButtons,
  ControlButton,
  FilesList,
  FileItem,
  FileInfo,
  RemoveFileButton,
  PauseMenu,
  PauseMessage,
  ResumeButton,
  Spinner,
  LoadingWrapper,
  LoadingText,
  HoldRequestsSection,
  HoldListToggle,
  HoldRequestsContent,
  HoldRequestsTable,
  HoldTableHeader,
  HoldTableBody,
  HoldTableRow,
  HoldTableCell,
  HoldPagination,
  PaginationButton,
  PaginationInfo,
  RequestDetailsSection,
  CommentsSection,
  CommentsSectionTitle,
  CommentItem,
  CommentHeader,
  CommentUser,
  CommentDate,
  CommentText,
  RequestFilesSection,
  RequestFilesSectionTitle,
  RequestFileItem,
  RequestFileInfo,
  DownloadFileButton,
  NoDataMessage
} from './Requests.styled';

const Requests = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('');
  const [currentRequest, setCurrentRequest] = useState(null);
  const [requestComments, setRequestComments] = useState([]);
  const [requestFiles, setRequestFiles] = useState([]);
  const [comment, setComment] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [pauseMessage, setPauseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [controlsDisabled, setControlsDisabled] = useState(false);
  const [pendingStop, setPendingStop] = useState(false);
  const [holdRequests, setHoldRequests] = useState([]);
  const [holdRequestsPage, setHoldRequestsPage] = useState(1);
  const [loadingHoldRequests, setLoadingHoldRequests] = useState(false);
  const [holdRequestsExpanded, setHoldRequestsExpanded] = useState(false);
  const [holdListActive, setHoldListActive] = useState(false);
  const [holdRequestsCount, setHoldRequestsCount] = useState(0);
  const [userData, setUserData] = useState(null);
  const wsRef = useRef(null);

  // Получаем данные пользователя при загрузке компонента
  React.useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

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

  const getWebSocketUrl = () => {
    const domain = process.env.REACT_APP_API_DOMAIN;
    return `wss://${domain}/ws/antifraud/`;
  };

  const getBaseUrl = () => {
    return `https://${process.env.REACT_APP_API_DOMAIN}`;
  };

  const fetchHoldRequests = async (page = 1) => {
    try {
      const tokens = JSON.parse(localStorage.getItem('tokens'));
      if (!tokens || !tokens.access) {
        console.error('Токен не найден для запроса hold-requests');
        return;
      }

      setLoadingHoldRequests(true);
      
      const response = await fetch(
        `${getBaseUrl()}/antifraud-app/v1/antifraud/hold-requests?page=${page - 1}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens.access}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Hold requests получены:', data);
      
      // Всегда заменяем массив новыми данными
      setHoldRequests(data.results || data || []);
      setHoldRequestsPage(page);
      
      // Обновляем количество заявок
      const currentCount = data.results ? data.results.length : (Array.isArray(data) ? data.length : 0);
      setHoldRequestsCount(currentCount);
      
    } catch (error) {
      console.error('Ошибка при загрузке hold-requests:', error);
      Notify.failure('Ошибка загрузки отложенных заявок');
    } finally {
      setLoadingHoldRequests(false);
    }
  };

  const handleGetRequest = async () => {
    try {
      const tokens = JSON.parse(localStorage.getItem('tokens'));
      if (!tokens || !tokens.access) {
        setConnectionStatus('Ошибка: токен не найден');
        return;
      }

      setIsLoading(true);
      setConnectionStatus('Отправка запроса на смену...');
      
      const shiftUrl = `https://${process.env.REACT_APP_API_DOMAIN}/antifraud-app/v1/antifraud/shift`;
      console.log('Отправка запроса на:', shiftUrl);
      
      const shiftResponse = await fetch(shiftUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokens.access}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shift_type: "requests"
        }),
      });

      if (!shiftResponse.ok) {
        const errorText = await shiftResponse.text();
        console.error('Ошибка запроса shift:', shiftResponse.status, errorText);
        setConnectionStatus(`Ошибка запроса shift: ${shiftResponse.status}`);
        return;
      }

      const shiftData = await shiftResponse.json();
      console.log('Ответ shift:', shiftData);
      
      setConnectionStatus('Подключение к WebSocket...');
      
      const wsUrl = `https://${process.env.REACT_APP_API_DOMAIN}/antifraud-app-websocket/api/v1/websocket/antifraud/${tokens.access}`;
      console.log('Подключение к WebSocket:', wsUrl);
      
      wsRef.current = new WebSocket(wsUrl);
      
      wsRef.current.onopen = () => {
        console.log('WebSocket соединение установлено');
        setIsConnected(true);
        setConnectionStatus('Ожидание заявки...');
      };
      
      wsRef.current.onmessage = (event) => {
        console.log('Получено сообщение:', event.data);
        try {
          const data = JSON.parse(event.data);
          console.log('Данные сообщения:', data);
          
          if (data.type === 'data' && data.data && data.data.request) {
            setCurrentRequest(data.data.request);
            setRequestComments(data.data.request.comments || []);
            setRequestFiles(data.data.request.files || []);
            setIsPaused(false);
            setIsLoading(false);
            setControlsDisabled(false);
            setPendingStop(false);
            setHoldListActive(true); // Активируем Hold list при получении новой заявки
            console.log('Заявка установлена:', data.data.request);
            console.log('Комментарии:', data.data.request.comments);
            console.log('Файлы:', data.data.request.files);
          }
          
          if (data.type === 'status' && data.data && data.data.is_paused === 'True') {
            setIsPaused(true);
            setPauseMessage(data.message || 'Работа приостановлена');
            setCurrentRequest(null);
            console.log('Статус паузы получен:', data.message);
          }
          
          if (data.type === 'status' && data.meta && data.meta.status === 'disconnected') {
            console.log('Получен статус disconnected:', data);
            
            if (wsRef.current) {
              wsRef.current.close();
              wsRef.current = null;
            }
            setIsConnected(false);
            setCurrentRequest(null);
            setComment('');
            setUploadedFiles([]);
            setIsLoading(false);
            setControlsDisabled(false);
            setPendingStop(false);
          }
          
          if (data.type === 'decision' && pendingStop) {
            console.log('Получен ответ decision после команды stop:', data);
            
            if (wsRef.current) {
              wsRef.current.close();
              wsRef.current = null;
            }
            setIsConnected(false);
            setCurrentRequest(null);
            setComment('');
            setUploadedFiles([]);
            setIsLoading(false);
            setControlsDisabled(false);
            setPendingStop(false);
          }
        } catch (error) {
          console.error('Ошибка парсинга сообщения:', error);
        }
      };
      
      wsRef.current.onerror = (error) => {
        console.error('Ошибка WebSocket:', error);
        setConnectionStatus('Ошибка соединения');
        setIsConnected(false);
        setIsLoading(false);
      };
      
      wsRef.current.onclose = (event) => {
        console.log('WebSocket соединение закрыто:', event.code, event.reason);
        setIsConnected(false);
        setConnectionStatus('Соединение закрыто');
        setIsLoading(false);
        
        if (pendingStop) {
          console.log('Соединение закрыто во время ожидания ответа на stop');
          setCurrentRequest(null);
          setComment('');
          setUploadedFiles([]);
          setControlsDisabled(false);
          setPendingStop(false);
        }
      };
      
    } catch (error) {
      console.error('Ошибка при создании соединения:', error);
      setConnectionStatus('Ошибка: ' + error.message);
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setCurrentRequest(null);
  };

  const handleAction = async (action) => {
    if (!currentRequest || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.error('WebSocket не подключен или заявка отсутствует');
      return;
    }

    if (!comment.trim()) {
      Notify.warning('Комментарий обязателен для отправки решения!', {
        position: 'center-top',
        timeout: 3000,
        fontSize: '16px',
        width: '400px',
      });
      return;
    }

    let decision;
    switch(action) {
      case 'approve':
        decision = 'approve';
        break;
      case 'decline':
        decision = 'decline';
        break;
      case 'escalade':
        decision = 'escalade';
        break;
      case 'hold':
        decision = 'hold';
        break;
      default:
        console.error('Неизвестное действие:', action);
        return;
    }

    const filesBase64 = [];
    for (const file of uploadedFiles) {
      try {
        const base64 = await convertFileToBase64(file.file);
        filesBase64.push(base64);
      } catch (error) {
        console.error('Ошибка конвертации файла:', file.name, error);
      }
    }

    const message = {
      type: "decision",
      data: {
        id: currentRequest.id,
        decision: decision,
        comment: comment.trim() || undefined,
        ...(filesBase64.length > 0 && { files: filesBase64 })
      }
    };

    console.log('Отправка решения:', message);
    
    try {
      wsRef.current.send(JSON.stringify(message));
      console.log(`Решение "${decision}" отправлено для заявки ID: ${currentRequest.id}`, 
                  filesBase64.length > 0 ? `с ${filesBase64.length} файлами` : '');
      
      Notify.success(`Решение "${decision.toUpperCase()}" отправлено!`, {
        position: 'center-top',
        timeout: 2000,
      });
      
      if (decision === 'hold') {
        setTimeout(() => {
          fetchHoldRequests(1);
        }, 1000);
      }
      
      setIsLoading(true);
      setCurrentRequest(null);
      setRequestComments([]);
      setRequestFiles([]);
      setComment('');
      setUploadedFiles([]);
      
    } catch (error) {
      console.error('Ошибка отправки решения:', error);
      Notify.failure('Ошибка отправки решения. Попробуйте еще раз.');
    }
  };

  const handleNextRequest = () => {
    console.log('Запрос следующей заявки');
    setCurrentRequest(null);
  };

  const handleFileUpload = () => {
    const allowedTypes = [
      'image/jpeg',
      'image/png', 
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = allowedTypes.join(',');
    input.onchange = (e) => {
      const files = Array.from(e.target.files);
      console.log('Выбранные файлы:', files);
      
      const validFiles = files.filter(file => {
        if (!allowedTypes.includes(file.type)) {
          console.warn(`Файл ${file.name} имеет неподдерживаемый тип: ${file.type}`);
          Notify.warning(`Файл "${file.name}" имеет неподдерживаемый тип. Разрешены: изображения (JPG, PNG), PDF, текстовые файлы, документы Word.`);
          return false;
        }
        return true;
      });
      
      const newFiles = validFiles.map(file => ({
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        file: file
      }));
      
      setUploadedFiles(prev => [...prev, ...newFiles]);
    };
    input.click();
  };

  const handleRemoveFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handlePause = () => {
    if (controlsDisabled) {
      return;
    }

    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.error('WebSocket не подключен');
      return;
    }

    setControlsDisabled(true);

    const pauseMessage = {
      type: "pause"
    };

    console.log('Отправка паузы:', pauseMessage);
    
    try {
      wsRef.current.send(JSON.stringify(pauseMessage));
      console.log('Команда паузы отправлена');
    } catch (error) {
      console.error('Ошибка отправки паузы:', error);
      setControlsDisabled(false);
    }
  };

  const handleStop = () => {
    if (controlsDisabled) {
      return;
    }

    setControlsDisabled(true);

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const stopMessage = {
        type: "stop"
      };

      console.log('Отправка стопа:', stopMessage);
      
      try {
        wsRef.current.send(JSON.stringify(stopMessage));
        console.log('Команда стопа отправлена');
        
        setPendingStop(true);
        console.log('Ожидание ответа decision после команды stop');
        
      } catch (error) {
        console.error('Ошибка отправки стопа:', error);
        setControlsDisabled(false);
        setPendingStop(false);
      }
    } else {
      setIsConnected(false);
      setCurrentRequest(null);
      setComment('');
      setUploadedFiles([]);
      setIsLoading(false);
      setControlsDisabled(false);
    }
  };

  const handleResume = () => {
    setIsPaused(false);
    setPauseMessage('');
    setControlsDisabled(false);
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'resume' }));
    }
  };

  const toggleHoldRequests = () => {
    if (!holdListActive) {
      return; // Не позволяем открывать если кнопка неактивна
    }
    
    const newExpanded = !holdRequestsExpanded;
    setHoldRequestsExpanded(newExpanded);
    
    // Делаем запрос только при открытии (не при закрытии)
    if (newExpanded) {
      fetchHoldRequests(1);
    }
  };

  const handlePrevPage = () => {
    if (holdRequestsPage > 1) {
      fetchHoldRequests(holdRequestsPage - 1);
    }
  };

  const handleNextPage = () => {
    if (holdRequestsCount >= 10) {
      fetchHoldRequests(holdRequestsPage + 1);
    } else {
      Notify.info('Больше отложенных заявок нет', {
        position: 'center-top',
        timeout: 3000,
      });
    }
  };

  const handleDownloadFile = async (filePathOrObject) => {
    try {
      const tokens = JSON.parse(localStorage.getItem('tokens'));
      if (!tokens || !tokens.access) {
        Notify.failure('Токен не найден для скачивания файла');
        return;
      }

      let fileName;
      
      if (typeof filePathOrObject === 'string') {
        // Используем только имя файла
        fileName = filePathOrObject.split('/').pop() || 'file';
      } else {
        fileName = filePathOrObject.name || filePathOrObject.filename || `file_${filePathOrObject.id}`;
      }
      
      const downloadUrl = `${getBaseUrl()}/antifraud-app/files/${fileName}`;
      
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

  const handleHoldRequestClick = (request) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.error('WebSocket не подключен');
      return;
    }

    const message = {
      type: "request_hold",
      data: {
        request_id: request.id
      }
    };

    console.log('Отправка запроса на выбор hold заявки:', message);
    
    try {
      wsRef.current.send(JSON.stringify(message));
      console.log(`Запрос на заявку ID: ${request.id} отправлен`);
      
      // Показываем уведомление
      Notify.success(`Выбрана заявка #${request.id}`, {
        position: 'center-top',
        timeout: 2000,
      });
      
    } catch (error) {
      console.error('Ошибка отправки запроса hold заявки:', error);
      Notify.failure('Ошибка выбора заявки. Попробуйте еще раз.');
    }
  };

  React.useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return (
    <RequestsWrapper>
      <Sidebar />
      <MainContent hasRequest={!!currentRequest}>
        {isPaused ? (
          <PauseMenu>
            <PauseMessage>Работа приостановлена - вы не будете получать новые заявки</PauseMessage>
            <ResumeButton onClick={handleResume}>
              Возобновить работу
            </ResumeButton>
          </PauseMenu>
        ) : !currentRequest ? (
          isLoading ? (
            <LoadingWrapper>
              <Spinner />
              <LoadingText>{connectionStatus}</LoadingText>
            </LoadingWrapper>
          ) : (
            <GetRequestButton 
              onClick={handleGetRequest} 
              disabled={isConnected}
            >
              {isConnected ? 'Ожидание заявки...' : 'Получить заявку'}
            </GetRequestButton>
          )
        ) : null}
        
        {currentRequest && !isPaused && (
          <>
            <NextRequestButton>
              Request
            </NextRequestButton>
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
              <TableRow>
                <TableCell>{currentRequest.s_project?.name || '-'}</TableCell>
                <TableCell>
                  {currentRequest.s_user_id ? (
                    <a 
                      href={currentRequest.s_project?.fundist_link || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        color: '#9d7bff', 
                        textDecoration: 'none',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                      onClick={(e) => {
                        if (!currentRequest.s_project?.fundist_link) {
                          e.preventDefault();
                          Notify.info('Ссылка недоступна');
                        }
                      }}
                    >
                      {currentRequest.s_user_id}
                    </a>
                  ) : '-'}
                </TableCell>
                <TableCell>{currentRequest.s_request_id || '-'}</TableCell>
                <TableCell>{currentRequest.s_amount ? `${currentRequest.s_amount} RUB` : '-'}</TableCell>
                <TableCell>{currentRequest.s_currency ? `${currentRequest.s_currency}` : '-'}</TableCell>
                <TableCell>{currentRequest.s_type || '-'}</TableCell>
                <TableCell>{currentRequest.s_created_at ? new Date(currentRequest.s_created_at).toLocaleString('ru-RU', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                }) : '-'}</TableCell>
                <TableCell data-status={currentRequest.status}>{currentRequest.status || '-'}</TableCell>
              </TableRow>
            </RequestTable>

            {/* Блок с комментариями сразу после таблицы */}
            {requestComments.length > 0 && (
              <RequestDetailsSection>
                <CommentsSection>
                  <CommentsSectionTitle>Комментарии ({requestComments.length})</CommentsSectionTitle>
                  {requestComments.map((comment, index) => (
                    <CommentItem key={comment.id || index}>
                      <CommentHeader>
                        <CommentUser>{comment.user_display || comment.username || 'Пользователь'}</CommentUser>
                        <CommentDate>
                          {comment.created_at ? new Date(comment.created_at).toLocaleString('ru-RU', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          }) : ''}
                        </CommentDate>
                      </CommentHeader>
                      <CommentText>{comment.text || ''}</CommentText>
                      {/* Показываем файлы комментария если есть */}
                      {comment.files && comment.files.length > 0 && (
                        <div style={{ marginTop: '6px' }}>
                          {comment.files.map((filePath, fileIndex) => {
                            // filePath - это строка вида "uploads/comments/user_23_35d4cf44-96d6-4c11-a4a9-08779e7a3301.jpg"
                            const fileName = filePath.split('/').pop() || `Файл ${fileIndex + 1}`;
                            const fileExtension = fileName.split('.').pop()?.toLowerCase();
                            
                            return (
                              <RequestFileItem key={fileIndex} style={{ marginBottom: '4px' }}>
                                <RequestFileInfo>
                                  <div className="file-name">{fileName}</div>
                                  <div className="file-meta">
                                    {fileExtension && <span>Тип: {fileExtension}</span>}
                                    <span>Путь: {filePath}</span>
                                  </div>
                                </RequestFileInfo>
                                <DownloadFileButton onClick={() => handleDownloadFile(filePath)}>
                                  <MdDownload />
                                  Скачать
                                </DownloadFileButton>
                              </RequestFileItem>
                            );
                          })}
                        </div>
                      )}
                    </CommentItem>
                  ))}
                </CommentsSection>
              </RequestDetailsSection>
            )}
            
            <CommentSection>
              <CommentTextarea
                placeholder="Добавить комментарий..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <FileUploadButton onClick={handleFileUpload}>
                <MdAttachFile style={{ marginRight: '8px' }} />
                Добавить файлы
              </FileUploadButton>
              
              {uploadedFiles.length > 0 && (
                <FilesList>
                  {uploadedFiles.map((file) => (
                    <FileItem key={file.id}>
                      <FileInfo>
                        <div className="file-name">{file.name}</div>
                        <div className="file-size">{formatFileSize(file.size)}</div>
                      </FileInfo>
                      <RemoveFileButton onClick={() => handleRemoveFile(file.id)}>
                        <MdClose />
                      </RemoveFileButton>
                    </FileItem>
                  ))}
                </FilesList>
              )}
            </CommentSection>
            
            <ActionButtons>
              <ActionButton 
                color="green" 
                onClick={() => handleAction('approve')}
              >
                Approve
              </ActionButton>
              <ActionButton 
                color="red" 
                onClick={() => handleAction('decline')}
              >
                Decline
              </ActionButton>
              {userData?.type !== 'tl' && (
                <ActionButton 
                  color="blue" 
                  onClick={() => handleAction('escalade')}
                >
                  Escalade
                </ActionButton>
              )}
              <ActionButton 
                color="yellow" 
                onClick={() => handleAction('hold')}
              >
                Hold
              </ActionButton>
            </ActionButtons>
            
            <ControlButtons>
              <ControlButton 
                color="yellow" 
                onClick={handlePause} 
                title="Пауза"
                disabled={controlsDisabled}
              >
                <MdPause />
              </ControlButton>
              <ControlButton 
                color="red" 
                onClick={handleStop} 
                title="Стоп"
                disabled={controlsDisabled}
              >
                <MdStop />
              </ControlButton>
            </ControlButtons>


          </>
        )}
        
        {/* Hold Requests секция */}
        {isConnected && !isPaused && (
          <HoldRequestsSection>
            <HoldListToggle 
              onClick={toggleHoldRequests}
              expanded={holdRequestsExpanded}
              disabled={!holdListActive}
            >
              Hold list
              <MdExpandMore className="icon" />
            </HoldListToggle>
            
            <HoldRequestsContent expanded={holdRequestsExpanded}>
              {loadingHoldRequests ? (
                <LoadingWrapper>
                  <Spinner />
                  <LoadingText>Загрузка отложенных заявок...</LoadingText>
                </LoadingWrapper>
              ) : holdRequests.length > 0 ? (
                <>
                  <HoldRequestsTable expanded={holdRequestsExpanded}>
                    <HoldTableHeader expanded={holdRequestsExpanded}>
                      <HoldTableCell>Project</HoldTableCell>
                      <HoldTableCell>User ID</HoldTableCell>
                      <HoldTableCell>Request ID</HoldTableCell>
                      <HoldTableCell>Sum</HoldTableCell>
                      <HoldTableCell>Currency</HoldTableCell>
                      <HoldTableCell>Type</HoldTableCell>
                      <HoldTableCell>Date</HoldTableCell>
                      <HoldTableCell>Comments</HoldTableCell>
                    </HoldTableHeader>
                    <HoldTableBody expanded={holdRequestsExpanded}>
                      {holdRequests.map((request, index) => (
                        <HoldTableRow 
                          key={request.id || index} 
                          expanded={holdRequestsExpanded}
                          onClick={() => handleHoldRequestClick(request)}
                        >
                          <HoldTableCell>{request.s_project?.name || '-'}</HoldTableCell>
                          <HoldTableCell>
                            {request.s_user_id ? (
                              <a 
                                href={request.s_project?.fundist_link || '#'} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ 
                                  color: '#9d7bff', 
                                  textDecoration: 'none',
                                  cursor: 'pointer',
                                  fontWeight: '600',
                                  pointerEvents: 'auto'
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (!request.s_project?.fundist_link) {
                                    e.preventDefault();
                                    Notify.info('Ссылка недоступна');
                                  }
                                }}
                              >
                                {request.s_user_id}
                              </a>
                            ) : '-'}
                          </HoldTableCell>
                          <HoldTableCell>{request.s_request_id || '-'}</HoldTableCell>
                          <HoldTableCell>{request.s_amount ? `${request.s_amount} RUB` : '-'}</HoldTableCell>
                          <HoldTableCell>{request.s_currency ? `${request.s_currency}` : '-'}</HoldTableCell>
                          <HoldTableCell>{request.s_type || '-'}</HoldTableCell>
                          <HoldTableCell>{request.s_created_at ? new Date(request.s_created_at).toLocaleString('ru-RU', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          }) : '-'}</HoldTableCell>
                          <HoldTableCell>
                            {request.comments && request.comments.length > 0 ? (
                              <div style={{ textAlign: 'left', fontSize: '12px' }}>
                                <div style={{ fontWeight: 'bold', color: '#9d7bff', marginBottom: '4px' }}>
                                  {request.comments[request.comments.length - 1].username || request.comments[request.comments.length - 1].user_display || 'Unknown'}
                                </div>
                                <div style={{ color: '#fff', lineHeight: '1.2' }}>
                                  {request.comments[request.comments.length - 1].text}
                                </div>
                              </div>
                            ) : (
                              'No comments'
                            )}
                          </HoldTableCell>
                        </HoldTableRow>
                      ))}
                    </HoldTableBody>
                  </HoldRequestsTable>
                  {/* Пагинация */}
                  <HoldPagination>
                    <PaginationButton 
                      onClick={handlePrevPage} 
                      disabled={holdRequestsPage <= 1 || loadingHoldRequests}
                    >
                      <MdChevronLeft />
                    </PaginationButton>
                    <PaginationInfo>
                      Страница {holdRequestsPage}
                    </PaginationInfo>
                    <PaginationButton 
                      onClick={handleNextPage}
                      disabled={loadingHoldRequests || holdRequestsCount < 10}
                    >
                      <MdChevronRight />
                    </PaginationButton>
                  </HoldPagination>
                </>
              ) : holdRequestsExpanded ? (
                <>
                  <LoadingText>Нет отложенных заявок</LoadingText>
                  {/* Пагинация даже когда нет заявок */}
                  <HoldPagination>
                    <PaginationButton 
                      onClick={handlePrevPage} 
                      disabled={holdRequestsPage <= 1 || loadingHoldRequests}
                    >
                      <MdChevronLeft />
                    </PaginationButton>
                    <PaginationInfo>
                      Страница {holdRequestsPage}
                    </PaginationInfo>
                    <PaginationButton 
                      onClick={handleNextPage}
                      disabled={loadingHoldRequests}
                    >
                      <MdChevronRight />
                    </PaginationButton>
                  </HoldPagination>
                </>
              ) : null}
            </HoldRequestsContent>
          </HoldRequestsSection>
        )}
      </MainContent>
    </RequestsWrapper>
  );
};

export default Requests; 