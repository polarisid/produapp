import styled from 'styled-components';

import { Link } from "react-router-dom";
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

.tecnicos{
  width: 50%;

ul li{
  display: flex;
  align-items: center;
  border: 1px solid rgba(120, 177, 89, 0.25);
  gap:20px;

}
}

`

const DeleteButton = styled.button`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;

  width: 100%;
  max-width: 25px;

  display: flex;
  justify-content: center;
  align-items: center;
  align-self: stretch;

  padding: 5px;
  margin-left: auto;
  background: #FFF;
  border-radius: 0px 12px 12px 0px;
`;

export {
    Container,
    DeleteButton,
    SelectedStyled
}