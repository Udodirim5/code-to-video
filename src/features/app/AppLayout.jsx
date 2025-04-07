import styled from "styled-components";
import Header from "../../ui/Header";
import AppFunctionality from "./AppFunctionality";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
};

export default AppLayout;

const Main = styled.div`
  padding-top: 4rem;
`