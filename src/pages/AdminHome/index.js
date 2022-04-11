import { ReactComponent as DeleteIcon } from '../../assets/DeleteIcon.svg';
import { Container,DeleteButton,SelectedStyled,RankBox,Form} from './styles';
import {TopBarAdmin} from '../../components/TopBarAdmin';
import api from '../../services/api';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from "react-router-dom";
// import {RankBox} from '../Home/style';

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
    }, [auth, reload]);
  
    if (auth && !users) {
      return <h2>Carregando...</h2>
    }
          
    async function handleChange(e) {
      e.preventDefault();
      console.log("chegou aqui")
      const items = await api.getAdminResumeByDate(auth,form.datestart,form.dateend);
      console.log(items)
      setResume(items);
    }
    

    return(
      <>
        <Container padding="60px 70px 0px 70px">
            <TopBarAdmin></TopBarAdmin>
            <h1>Bem vindo ao painel administrativo</h1>
            <div className="tecnicos">
            <Form onSubmit={handleChange}>
              {/* <SelectedStyled 
                  // onChange={e => {setForm({...form,type:e.value});console.log(form)}}
                  // options={myOptionsType} 
                  required
              /> */}
              <label>Filtro</label>
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
              <button type="submit" >Buscar</button>
            </Form>
                <RankBox>
                {/* <caption>Totalidade</caption> */}
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

                    <tr key ={i}>
                        <td>{resume.name}</td>
                        <th>{resume.Trocas}</th>
                        <th>{resume.Avaliações}</th>
                        <th>{resume['Avaliação e troca']}</th>
                        <th>{resume.Fechamento}</th>
                        <th>{resume['NPC s/ OS']}</th>
                        <th>{resume.SW}</th>
                    </tr>
                )}
              </tbody>
            </table>
            </RankBox>
            </div>
            <div className="clientes">

            </div>
            
        </Container>
         </>
    )
}

export default AdminHome;
