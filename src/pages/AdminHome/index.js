import { ReactComponent as DeleteIcon } from '../../assets/DeleteIcon.svg';
import { Container,DeleteButton,SelectedStyled} from './styles';
import {TopBarAdmin} from '../../components/TopBarAdmin';
import api from '../../services/api';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import {RankBox} from '../Home/style';

function AdminHome() {
    const { auth } = useAuth();
    const [users, setUsers] = useState(null);
    const [reload, setReload] = useState(true);
    const [resume,setResume] = useState(null);
    const [form, setForm] = useState({datestart:'',dateend:''});
    const navigate =useNavigate();


    useEffect(() => {

        async function loadPage() {
          if (!auth) {
            return  navigate('/');
          }
      
          try {
            const  data  = await api.getUsers();
            const resume = await api.getAdminResume(auth);
            setResume(resume);
            console.log(data)
            setUsers(data);
          } catch (error) {
            console.log(error);
            alert("Erro, recarregue a página em alguns segundos");
            navigate('/')
            setUsers({});
          }
        }
        loadPage();
    }, [auth, reload])
  
    if (auth && !users) {
      return <h2>Carregando...</h2>
    }
          
    async function handleChange(e) {
      e.preventDefault();
      const items = await api.getAdminResumeByDate(auth,form.datestart,form.dateend);
      setResume(items);
    }
    

    return(
        <Container padding="50px 70px 0px 70px">
            <TopBarAdmin></TopBarAdmin>
            <h1>Bem vindo ao painel administrativo</h1>
            <div className="tecnicos">
                <h2>Técnicos</h2>
                <RankBox>
            <caption>Totalidade</caption>
            <table>
              <thead>
              <tr>
                <th>Nome</th>
                <th>Trocas</th>
                <th>Avaliações</th>
                <th>Avaliações e Trocas</th>
                <th>Fechamento</th>
                <th>NPC s/ OS</th>
                <th>SW</th>
              </tr>
              </thead>
              <tbody>
                {resume && resume.map((resume,i) => 

                    <tr>
                        <td key={i}>{resume.name}</td>
                        <th key={i}>{resume.Trocas}</th>
                        <th key={i}>{resume.Avaliações}</th>
                        <th key={i}>{resume['Avaliação e troca']}</th>
                        <th key={i}>{resume.Fechamento}</th>
                        <th key={i}>{resume['NPC s/ OS']}</th>
                        <th key={i}>{resume.SW}</th>
                    </tr>
                )}
              </tbody>
            </table>
            </RankBox>
            </div>
            <div className="clientes">
            <form onSubmit={handleChange}>
              {/* <SelectedStyled 
                  // onChange={e => {setForm({...form,type:e.value});console.log(form)}}
                  // options={myOptionsType} 
                  required
              /> */}
              <input
                  onChange={e => {setForm({...form,datestart:e.target.value});console.log(form)}}
                  value={form.datestart}
                  data-date-format="DD-MM-YYYY"
                  placeholder='Data inicio'
                  // options={myOptionsType}
                  type='date'
                  
              />
              <input
                  onChange={e => {setForm({...form,dateend:e.target.value});console.log(e.target.value)}}
                  value = {form.dateend}
                  placeholder='data Fim'
                  type='date'
                  
              />
              <button type =  'submit'>Buscar</button>
            </form>
            </div>
            <footer> Saudades &#128540; Meiroca &#128525;</footer>
        </Container>
    )
}

export default AdminHome;