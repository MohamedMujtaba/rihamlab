import { Link } from "react-router-dom";
import styled from "styled-components";
import Info from "../Info/Info";


const Btn = styled.button`
  position: fixed;
  border: none;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  color: rgb(30,30,30);
  transition: transform .3s cubic-bezier(0.165, 0.84, 0.44, 1);
  &:hover{
    transform: scale(1.05);
  }
  &:hover .info{
    display: flex;
  }
  @media print{
    visibility: hidden;
  }

`;

const Button = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const Lin = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: rgb(30,30,30);
`;

const FloatButton = ({ att, color = "greenyellow", icon, onClick, to, type, bottom = "6%", right = "10%", left, content = 'name' }) => {
  return (
    <Btn
      style={{
        bottom: bottom,
        right: right,
        left: left,
      }}>
      {
        att === "Link"
          ?
          <Lin to={to} style={{
            background: color,
          }}>
            {icon}
          </Lin>
          :
          <Button style={{
            background: color,
          }}
            type="submit"
            onClick={onClick}
          >
            {icon}
          </Button>
      }
      <Info content={content} />
    </Btn>
  );
};

export default FloatButton;
