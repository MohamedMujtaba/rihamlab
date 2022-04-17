import styled from "styled-components";
export const Left = styled.div`
  flex: 1;
  height: 100%;
`;
export const Cart = styled.div`
  overflow-y: auto;
  max-height: 60%;
  /* position: relative; */
`;
export const Right = styled.div`
  flex: 1;
  height: 100%;
`;
export const CloseBtn = styled.button`
  background: none;
  border: none;
  color: #dc3545;
  padding: 5px;
  font-size: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const List = styled.div`
  flex: 1;
  width: 100%;
  max-height: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  overflow-y: scroll;
  /* margin: 1rem ; */
  margin: 1rem 2rem 0 0;
  gap: 10px;
`;
