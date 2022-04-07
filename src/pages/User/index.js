import React, { useEffect, useState } from 'react';
import { ReactComponent as DeleteIcon } from '../../assets/DeleteIcon.svg';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { Button, Input,Form2 } from '../../components/FormComponents';
import useAuth from '../../hooks/useAuth';
import api from '../../services/api';
import {DeleteButton, Flex, Span, StyledLink, Title, Url, UrlLink,RankBox } from '../Home/style';
// import { Container, DeleteButton, Flex, Span, StyledLink, Title, Url, UrlLink,SelectedStyled } from './style';
import {SelectedStyled,Container,Form,Table } from './style';
import { useNavigate } from "react-router-dom";

const myOptions = [
  { value: '1', label: 'Troca' },
  { value: '2', label: 'Avaliação' },
  { value: '3', label: 'Avaliação e Troca' },
  { value: '4', label: 'Fechamento' },
  { value: '5', label: 'NPC S/ OS' },
  { value: '6', label: 'SW' }
];

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
      
      async function handleChange(e) {
        e.preventDefault();
        const items = await api.getItemsFiltered(auth,form);
        console.log(items);
        setItems(items);
        console.log(form);
      }

    useEffect(() => {
    if (!reload) return;

    async function loadPage() {
      setReload(false);
      if (!auth) {
        return  navigate('/login');
      }
  
      try {
        const { data } = await api.getUser(auth);
        // const items = await api.getItems(auth);
        // console.log(items);
        // setItems(items);
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
            <Form onSubmit={handleChange}>
            <SelectedStyled 
                onChange={e => {setForm({...form,type:e.value});console.log(form)}}
                options={myOptionsType} 
                required
            />
            <Input
                onChange={e => {setForm({...form,datestart:e.target.value});console.log(form)}}
                value={form.datestart}
                data-date-format="DD-MM-YYYY"
                placeholder='Data inicio'
                options={myOptionsType}
                type='date'
                
            />
            <Input
                onChange={e => {setForm({...form,dateend:e.target.value});console.log(e.target.value)}}
                value = {form.dateend}
                placeholder='data Fim'
                options={myOptionsType}
                type='date'
                
            />
            <Button type =  'submit'>Buscar</Button>
            </Form>
            {item&&<Urls token={auth} urls={item} setReload={setReload} />}
        </Container>
    ) 

}
function Urls({ token, urls ,setReload}) {
  async function handleDelete(id) {
    try {
      await api.deleteItem(token, id)
      setReload(true);
    } catch (error) {
      console.log(error);
      alert("Erro, recarregue a página em alguns segundos");
    }
  }

  return (
    <Flex width="100%" margin="10px 0px 0px 0px" direction="column" gap="10px">
       <h2>Ultimas adicionadas</h2>
      {urls.map(url => (
        <Url key={url.id}>
          <Flex justifyContent="space-between" alignItems="center" gap="75px">
            <UrlLink color="#FFF" fontWeight="400">{url.os}</UrlLink>
            <UrlLink color="#FFF" fontWeight="400">{url.model}</UrlLink>
            <UrlLink color="#FFF" fontWeight="400">{myOptions[url.typeId-1].label}</UrlLink>
            <Span color="#FFF" fontWeight="400"> Horário: {url.datetime}</Span>
          </Flex>
          <DeleteButton onClick={() => handleDelete(url.id)}>
            <DeleteIcon />
          </DeleteButton>
        </Url>
      ))}
    </Flex>
  )
}
export default User;