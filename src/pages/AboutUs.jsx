import { Code, Zap, Users, GitBranch, Globe, Heart, ArrowRight } from "lucide-react";
import styled from "styled-components";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "Nnodimele Udodirim",
    role: "Founder & CEO",
    bio: "Full-stack developer with a passion for developer tools",
    funFact: "Can solve a Rubik's cube in under 2 minutes",
    image: "/images/udodirim.jpg",
  },
  {
    name: "ChatGPT",
    role: "AI Assistant",
    bio: "Crafts sleek, intuitive UIs and explains code like your favorite dev friend.",
    funFact: "Wrote over 1 billion lines of code—without coffee.",
    image: "/images/chatgpt-icon.svg",
  },
  {
    name: "DeepSeek Chat",
    role: "AI Code Assistant",
    bio: "Specializes in breaking down complex problems into elegant React components and clean JavaScript.",
    funFact:
      "Can refactor an entire codebase while you finish your morning coffee.",
    image: "/images/deepseek-logo-icon.svg",
  },
];

const stats = [
  { value: "10,000+", label: "Videos Created", icon: <Code /> },
  { value: "98%", label: "Satisfaction Rate", icon: <Heart /> },
  { value: "50+", label: "Countries", icon: <Globe /> },
  { value: "24/7", label: "Support", icon: <Zap /> },
];

const codeLine = `
// Our mission
function shareKnowledge() {
  const mission = {
    purpose: "Empower developers to build the future of the web.",
    accessible: true,
    beautiful: true,
  };

  makeAnimations(mission);

  return "CodeToVideo is the future of code animations!";
}
`;
const AboutPage = () => {
  return (
    <AboutContainer>
      <HeroSection>
        <HeroContent>
          <SectionBadge>Our Story</SectionBadge>
          <HeroTitle>
            Transforming Code into <GradientText>Visual Stories</GradientText>
          </HeroTitle>
          <HeroText>
            CodeToVideo was born from a simple idea: developers deserve better
            tools to share their work. What started as a side project is now
            helping thousands create stunning code animations daily.
          </HeroText>
        </HeroContent>
        <HeroGraphic>
          <AnimatedCodePreview>
            <CodeMirrorWrapper>
              <CodeMirror
                value={codeLine}
                height="auto"
                extensions={[javascript()]}
                theme="dark"
                style={{
                  fontSize: "16px",
                  height: "auto",
                  overflow: "hidden",
                }}
                editable={false}
                basicSetup={{
                  lineNumbers: false,
                  highlightActiveLine: false,
                  foldGutter: false,
                }}
              />
            </CodeMirrorWrapper>
            <CodeCursor />
          </AnimatedCodePreview>
        </HeroGraphic>
      </HeroSection>

      <Section>
        <SectionTitle>Why We Exist</SectionTitle>
        <MissionGrid>
          <MissionCard>
            <MissionIcon>
              <Zap />
            </MissionIcon>
            <MissionTitle>Democratize Creation</MissionTitle>
            <MissionText>
              We believe anyone should be able to create professional code
              animations, regardless of design skills.
            </MissionText>
          </MissionCard>
          <MissionCard>
            <MissionIcon>
              <GitBranch />
            </MissionIcon>
            <MissionTitle>Developer First</MissionTitle>
            <MissionText>
              Built by developers for developers, with the tools and workflows
              you already know.
            </MissionText>
          </MissionCard>
          <MissionCard>
            <MissionIcon>
              <Users />
            </MissionIcon>
            <MissionTitle>Community Focused</MissionTitle>
            <MissionText>
              Our features are driven by what our community actually needs, not
              vanity metrics.
            </MissionText>
          </MissionCard>
        </MissionGrid>
      </Section>

      <StatsSection>
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard key={index}>
              <StatIcon>{stat.icon}</StatIcon>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>
      </StatsSection>

      <Section>
        <SectionTitle>Meet The Team</SectionTitle>
        <TeamGrid>
          {teamMembers.map((member, index) => (
            <TeamCard key={index}>
              <TeamImage>
                <img src={member.image} alt={member.name} />
              </TeamImage>
              <TeamName>{member.name}</TeamName>
              <TeamRole>{member.role}</TeamRole>
              <TeamBio>{member.bio}</TeamBio>
              <TeamFunFact>
                <small>Fun fact: {member.funFact}</small>
              </TeamFunFact>
            </TeamCard>
          ))}
        </TeamGrid>
      </Section>

      <CTASection>
        <CTATitle>Ready to animate your code?</CTATitle>
        <CTAButton>
          <Link to="/signin">
            Get Started for Free <ArrowRight size={18} />
          </Link>
        </CTAButton>
      </CTASection>
    </AboutContainer>
  );
};

export default AboutPage;

// Styled Components
const AboutContainer = styled.div`
  color: var(--color-text-primary);
  font-family: var(--font-family);
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-20) var(--space-6);
`;

const HeroSection = styled(Section)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12);
  align-items: center;
  padding-top: var(--space-24);

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    padding-top: var(--space-16);
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  min-width: 400px;

  @media screen and (max-width: 600px) {
    min-width: 0;
  }
`;

const SectionBadge = styled.span`
  display: inline-block;
  background: rgba(138, 110, 255, 0.2);
  color: var(--color-primary);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: 600;
  margin-bottom: var(--space-4);
  align-self: flex-start;
`;

const HeroTitle = styled.h1`
  font-size: var(--font-size-4xl);
  font-weight: 800;
  line-height: 1.2;
  margin: 0 0 var(--space-6) 0;

  @media screen and (max-width: 768px) {
    font-size: var(--font-size-3xl);
  }
`;

const GradientText = styled.span`
  background: linear-gradient(
    90deg,
    var(--color-primary),
    var(--color-secondary)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const HeroText = styled.p`
  font-size: var(--font-size-xl);
  line-height: 1.6;
  color: var(--color-text-secondary);
  margin: 0;
`;

const HeroGraphic = styled.div`
  position: relative;
`;

const AnimatedCodePreview = styled.div`
  width: 100%;
  position: relative;
  background: var(--color-surface-alt);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  font-family: var(--font-mono);
  font-size: var(--font-size-lg);
  line-height: 1.8;
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--color-border);
  overflow-x: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;

  @media screen and (max-width: 768px) {
    max-width: 90dvw;
    padding: var(--space-4);
  }
`;

const CodeMirrorWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  overflow: auto;
`;

const CodeCursor = styled.div`
  position: absolute;
  bottom: 59px;
  left: 50px;
  display: inline-block;
  width: 4px;
  height: 18px;
  background: var(--color-primary);
  vertical-align: middle;
  margin-left: 4px;
  animation: blink 1s step-end infinite;

  @keyframes blink {
    from,
    to {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }

  @media screen and (max-width: 768px) {
    bottom: 44px;
    left: 40px;
    height: 16px;
  }
`;

const SectionTitle = styled.h2`
  font-size: var(--font-size-3xl);
  text-align: center;
  margin: 0 auto var(--space-12);
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 4px;
    background: linear-gradient(
      90deg,
      var(--color-primary),
      var(--color-secondary)
    );
    border-radius: var(--radius-full);
  }
`;

const MissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-8);
`;

const MissionCard = styled.div`
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  border: 1px solid var(--color-border);
  transition:
    transform var(--transition-base),
    box-shadow var(--transition-base);

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
`;

const MissionIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  background: rgba(138, 110, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  margin-bottom: var(--space-4);
`;

const MissionTitle = styled.h3`
  font-size: var(--font-size-xl);
  margin: 0 0 var(--space-3) 0;
`;

const MissionText = styled.p`
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
`;

const StatsSection = styled(Section)`
  background: linear-gradient(
    135deg,
    var(--color-surface-alt) 0%,
    var(--color-surface) 100%
  );
  border-radius: var(--radius-xl);
  margin: var(--space-20) auto;
  padding: var(--space-12) var(--space-6);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: var(--space-8);
  max-width: 800px;
  margin: 0 auto;
`;

const StatCard = styled.div`
  text-align: center;
`;

const StatIcon = styled.div`
  color: var(--color-primary);
  margin: 0 auto var(--space-3);
`;

const StatValue = styled.div`
  font-size: var(--font-size-3xl);
  font-weight: 800;
  margin-bottom: var(--space-2);
`;

const StatLabel = styled.div`
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(365px, 1fr));
  gap: var(--space-8);
`;

const TeamCard = styled.div`
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  text-align: center;
  border: 1px solid var(--color-border);
  transition: transform var(--transition-base);

  &:hover {
    transform: translateY(-5px);
  }
`;

const TeamImage = styled.div`
  width: 120px;
  height: 120px;
  overflow: hidden;
  border-radius: var(--radius-full);
  background: var(--color-surface-alt);
  margin: 0 auto var(--space-4);
  border: 3px solid var(--color-primary);

  img {
    width: 100%;
    height: 100%;
    border-radius: var(--radius-full);
    object-fit: cover;
  }
`;

const TeamName = styled.h3`
  font-size: var(--font-size-xl);
  margin: 0 0 var(--space-1) 0;
`;

const TeamRole = styled.div`
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  font-weight: 600;
  margin-bottom: var(--space-4);
`;

const TeamBio = styled.p`
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0 0 var(--space-4) 0;
`;

const TeamFunFact = styled.div`
  color: var(--color-text-tertiary);
  font-style: italic;
`;

const CTASection = styled(Section)`
  text-align: center;
  padding: var(--space-20) var(--space-6);
  background: linear-gradient(
    135deg,
    var(--color-surface-alt) 0%,
    var(--color-surface) 100%
  );
  border-radius: var(--radius-xl);
  margin: var(--space-20) auto;
`;

const CTATitle = styled.h2`
  font-size: var(--font-size-3xl);
  margin: 0 auto var(--space-6);
  max-width: 600px;
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


