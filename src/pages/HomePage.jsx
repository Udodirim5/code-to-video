import styled from "styled-components";
import { ArrowRight } from "lucide-react";
import Hero from "../features/home/Hero";
import Features from "../features/home/Features";
import BitAbout from "../features/home/BitAbout";
import PricingAtHome from "../features/home/PricingAtHome";
import { Link } from "react-router-dom";

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
        <CTAButton>
          <Link to="/signin">
            Get Started - It's Free <ArrowRight size={18} />
          </Link>
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

const CTAButton = styled.div`
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-secondary) 100%
  );
  color: white;
  border: none;
  padding: var(--space-4) var(--space-8);
  border-radius: var(--radius-lg);
  font-weight: 600;
  font-size: var(--font-size-lg);
  cursor: pointer;
  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(138, 110, 255, 0.4);
  }

  a {
    color: inherit;
    text-decoration: none;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
  }
`;
