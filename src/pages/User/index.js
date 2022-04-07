import React, { useEffect, useState } from 'react';
import { ReactComponent as DeleteIcon } from '../../assets/DeleteIcon.svg';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { Button, Input,Form2 } from '../../components/FormComponents';
import useAuth from '../../hooks/useAuth';
import api from '../../services/api';
// import { Container, DeleteButton, Flex, Span, StyledLink, Title, Url, UrlLink,SelectedStyled } from './style';
import {SelectedStyled,Container,Form,Table } from './style';
import { useNavigate } from "react-router-dom";


function User(){
    const navigate =useNavigate();
    const [user, setUser] = useState(null);
    const [reload, setReload] = useState(true);
    const { auth } = useAuth();
    const [form, setForm] = useState('');
    const [item, setItems] = useState('');

    const myOptionsType = [
        { value: '1', label: 'Troca' },
        { value: '2', label: 'Avaliação' },
        { value: '3', label: 'Avaliação e Troca' },
        { value: '4', label: 'Fechamento' },
        { value: '5', label: 'NPC S/ OS' },
        { value: '6', label: 'SW' }
      ];
      


    useEffect(() => {
    if (!reload) return;

    async function loadPage() {
      setReload(false);
      if (!auth) {
        return  navigate('/login');
      }
  
      try {
        const { data } = await api.getUser(auth);
        const items = await api.getItems(auth);
        console.log(items);
        setItems(items);
        setUser(data);
      } catch (error) {
        console.log(error);
        alert("Erro, recarregue a página em alguns segundos");
        navigate('/login')
        setUser({});
      }}
    

    loadPage();
  }, [auth, reload])

  if (auth && !user) {
    return <h2>Carregando...</h2>
  }


    return (
        <Container>
            
            <div>
                <h1>Resumo</h1>
                <h2>Total de Avaliação: 500</h2>
                <h2>Total de Trocas: 100</h2>
                <h2>Total de Avaliação e Trocas: 100</h2>
            </div>
            <Form>
            <SelectedStyled 
                onChange={e => {setForm({...form,type:e.value});console.log(form)}}
                options={myOptionsType} 
                required
            />
            <Input
                onChange={e => {setForm({...form,dateStart:e.value});console.log(form)}}
                placeholder='Data inicio'
                options={myOptionsType}
                type='date'
                required
            />
            <Input
                onChange={e => {setForm({...form,dateEnd:e.value});console.log(form)}}
                placeholder='data Fim'
                options={myOptionsType}
                type='date'
                required
            />
            <Button>Buscar</Button>
            </Form>
        </Container>
    )

}

export default User;