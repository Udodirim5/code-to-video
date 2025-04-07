import { ArrowRight, Play } from "lucide-react";
import styled from "styled-components";
import Modal from "../../ui/Modal";
import DemoVideo from "./DemoVideo";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <HeroSection>
      <HeroContent>
        <Badge>🚀 Coming Soon</Badge>
        <HeroTitle>Transform Code into Stunning Videos</HeroTitle>
        <HeroSubtitle>
          Animate your code snippets effortlessly and create shareable videos
          for tutorials, demos, and social media.
        </HeroSubtitle>
        <CTAButton>
          <Link to="/dashboard">
            Try It Free <ArrowRight size={18} />
          </Link>
        </CTAButton>
        <DemoPreview>
          <Modal>
            <Modal.Open opensWindowName="demoVideo">
              <PlayCircle>
                <Play size={48} fill="white" color="white" />
              </PlayCircle>
            </Modal.Open>

            <Modal.Window name="demoVideo">
              <DemoVideo videoSrc="https://videos.pexels.com/video-files/6548176/6548176-hd_1920_1080_24fps.mp4" />
            </Modal.Window>
          </Modal>
          <DemoLabel>See how it works</DemoLabel>
        </DemoPreview>
      </HeroContent>
      <HeroGradient />
    </HeroSection>
  );
};

export default Hero;

const HeroSection = styled.section`
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 10rem 2rem 2rem;
  background: linear-gradient(135deg, #121a2a 0%, #0d1321 100%);
`;

const HeroContent = styled.div`
  max-width: 800px;
  text-align: center;
  position: relative;
  z-index: 2;
  padding: 40px 0;
`;

const HeroGradient = styled.div`
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at center,
    rgba(110, 69, 226, 0.15) 0%,
    transparent 70%
  );
  z-index: 1;
`;

const Badge = styled.span`
  display: inline-block;
  background: rgba(110, 69, 226, 0.2);
  color: #8a6eff;
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0 0 20px;
  background: linear-gradient(90deg, #ffffff, #b5b5b5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;

  @media screen and (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  opacity: 0.9;
  max-width: 700px;
  margin: 0 auto 40px;
`;

const CTAButton = styled.div`
  a {
    background: linear-gradient(135deg, #6e45e2 0%, #88d3ce 100%);
    color: white;
    border: none;
    padding: 12px 24px;
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
  }
`;

const DemoPreview = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const PlayCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const DemoLabel = styled.span`
  font-size: 14px;
  opacity: 0.8;
`;
