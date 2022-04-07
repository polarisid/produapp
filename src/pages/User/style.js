import { Link } from "react-router-dom";
import styled from "styled-components";
import Select from 'react-select'

const SelectedStyled = styled(Select)`
  width: 100%;
  font-family: 'Lexend Deca', sans-serif;
  color: #000;
  background: #FFFFFF;
  /* padding: 21px; */
  border: 1px solid rgba(120, 177, 89, 0.25);
  border-radius: 12px;
  box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);
  box-sizing: border-box;
`


const Form = styled.form`
display : flex;
width: 70%;
gap:10px;
`
const Container = styled.div`
  background: ${(props) => props.background || 'initial'};

  width: 100%;
  min-height: ${(props) => props.minHeight || 'initial'};

  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent || 'initial'};
  align-items: center;
  align-self: ${(props) => props.alignSelf || 'initial'};

  margin: ${(props) => props.margin || '0px'};
  padding: ${(props) => props.padding || '0px'};
  border-radius: ${(props) => props.borderRadius || '0px'};
`;


export {
    SelectedStyled,
    Container,
    Form
};