import styled from "styled-components";
import Header from "../../ui/Header";
import AppFunctionality from "./AppFunctionality";

const AppLayout = () => {
  return (
    <>
      <Header />
      <Main>
        <AppFunctionality />
      </Main>
    </>
  );
};

export default AppLayout;

const Main = styled.div`
  padding-top: 4rem;
`