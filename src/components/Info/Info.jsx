import styled from "styled-components";

export const InfoCont = styled.div`
  position: absolute;
  display: none;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color:rgb(30,30,30);
  /* border: rgb(30,30,30) solid 1px; */
  background-color: #f4f4f4;
  border-radius: 2px;
  padding: .3rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  /* width: 400px; */
  width:60px;
  max-width: 300px;
  /* top:${(props) => props.top} ; */
`;
const Info = ({ content = 'name', top, bottom, left = '4rem', right }) => {
  return (
    <InfoCont className="info"
      style={{
        top: top,
        bottom: bottom,
        left: left,
        right: right,
      }}
    >
      <small>{content}</small>
    </InfoCont>
  );
};

export default Info;
