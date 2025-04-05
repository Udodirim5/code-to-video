import {
  cloneElement,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { X } from "lucide-react";

const ModalContext = createContext();

const Modal = ({ children }) => {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = (name) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ children, opensWindowName }) => {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
};

const Window = ({ children, name }) => {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref} $isMobile={isMobile}>
        <CloseButton onClick={close}>
          <X />
        </CloseButton>
        <ModalContent $isMobile={isMobile}>
          {cloneElement(children, { onCloseModal: close })}
        </ModalContent>
      </StyledModal>
    </Overlay>,
    document.body
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

// Styled Components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const StyledModal = styled.div`
  position: relative;
  background: var(--color-surface);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-width: ${(props) => (props.$isMobile ? "100%" : "600px")};
  max-height: ${(props) => (props.$isMobile ? "90dvh" : "70dvh")};
  overflow: auto;
  padding: ${(props) => (props.$isMobile ? "2rem" : "3.2rem 4rem")};
  transition: all 0.3s ease;

  ${(props) =>
    props.$isMobile &&
    css`
      margin: 0 1rem;
    `}
`;

const ModalContent = styled.div`
  padding-top: ${(props) => (props.$isMobile ? "1rem" : "2rem")};
  max-height: calc(
    ${(props) => (props.$isMobile ? "90dvh" : "70dvh")} -
      ${(props) => (props.$isMobile ? "4rem" : "6rem")}
  );
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  color: var(--color-text-tertiary);
  z-index: 10;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-text-inverted);
    transform: rotate(90deg);
  }

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

{
  /* <Modal>
  <Modal.Open opensWindowName="window1"></Modal.Open>
  <Modal.Window name="window1"></Modal.Window>
</Modal> */
}
