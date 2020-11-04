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
  color: white;
  cursor: pointer;
`;

export const Input = styled.input`
  border: 1px solid ${color.LIGHT_GRAY};
  border-radius: 3px;
  padding: 3px;
`;
