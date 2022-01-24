import styled from "styled-components";
export const Top = styled.div`
  height: 90px;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Dit = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;
export const Table = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 5rem;
`;
export const TableRow = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border: 1px solid #f4f4f4;
  margin: 3px;
  p {
    width: 30%;
    text-align: center;
    font-size: 15px;
  }
`;