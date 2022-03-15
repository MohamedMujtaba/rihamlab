import styled from "styled-components";
import empty from "../../img/money.png";
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
`;
const Img = styled.img`
  width: 30%;
  height: 30%;
`;

const Empty = () => {
  return (
    <Container>
      <Img src={empty} />
    </Container>
  );
};

export default Empty;
