import styled from 'styled-components';

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

const RankBox = styled.div`
align-self: left ;
width: 100%;
margin: 20px 0px; 
caption {
  font-weight: bold;
  font-size: 24px;
  text-align: left;
  color: #333;
  margin-bottom: 16px;
}
thead {
  background-color: #333;
  color: white;
}
tbody tr:nth-child(odd) {
  background-color: #fff;
}

tbody tr:nth-child(even) {
  background-color: #eee;
}
table, th, td {
  border: 1px solid rgba(120, 177, 89, 0.25);
  padding: 5px;
  /* border-collapse: collapse; */
  th{
    width: 100px;
  }
  td {
  text-align: center;
}
}
`;
const Container = styled.div`
  background: ${(props) => props.background || 'initial'};

  width: 100%;
  min-height: ${(props) => props.minHeight || 'initial'};
  min-height:100vh;

  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent || 'initial'};
  align-items: center;
  justify-content: space-between;
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
const Form= styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: space-evenly;

input{
  all: unset;
  box-sizing: border-box;
  font-family: 'Lexend Deca', sans-serif;

  color: #000;
  background: #FFFFFF;
  padding: 10px;
  border: 1px solid rgba(120, 177, 89, 0.25);
  border-radius: 12px;
  box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);

  ::placeholder {
    color: #9C9C9C;
    font-family: 'Lexend Deca', sans-serif;
  }

  
}

button{
  all: unset;
  box-sizing: border-box;
  cursor: pointer;


  font-style: normal;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
  
  color: #FFFFFF;
  
  text-align: center;

  padding: 10px;
  
  background: #5D9040;
  border-radius: 12px;

  max-width: ${(props) => props.maxWidth || 'initial'};
}
`
export {
  Form,
  RankBox,
    Container,
    DeleteButton,
    SelectedStyled
}