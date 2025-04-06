import { useState } from "react";
import {
  Rocket,
  Code,
  Settings,
  Film,
  AlertTriangle,
  HelpCircle,
  Zap,
  Volume2,
  Clock,
  GitBranch,
} from "lucide-react";
import styled from "styled-components";

const DocumentationPage = () => {
  const [activeTab, setActiveTab] = useState("quickstart");

  return (
    <DocsContainer>
      <DocsHeader>
        <h1>
          <Code size={32} />
          <span>CodeToVideo</span> Documentation
        </h1>
        <p>
          Transform your code into shareable animated videos with our React
          library
        </p>
      </DocsHeader>

      <DocsLayout>
        <Sidebar>
          <NavGroup>
            <NavHeader>
              <Rocket size={18} />
              <span>Getting Started</span>
            </NavHeader>
            <NavItem
              active={activeTab === "quickstart"}
              onClick={() => setActiveTab("quickstart")}
            >
              Quick Start Guide
            </NavItem>
            <NavItem
              active={activeTab === "howitworks"}
              onClick={() => setActiveTab("howitworks")}
            >
              How It Works
            </NavItem>
          </NavGroup>

          <NavGroup>
            <NavHeader>
              <Settings size={18} />
              <span>Customization</span>
            </NavHeader>
            <NavItem
              active={activeTab === "theming"}
              onClick={() => setActiveTab("theming")}
            >
              Themes & Styling
            </NavItem>
            <NavItem
              active={activeTab === "animation"}
              onClick={() => setActiveTab("animation")}
            >
              Animation Controls
            </NavItem>
          </NavGroup>

          <NavGroup>
            <NavHeader>
              <Film size={18} />
              <span>Export</span>
            </NavHeader>
            <NavItem
              active={activeTab === "formats"}
              onClick={() => setActiveTab("formats")}
            >
              Video Formats
            </NavItem>
            <NavItem
              active={activeTab === "rendering"}
              onClick={() => setActiveTab("rendering")}
            >
              Rendering Options
            </NavItem>
          </NavGroup>

          <NavGroup>
            <NavHeader>
              <AlertTriangle size={18} />
              <span>Troubleshooting</span>
            </NavHeader>
            <NavItem
              active={activeTab === "commonissues"}
              onClick={() => setActiveTab("commonissues")}
            >
              Common Issues
            </NavItem>
            <NavItem
              active={activeTab === "faq"}
              onClick={() => setActiveTab("faq")}
            >
              FAQ
            </NavItem>
          </NavGroup>
        </Sidebar>

        <ContentArea>
          {activeTab === "quickstart" && (
            <Section>
              <h2>
                <Zap size={24} /> Quick Start
              </h2>
              <Installation>
                <h3>Installation</h3>
                <CodeBlock>npm install codetovideo</CodeBlock>
                <p>or</p>
                <CodeBlock>yarn add codetovideo</CodeBlock>
              </Installation>

              <BasicUsage>
                <h3>Basic Usage</h3>
                <CodeBlock language="jsx">
                  {`import { CodeToVideo } from 'codetovideo';

function App() {
  return (
    <CodeToVideo 
      code={\`const greet = () => console.log("Hello World!")\`}
      language="javascript"
    />
  );
}`}
                </CodeBlock>
              </BasicUsage>

              <ExportExample>
                <h3>Exporting Your Video</h3>
                <CodeBlock language="js">
                  {`// Using the exported function
await exportToMP4({ 
  filename: "demo.mp4",
  quality: "high" 
});`}
                </CodeBlock>
              </ExportExample>
            </Section>
          )}

          {activeTab === "howitworks" && (
            <Section>
              <h2>
                <GitBranch size={24} /> How It Works
              </h2>

              <FeatureCard>
                <h3>
                  <Code size={18} /> Syntax Highlighting
                </h3>
                <p>Powered by CodeMirror with support for:</p>
                <FeatureList>
                  <li>20+ programming languages</li>
                  <li>Custom theme support</li>
                  <li>Line number toggling</li>
                </FeatureList>
              </FeatureCard>

              <FeatureCard>
                <h3>
                  <Clock size={18} /> Typing Animation
                </h3>
                <p>Configurable animation parameters:</p>
                <FeatureList>
                  <li>Character-by-character or line-by-line</li>
                  <li>Adjustable speed (10-500ms per character)</li>
                  <li>Cursor blink customization</li>
                </FeatureList>
              </FeatureCard>

              <FeatureCard>
                <h3>
                  <Film size={18} /> Rendering Engine
                </h3>
                <p>Client-side video generation using:</p>
                <FeatureList>
                  <li>FFmpeg.wasm for browser-based processing</li>
                  <li>Canvas API for frame composition</li>
                  <li>Web Workers for background processing</li>
                </FeatureList>
              </FeatureCard>
            </Section>
          )}

          {/* Additional sections would be added here */}

          {activeTab === "faq" && (
            <Section>
              <h2>
                <HelpCircle size={24} /> Frequently Asked Questions
              </h2>

              <FAQItem>
                <h3>Is this React-specific?</h3>
                <p>
                  Currently yes, but we're working on a framework-agnostic core
                  library.
                </p>
              </FAQItem>

              <FAQItem>
                <h3>When will audio support be added?</h3>
                <p>
                  Audio layers (voiceover/sound effects) are planned for v0.3.0.
                </p>
              </FAQItem>

              <FAQItem>
                <h3>Can I use custom fonts?</h3>
                <p>Yes! Pass any valid CSS font-family to the component.</p>
              </FAQItem>
            </Section>
          )}
        </ContentArea>
      </DocsLayout>

      <VersionNotice>
        <p>
          Documentation for CodeToVideo v0.1.0 | Last updated:{" "}
          {new Date().toLocaleDateString()}
        </p>
      </VersionNotice>
    </DocsContainer>
  );
};

export default DocumentationPage;

// Styled Components
const DocsContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--color-background);
  color: var(--color-text-primary);
  font-family: var(--font-family);
  
`;

const DocsHeader = styled.header`
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-20) var(--space-6) var(--space-4) ;
  text-align: center;

  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-3);
    font-size: var(--font-size-3xl);
    margin: 0 0 var(--space-2) 0;

    svg {
      color: var(--color-primary);
    }
    
    @media screen and (max-width: 768px) {
      h1 {
        font-size: var(--font-size-2xl);
      }
    }
  }

  p {
    color: var(--color-text-secondary);
    margin: 0;
    font-size: var(--font-size-lg);
  }
`;

const DocsLayout = styled.div`
  display: flex;
  flex: 1;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.nav`
  width: 280px;
  background: var(--color-surface-alt);
  border-right: 1px solid var(--color-border);
  padding: var(--space-6) 0;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--color-border);
  }
`;

const NavGroup = styled.div`
  margin-bottom: var(--space-6);
`;

const NavHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-6);
  color: var(--color-text-secondary);
  font-weight: 600;
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 0.5px;

  svg {
    opacity: 0.7;
  }
`;

const NavItem = styled.div`
  padding: var(--space-3) var(--space-6);
  cursor: pointer;
  transition: all var(--transition-base);
  border-left: 3px solid transparent;
  background: ${({ active }) =>
    active ? "var(--color-surface)" : "transparent"};
  color: ${({ active }) =>
    active ? "var(--color-primary)" : "var(--color-text-primary)"};
  font-weight: ${({ active }) => (active ? "600" : "400")};

  &:hover {
    background: var(--color-surface);
    border-left-color: var(--color-primary-light);
  }
`;

const ContentArea = styled.main`
  flex: 1;
  padding: var(--space-8) var(--space-10);
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: var(--space-6);
  }
`;

const Section = styled.section`
  margin-bottom: var(--space-8);

  h2 {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    font-size: var(--font-size-2xl);
    margin: 0 0 var(--space-6) 0;
    padding-bottom: var(--space-3);
    border-bottom: 1px solid var(--color-border);
  }
`;

const Installation = styled.div`
  margin-bottom: var(--space-6);
`;

const BasicUsage = styled.div`
  margin-bottom: var(--space-6);
`;

const ExportExample = styled.div`
  margin-bottom: var(--space-6);
`;


const CodeBlock = styled.pre`
  background: var(--color-surface-alt);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  font-family: var(--font-mono);
  font-size: var(--font-size-sm);
  overflow-x: auto;
  border: 1px solid var(--color-border);
  margin: var(--space-4) 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.6;
  
  @media screen and (max-width: 768px) {
    font-size: var(--font-size-xs);
    padding: var(--space-3);
  }
`;

const FeatureCard = styled.div`
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  margin-bottom: var(--space-4);
  border: 1px solid var(--color-border);
  transition: transform var(--transition-base);

  &:hover {
    transform: translateY(-2px);
  }

  h3 {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    font-size: var(--font-size-lg);
    margin: 0 0 var(--space-3) 0;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: var(--space-2);

  li {
    position: relative;
    padding-left: var(--space-4);
    color: var(--color-text-secondary);

    &::before {
      content: "•";
      position: absolute;
      left: 0;
      color: var(--color-primary);
    }
  }
`;

const FAQItem = styled.div`
  margin-bottom: var(--space-6);

  h3 {
    font-size: var(--font-size-lg);
    color: var(--color-primary);
    margin: 0 0 var(--space-2) 0;
  }

  p {
    color: var(--color-text-secondary);
    margin: 0;
    line-height: 1.6;
  }
`;

const VersionNotice = styled.footer`
  text-align: center;
  padding: var(--space-4);
  border-top: 1px solid var(--color-border);
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
`;
