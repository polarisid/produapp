import { Link } from "react-router-dom";
import styled from "styled-components";
import Select from 'react-select'
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
    Container,
}