import { Check, Code, Zap } from "lucide-react"
import styled from "styled-components";

const Features = () => {
  return (
    <Section >
    <SectionTitle>Why Developers Love Us</SectionTitle>
    <FeaturesGrid>
      <FeatureCard>
        <FeatureIcon><Code size={32} /></FeatureIcon>
        <FeatureTitle>Real-time Preview</FeatureTitle>
        <FeatureText>
          See your animation as you build it with instant preview updates.
        </FeatureText>
      </FeatureCard>

      <FeatureCard>
        <FeatureIcon><Zap size={32} /></FeatureIcon>
        <FeatureTitle>Lightning Fast</FeatureTitle>
        <FeatureText>
          Export HD videos in seconds with our optimized rendering engine.
        </FeatureText>
      </FeatureCard>

      <FeatureCard>
        <FeatureIcon><Check size={32} /></FeatureIcon>
        <FeatureTitle>Zero Config</FeatureTitle>
        <FeatureText>
          Beautiful themes and animations out of the box. Just write code.
        </FeatureText>
      </FeatureCard>
    </FeaturesGrid>
  </Section>
)
}

export default Features

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

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 40px 30px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`;

const FeatureIcon = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(110, 69, 226, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: #8a6eff;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 12px;
`;

const FeatureText = styled.p`
  opacity: 0.8;
  line-height: 1.6;
  margin: 0;
`;