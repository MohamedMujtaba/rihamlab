import styled from "styled-components";
export const Container = styled.div`
  width: 100%;
  /* height: 95%; */
  display: flex;
  padding-bottom: 3rem;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export const MainForm = styled.form`
  display: flex;
`;
export const Top = styled.div`
  width: 100%;
`;
export const Left = styled.div`
  width: 30%;
`;
export const Right = styled.div`
  width: 70%;
`;
export const Bottom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const InputContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  margin: 5px;
  width: 90%;
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
  border: 1px solid #f4f4f4;
`;
