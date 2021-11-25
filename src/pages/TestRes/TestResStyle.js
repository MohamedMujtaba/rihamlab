import styled from "styled-components";
export const Top = styled.div`
  height: 150px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  font-family: 'Kufam';
  /* position: fixed;
  top:0;
  left: 0; */
  @media screen {
    & {
      display: none;
    }
  }
  @media print  {
    & {
      display: flex;
    }
    
  }

`;
export const Dit = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  /* margin-top: 100px; */
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
  margin: 3px 0;
  p {
    width: 30%;
    text-align: center;
    font-size: 16px;
  }
`;
export const Block = styled.div`
  break-inside: avoid-page;
  break-before: avoid-page;
  break-after: avoid-page; 
  width: 100%;
`
export const Footer = styled.div`
  width: 100%;
  height: 40px;
  border: solid 1px #f4f4f4;
  border-radius: 10px;
  display: none;
  align-items: center;
  justify-content: space-between;
  padding: 10mm 5mm;
  position: fixed;
  bottom: 0;
  right: 0;
  font-family: 'Kufam', sans-serif;

  @media print {
    &{
      display: flex;
    }
    
  }
`