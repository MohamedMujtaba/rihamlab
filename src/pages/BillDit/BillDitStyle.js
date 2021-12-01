import styled from "styled-components";

export const Main = styled.div`
/* position: relative; */
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  height: 100vw; */
  /* height: 50%; */
    margin-bottom: 10rem;
`
export const Top = styled.div`
  height: 90px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  font-family: 'Kufam' !important;
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
export const BillList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin-top:2rem; */
  @media print {
    break-inside: avoid-page;
    /* height: 600px; */
    overflow: unset;
  /* break-before: avoid-page; */
  /* break-after: avoid-page; */
  }
`;

export const Item = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: solid 1px #f4f4f4;
  margin-bottom: .3rem;
  padding: 0.5rem 1.5rem;
  @media print {
    /* break-inside: avoid-page; */
  /* break-before: avoid-page; */
  break-after: avoid-page;
}
`
export const InsCont = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 3rem;
  text-align: right;

`
export const QR = styled.div`
  position: fixed;
  bottom: 8%;
  left: 0;
  display: none;
  @media print{
    display: block;
  }

`