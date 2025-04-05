import styled from "styled-components";

export const Fixed = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  background: #121a2a;
  z-index: 10;
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Container = styled.div`
  display: flex;
  flex: 1;
  gap: 20px;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  background: #0a0e17;
  color: #e0e0e0;
  font-family: "Fira Code", monospace;
  overflow: hidden;
  width: 100dvw;
`;