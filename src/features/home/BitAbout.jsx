import styled from "styled-components";

const BitAbout = () => {
  return (
    <Section>
      <AboutContent>
        <AboutText>
          <SectionTitle>Built for Developers</SectionTitle>
          <p>
            CodeToVideo was created to solve a simple problem: developers need
            better ways to share their code visually. Whether you're creating
            tutorial content, documenting a library, or just want to showcase
            your work, we make it effortless.
          </p>
          <p>
            Our tool understands your code's structure and creates professional
            animations that highlight what matters most.
          </p>
        </AboutText>
        <AboutVisual>
          <CodeVisual>
            {/* This would be an animated code preview in reality */}
            <Line>1 // Animate this function</Line>
            <Line>2 function greet() {"{"}</Line>
            <Line>3 return "Hello World!"</Line>
            <Line>4 {"}"}</Line>
            <Cursor />
          </CodeVisual>
        </AboutVisual>
      </AboutContent>
    </Section>
  );
};

export default BitAbout;

const Section = styled.section`
  padding: 80px 20px;
  background:#121a2a;
  position: relative;
`;


const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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

const AboutText = styled.div`
  p {
    line-height: 1.8;
    margin-bottom: 20px;
    opacity: 0.9;
  }
`;

const AboutVisual = styled.div`
  position: relative;
`;

const CodeVisual = styled.div`
  background: #0a0e17;
  border-radius: 12px;
  padding: 30px;
  font-family: "Fira Code", monospace;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const Line = styled.div`
  font-size: 16px;
  line-height: 1.8;
  color: #e0e0e0;
`;

const Cursor = styled.div`
  display: inline-block;
  width: 8px;
  height: 20px;
  background: #6e45e2;
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
`;
