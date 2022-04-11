import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button, Container, Form, Input, StyledLink } from '../../components/FormComponents';
import useAuth from '../../hooks/useAuth';
import api from '../../services/api';
import {Title} from '../Home/style'

function AdminLogin() {
  const { auth,login } = useAuth();
  const navigation = useNavigate();
  const navigate =useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
   useEffect(() => {
    async function verificarLogin() {
      try{
      if (auth) {
        const { data } = await api.getUserAdmin(auth);
        if(data){
          navigate('/admin/home');
        }
        else{
          return;
        }
      }
      }catch (error) {
      console.log(error);
      alert("Erro, recarregue a página em alguns segundos");
      }}
      verificarLogin();
  },[auth])


  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const user = { ...formData };

    try {
      const { data } = await api.adminLogin(user);
      login(data);
      navigation('/admin/home');
    } catch (error) { 
      console.log(error);
      alert("Email ou senha incorretos");
    }
  }

  return (
    <Container>
      <Title>ProduApp Admin</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="E-mail"
          type="email"
          onChange={(e) => handleChange(e)}
          name="email"
          value={formData.email}
          required
        />
        <Input
          placeholder="Senha"
          type="password"
          onChange={(e) => handleChange(e)}
          name="password"
          value={formData.password}
          required
        />
        <Button type="submit">Entrar</Button>
      </Form>
      {/* <StyledLink to="/sign-up">Primeira vez? Cadastre-se!</StyledLink> */}
    </Container>
  );
}

export default AdminLogin;