import React, { useEffect, useState } from 'react';
import { ReactComponent as DeleteIcon } from '../../assets/DeleteIcon.svg';
import { ReactComponent as Logo } from '../../assets/Logo.svg';
import { Button, Input,Form2 } from '../../components/FormComponents';
import useAuth from '../../hooks/useAuth';
import api from '../../services/api';
import { Container, DeleteButton, Flex, Span, StyledLink, Title, Url, UrlLink,SelectedStyled } from './style';
import { useNavigate } from "react-router-dom";


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
        const items = await api.getItems(auth);
        console.log(items);
        setItems(items);
        setUser(data);
      } catch (error) {
        console.log(error);
        alert("Erro, recarregue a página em alguns segundos");
        
        setUser({});
      }
    }

    loadPage();
  }, [auth, reload])

  if (auth && !user) {
    return <h2>Carregando...</h2>
  }

  return (
    <Container padding="10px 70px 0px 70px">
      <Flex 
        direction="row" 
        alignItems="center" 
        alignSelf="flex-end"
      >
        <StyledLink to="/login" active="true">Minha produtividade</StyledLink>
        {/* <StyledLink>Sair</StyledLink> */}
      </Flex>
      <Title>
        ProduApp
        <Logo/>
      </Title>
      <Flex direction="column" alignItems="center" width="1018px">
        <Flex width="70%" gap="10px">
          <Form2 onSubmit={handleShortenButtonClick}>
          <Input 
            value={form.os} 
            onChange={e => setForm({...form,'os':e.target.value})} 
            placeholder='OS'
            required
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
       
        {user && <Urls token={auth} urls={item} />}
      </Flex>
      <footer>powered by Daniel</footer>
    </Container>
    
  );
}
function convertTZ(date, tzString) {
  return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}
function Urls({ token, urls }) {
  async function handleDelete(id) {
    try {
      await api.deleteItem(token, id)
      
    } catch (error) {
      console.log(error);
      alert("Erro, recarregue a página em alguns segundos");
    }
  }

  return (
    <Flex width="100%" margin="58px 0px 0px 0px" direction="column" gap="40px">
       <h2>Ultimas adicionadas</h2>
      {urls.map(url => (
        <Url key={url.id}>
          <Flex justifyContent="space-between" alignItems="center" gap="75px">
            <UrlLink color="#FFF" fontWeight="400">{url.os}</UrlLink>
            <UrlLink color="#FFF" fontWeight="400">{url.model}</UrlLink>
            <Span color="#FFF" fontWeight="400"> Horário: {convertTZ(url.datetime,'São Paulo/Brazil')}</Span>
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