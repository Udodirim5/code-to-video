import { useState } from "react";
import styled from "styled-components";

const PricingAtHome = () => {
  const [activeTab, setActiveTab] = useState("monthly");

  return (
    <Section isActive={true}>
      <SectionTitle>Simple, Transparent Pricing</SectionTitle>
      <PricingToggle>
        <ToggleButton
          active={activeTab === "monthly"}
          onClick={() => setActiveTab("monthly")}
        >
          Monthly
        </ToggleButton>
        <ToggleButton
          active={activeTab === "yearly"}
          onClick={() => setActiveTab("yearly")}
        >
          Yearly (2 months free)
        </ToggleButton>
      </PricingToggle>

      <PricingGrid>
        <PricingCard>
          <PricingTitle>Starter</PricingTitle>
          <PricingPrice>
            ${activeTab === "monthly" ? "9" : "90"}
            <small>/mo</small>
          </PricingPrice>
          <PricingFeatures>
            <li>10 video exports/month</li>
            <li>720p resolution</li>
            <li>Basic themes</li>
          </PricingFeatures>
          <PricingButton>Get Started</PricingButton>
        </PricingCard>

        <PricingCard featured={true}>
          <PopularBadge>Most Popular</PopularBadge>
          <PricingTitle>Pro</PricingTitle>
          <PricingPrice>
            ${activeTab === "monthly" ? "19" : "190"}
            <small>/mo</small>
          </PricingPrice>
          <PricingFeatures>
            <li>50 video exports/month</li>
            <li>1080p resolution</li>
            <li>Premium themes</li>
            <li>Custom branding</li>
          </PricingFeatures>
          <PricingButton featured>Try 7 Days Free</PricingButton>
        </PricingCard>

        <PricingCard>
          <PricingTitle>Team</PricingTitle>
          <PricingPrice>
            ${activeTab === "monthly" ? "49" : "490"}
            <small>/mo</small>
          </PricingPrice>
          <PricingFeatures>
            <li>Unlimited exports</li>
            <li>4K resolution</li>
            <li>All premium features</li>
            <li>Team collaboration</li>
          </PricingFeatures>
          <PricingButton>Contact Sales</PricingButton>
        </PricingCard>
      </PricingGrid>
    </Section>
  );
};

export default PricingAtHome;

const Section = styled.section`
  padding: 80px 20px;
  background: #0d1321;
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin: 0 auto 60px;
  background: linear-gradient(90deg, #ffffff, #b5b5b5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  max-width: 800px;
  line-height: 1.2;
`;

const PricingToggle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  padding: 6px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

const ToggleButton = styled.button`
  background: ${(props) =>
    props.active ? "rgba(110, 69, 226, 0.5)" : "transparent"};
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  flex: 1;
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PricingCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 40px 30px;
  position: relative;
  transition: transform 0.3s;
  border: 1px solid
    ${(props) =>
      props.featured ? "rgba(110, 69, 226, 0.5)" : "rgba(255, 255, 255, 0.1)"};

  ${(props) =>
    props.featured &&
    `
    transform: scale(1.05);
    background: rgba(110, 69, 226, 0.1);
  `}

  &:hover {
    transform: ${(props) => (props.featured ? "scale(1.08)" : "scale(1.03)")};
  }
`;

const PopularBadge = styled.div`
  position: absolute;
  top: -12px;
  right: 20px;
  background: #6e45e2;
  color: white;
  padding: 4px 12px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 600;
`;

const PricingTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 20px;
  color: #8a6eff;
`;

const PricingPrice = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 20px;
  color: white;

  small {
    font-size: 1rem;
    opacity: 0.6;
  }
`;

const PricingFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 30px;

  li {
    padding: 8px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    opacity: 0.9;
  }
`;

const PricingButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow:none;
  }
`;
