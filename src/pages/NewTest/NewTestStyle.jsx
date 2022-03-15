import styled from "styled-components";
export const Container = styled.div`
  width: 100%;
  height: 95%;
  display: flex;
  /* align-items: center; */
  /* justify-content: space-between; */
  flex-direction: column;
`;
export const Left = styled.div`
  width: 100%;
`;
export const Right = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const InputContainer = styled.div`
  display: inline-flex;
  margin: 5px;
  width: 40%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #f4f4f4;
  outline: none;
`;
export const Textarea = styled.textarea`
  resize: vertical;
  width: 100%;
`;
