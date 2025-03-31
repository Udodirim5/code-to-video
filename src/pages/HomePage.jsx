import styled from "styled-components";
import { ArrowRight } from "lucide-react";
import Hero from "../features/home/Hero";
import Features from "../features/home/Features";
import BitAbout from "../features/home/BitAbout";
import PricingAtHome from "../features/home/PricingAtHome";

const Homepage = () => {

  return (
    <Container>
      <Hero />
      <Features />
      <BitAbout />
      <PricingAtHome />

      {/* Footer CTA */}
      <CTASection>
        <CTATitle>Ready to animate your code?</CTATitle>
        <CTAButton >
          Get Started - It's Free <ArrowRight size={18} />
        </CTAButton>
      </CTASection>
    </Container>
  );
};

export default Homepage;

// Styled Components
const Container = styled.div`
  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  color: #e0e0e0;
`;

const Section = styled.section`
  padding: 80px 20px;
  background: #0d1321;
  position: relative;
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, #6e45e2 0%, #88d3ce 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(110, 69, 226, 0.4);
  }
`;

const CTASection = styled(Section)`
  text-align: center;
  padding: 100px 20px;
  background: linear-gradient(135deg, #121a2a 0%, #0d1321 100%);
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin: 0 auto 40px;
  max-width: 600px;
  line-height: 1.3;
`;
