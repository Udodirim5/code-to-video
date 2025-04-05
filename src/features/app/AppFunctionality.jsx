import { useState } from "react";
import { AnimationControls } from "./AnimationControls";
import { AnimationPreview } from "./AnimationPreview";
import { useAnimationLogic } from "./AnimationLogic";
import { Container, StyledApp } from "./SharedComponents";
import { CodeEditorPanel } from "./CodeEditorPanel";
import styled from "styled-components";

const defaultSettings = {
  resolution: "1080p",
  width: 800,
  height: 400,
  backgroundColor: "#121a2a",
  textColor: "#ffffff",
  fontFamily: "Fira",
  fontSize: 16,
  typingSpeed: 3,
  frameRate: 30,
  duration: 10,
  playbackSpeed: 1,
  outputFormat: "MP4",
  compressionQuality: "High",
  frameByFrame: false,
  syntaxTheme: "Dracula",
  lineNumbers: true,
  backgroundMusic: false,
  typingSounds: true,
  soundSync: true,
  watermark: true,
  branding: "CodeToVideo",
};

const AppFunctionality = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [code, setCode] = useState(
    `// Welcome to CodeAnim\nfunction helloWorld() {\n  console.log('Hello, World!');\n  return "Animation complete!";\n}`
  );

  const {
    typedCode,
    isAnimating,
    showCursor,
    canvasRef,
    startAnimation,
    downloadRecording,
  } = useAnimationLogic(settings, code);

  const emptyCode = () => {
    setCode("");
  };

  return (
    <StyledApp>
      <Container>
        <CodeEditorPanel
          code={code}
          setCode={setCode}
          isAnimating={isAnimating}
          emptyCode={emptyCode}
        />

        <AnimationPanel>
          <AnimationControls
            isAnimating={isAnimating}
            startAnimation={startAnimation}
            downloadRecording={downloadRecording}
            settings={settings}
            setSettings={setSettings}
          />

          <canvas
            ref={canvasRef}
            style={{
              display: "none",
              position: "absolute",
            }}
          />

          <AnimationPreview
            typedCode={typedCode}
            showCursor={showCursor}
            isAnimating={isAnimating}
          />
        </AnimationPanel>
      </Container>
    </StyledApp>
  );
};

export default AppFunctionality;

const AnimationPanel = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  overflow: auto;
  background: #121a2a;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  height: 100%;
  max-height: 46vh;
  min-height: 40vh;

`;