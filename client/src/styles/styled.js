import styled from 'styled-components';
import color from './colors';

export const Div = {
  column: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  row: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
};
export const Button = styled.button`
  border: none;
  border-radius: 5px;
  background-color: ${color.LIGHT_GREEN};
  color: ${color.WHITE};
  cursor: pointer;
  font-size: 14px;
  padding: 5px 16px;
  white-space: nowrap;
  height: 30px;
  &:focus {
    outline: none;
  }
`;

export const Input = styled.input`
  border: 1px solid ${color.LIGHT_GRAY};
  border-radius: 3px;
  padding: 3px;
`;

export const Textarea = styled.textarea`
  border: 1px solid ${color.LIGHT_GRAY};
  border-radius: 3px;
  padding: 3px;
`;
