import { useState, useEffect } from "react";
import { Code, Github, Twitter, Linkedin, Menu, X } from "lucide-react";
import styled from "styled-components";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useOutsideClick(() => setMobileMenuOpen(false));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navSignIn = (e) => {
    e.preventDefault();
    navigate("/signin");
  };
  const navSignUp = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <HeaderContainer scrolled={scrolled}>
      <HeaderContent>
        <Logo>
          <Link to="/">
            <Code size={28} />
            <span>CodeToVideo</span>
          </Link>
        </Logo>

        <NavLinks>
          <NavLink to="#features">Features</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="#pricing">Pricing</NavLink>
          <NavLink to="#docs">Docs</NavLink>
        </NavLinks>

        <AuthButtons>
          <LoginButton onClick={navSignIn}>Log in</LoginButton>
          <SignUpButton onClick={navSignUp}>Sign up free</SignUpButton>
        </AuthButtons>

        <MobileMenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </MobileMenuButton>
      </HeaderContent>

      <MobileMenu ref={ref} open={mobileMenuOpen}>
        <NavLink to="#features">Features</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="#pricing">Pricing</NavLink>
        <NavLink to="#docs">Docs</NavLink>
        <MobileAuthButtons>
          <MobileLoginButton>Log in</MobileLoginButton>
          <MobileSignUpButton>Sign up free</MobileSignUpButton>
        </MobileAuthButtons>
      </MobileMenu>
    </HeaderContainer>
  );
};

// Styled Components
const HeaderContainer = styled.header.attrs((props) => ({
  "data-scrolled": props.scrolled, // Use a data attribute instead
}))`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${(props) =>
    props.scrolled ? "rgba(18, 26, 42, 0.95)" : "transparent"};
  backdrop-filter: ${(props) => (props.scrolled ? "blur(10px)" : "none")};
  box-shadow: ${(props) =>
    props.scrolled ? "0 4px 20px rgba(0, 0, 0, 0.1)" : "none"};
  transition: all 0.3s ease;
  border-bottom: ${(props) =>
    props.scrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "none"};
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  a {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.25rem;
    font-weight: 700;
    color: white;
    text-decoration: none;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.05);
    }

    svg {
      color: #8a6eff;
    }
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }

  a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
    position: relative;

    &:hover {
      color: white;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #6e45e2, #88d3ce);
      transition: width 0.3s;
    }

    &:hover::after {
      width: 100%;
    }
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
`;

const LoginButton = styled(Button)`
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.8);

  &:hover {
    color: white;
  }
`;

const SignUpButton = styled(Button)`
  background: linear-gradient(135deg, #6e45e2 0%, #88d3ce 100%);
  color: white;
  border: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(110, 69, 226, 0.4);
  }
`;

const MobileMenuButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: ${(props) => (props.open ? "flex" : "none")};
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 2rem;
  background: rgba(13, 19, 33, 0.98);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    font-weight: 500;
    padding: 0.75rem 0;
    transition: color 0.2s;

    &:hover {
      color: white;
    }
  }
`;

const MobileAuthButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const MobileLoginButton = styled(Button)`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  flex: 1;
`;

const MobileSignUpButton = styled(Button)`
  background: linear-gradient(135deg, #6e45e2 0%, #88d3ce 100%);
  color: white;
  border: none;
  flex: 1;
`;

export default Header;
