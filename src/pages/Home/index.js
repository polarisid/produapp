import React, { useEffect, useState } from 'react';
import { ReactComponent as DeleteIcon } from '../../assets/DeleteIcon.svg';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { Button, Input,Form2, Form } from '../../components/FormComponents';
import useAuth from '../../hooks/useAuth';
import api from '../../services/api';
import { Container, DeleteButton, Flex, Span, StyledLink, Title, Url, UrlLink,SelectedStyled,RankBox } from './style';
import { useNavigate } from "react-router-dom";
import {Topbar} from '../../components/TopBar';
import dayjs from 'dayjs';

const myOptions = [
  { value: '1', label: 'Troca' },
  { value: '2', label: 'Avaliação' },
  { value: '3', label: 'Avaliação e Troca' },
  { value: '4', label: 'Fechamento' },
  { value: '5', label: 'NPC S/ OS' },
  { value: '6', label: 'SW' }
];

function Home() {
  const navigate =useNavigate();
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(true);
  const { auth } = useAuth();
  const [form, setForm] = useState('');
  const [item, setItems] = useState('');
  const [rank, setRank] = useState('');
  async function handleShortenButtonClick(e) {
    e.preventDefault();
    if (!auth) {
      alert("Apenas usuarios logados podem encurtar links!");
      return;
    }

    try {
      await api.sendForm(auth, form);
      setReload(true);
    } catch (error) {
      console.log(error);
      alert("Erro, recarregue a página em alguns segundos");
    }
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
        const rank1= await api.getRank();
        const items = await api.getItems(auth);
        console.log(items);
        setItems(items);
        setUser(data);
        setRank(rank1)
      } catch (error) {
        console.log(error);
        alert("Erro, recarregue a página em alguns segundos");
        navigate('/login')
        setUser({});
      }
    }

    loadPage();
  }, [auth, reload,rank])

  if (auth && !user) {
    return <h2>Carregando...</h2>
  }

  return (
    <>
    <Topbar/>
    <Container padding="40px 70px 0px 70px">
      <Flex>
      {rank&&
      <RankBox>
          <caption>RankDay</caption>
          <table>
          <thead>
          <tr>
            <th>Nome</th>
            <th>Soma</th>
          </tr>
          </thead>
          <tbody>
            {rank.map(item => (
            <tr>
              <th>{item.name}</th>
              <th>{item.count}</th>
            </tr>
            ))}
          </tbody>
        </table>
      </RankBox>
      }
      <Form2 onSubmit={handleShortenButtonClick}>
          <Input 
            value={form.os} 
            onChange={e => setForm({...form,'os':e.target.value})} 
            placeholder='OS'
            required
            type='number'
            />  
          <Input 
            value={form.model} 
            onChange={e => setForm({...form,'model':e.target.value})} 
            placeholder='Modelo' 
            required
            />  
            <SelectedStyled 
              onChange={e => {setForm({...form,type:e.value});console.log(form)}}
              options={myOptions} 
              required
              />
          <Button type ='submit'  maxWidth="182px">Adicionar</Button>
      </Form2>

      </Flex>
      {user && <Urls token={auth} urls={item} setReload={setReload} />}
      <footer>powered by Daniel</footer>
    </Container>
    </>
    
  );
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
            <Span color="#FFF" fontWeight="400"> Horário: {dayjs(url.datetime).format('DD/MM HH:mm')}</Span>
          </Flex>
          <DeleteButton onClick={() => handleDelete(url.id)}>
            <DeleteIcon />
          </DeleteButton>
        </Url>
      ))}
    </Flex>
  )
}

export default Home;