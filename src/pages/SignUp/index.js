import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Container, Form, Input, StyledLink } from '../../components/FormComponents';
import api from '../../services/api';
import {Title}  from '../Home/style'
import {SelectedStyled} from './style'

const myOptions = [
  { value: '5286953', label: 'MSC SLZ' },
  { value: '3198122', label: 'MSC THE' },
  { value: '3886546', label: 'MSC AJU' },
];
function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigation = useNavigate();

  function handleChange({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("As senhas devem ser iguais");
      return;
    }

    const user = { ...formData };
    delete user.confirmPassword;

    try {
      await api.createUser(user);
      navigation('/login');
    } catch (error) {
      console.log(error);
      alert("Erro, tente novamente");
    }
  }

  return (
    <Container>
      <Title>ProduApp</Title>

      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Nome"
          type="text"
          onChange={(e) => handleChange(e)}
          name="name"
          value={formData.name}
          required
        />
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
        <Input
          placeholder="Confirme a senha"
          type="password"
          onChange={(e) => handleChange(e)}
          name="confirmPassword"
          value={formData.confirmPassword}
          required
        />
        {/* <SelectedStyled
          name="asc" 
          onChange={(e) => handleChange(e)}
          options={myOptions} 
          required
        /> */}
        <Button type="submit">Cadastrar</Button>
      </Form>
    </Container>
  );
}

export default SignUp;