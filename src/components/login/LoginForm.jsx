import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  LoginWrapper,
  Form,
  Title,
  Input,
  Button
} from './LoginForm.styled';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const fetchUserData = async (accessToken) => {
    try {
      const response = await fetch(`https://${process.env.REACT_APP_API_DOMAIN}/api/user/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log('Данные пользователя получены:', userData);
      } else {
        console.error('Ошибка получения данных пользователя:', response.status);
      }
    } catch (error) {
      console.error('Ошибка получения данных пользователя:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`https://${process.env.REACT_APP_API_DOMAIN}/api/token/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('tokens', JSON.stringify(data));
        
        // Получаем данные пользователя
        await fetchUserData(data.access);
        
        navigate('/requests');
        Notify.success('Успешная авторизация');
      } else {
        throw new Error(data.detail || 'Ошибка авторизации');
      }
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      Notify.failure(error.message || 'Ошибка авторизации');
    }
  };

  return (
    <LoginWrapper>
      <Form onSubmit={handleSubmit} autoComplete="on">
        <Title>Вход</Title>
        <Input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          autoComplete="username"
        />
        <Input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="current-password"
          autoComplete="current-password"
        />
        <Button type="submit">
          Войти
        </Button>
      </Form>
    </LoginWrapper>
  );
};

export default LoginForm; 
