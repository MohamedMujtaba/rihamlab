import { Link } from "react-router-dom";
import styled from "styled-components";


export const UserDit = styled.div`
  height: 100% ;
  width: 100%;
  display: flex;
`;
export const Left = styled.div`
  flex: 1;
  padding: 1rem 0;
`
export const User = styled.div`
  flex: 1;

`
export const Form = styled.form`

`
export const SubmitBtn = styled.button`
  background-color: #f4f4f4;
  width: 100px;
  padding: 1rem;
  margin: 1rem 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`
export const Right = styled.div`
  flex: 1;
`
export const Sub = styled.div`
  width: 100%;
  height: 50%;
`;
export const List = styled.div`
  width: 100%;
  height: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 0 1rem;
  gap: 15px;
`;
export const Item = styled(Link)`
background-color: #f4f4f4;
color: rgb(30,30,30);
text-decoration: none;
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
min-height: 90px;
max-height: 90px;
padding: 1rem 3rem;
border-radius: 5px;
`;
