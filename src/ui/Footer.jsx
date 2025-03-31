import { Code, Github, Twitter, Linkedin, Menu, X } from "lucide-react";
import styled from "styled-components";


const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterLogo href="/">
            <Code size={24} />
            <span>CodeToVideo</span>
          </FooterLogo>
          <FooterText>
            Transform your code into beautiful, shareable videos with just a few
            clicks.
          </FooterText>
          <SocialLinks>
            <SocialLink href="https://github.com" target="_blank">
              <Github size={18} />
            </SocialLink>
            <SocialLink href="https://twitter.com" target="_blank">
              <Twitter size={18} />
            </SocialLink>
            <SocialLink href="https://linkedin.com" target="_blank">
              <Linkedin size={18} />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Product</FooterTitle>
          <FooterLink href="#features">Features</FooterLink>
          <FooterLink href="#pricing">Pricing</FooterLink>
          <FooterLink href="#docs">Documentation</FooterLink>
          <FooterLink href="#changelog">Changelog</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Company</FooterTitle>
          <FooterLink href="#about">About</FooterLink>
          <FooterLink href="#blog">Blog</FooterLink>
          <FooterLink href="#careers">Careers</FooterLink>
          <FooterLink href="#contact">Contact</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Legal</FooterTitle>
          <FooterLink href="#privacy">Privacy</FooterLink>
          <FooterLink href="#terms">Terms</FooterLink>
          <FooterLink href="#cookies">Cookies</FooterLink>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <Copyright>
          © {new Date().getFullYear()} CodeToVideo. All rights reserved.
        </Copyright>
      </FooterBottom>
    </FooterContainer>
  );
};


const FooterContainer = styled.footer`
  background: #0d1321;
  color: rgba(255, 255, 255, 0.8);
  padding: 4rem 0 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterLogo = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  margin-bottom: 1rem;

  svg {
    color: #8a6eff;
  }
`;

const FooterText = styled.p`
  line-height: 1.6;
  font-size: 0.9rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.2s;

  &:hover {
    color: white;
  }
`;

const FooterTitle = styled.h3`
  color: white;
  font-size: 1rem;
  margin: 0 0 1rem;
`;

const FooterLink = styled.a`
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;

  &:hover {
    color: white;
  }
`;

const FooterBottom = styled.div`
  margin-top: 4rem;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Copyright = styled.p`
  text-align: center;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
`;

export default Footer;
