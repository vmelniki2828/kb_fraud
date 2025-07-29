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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://209.38.237.223/antifraud-app/auth/login/', {
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
