import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView } from "@codemirror/view";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { Download, Play } from "lucide-react";

const App = () => {
  const [code, setCode] = useState(
    `// Welcome to CodeAnim\nfunction helloWorld() {\n  console.log('Hello, World!');\n  return "Animation complete!";\n}`
  );
  const [typedCode, setTypedCode] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  const startAnimation = () => {
    setIsAnimating(true);
    setTypedCode("");
    recordedChunksRef.current = [];

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 400;

    const stream = canvas.captureStream();
    mediaRecorderRef.current = new MediaRecorder(stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.ondataavailable = (event) =>
      recordedChunksRef.current.push(event.data);
    mediaRecorderRef.current.start();

    let i = 0;
    animationRef.current = setInterval(() => {
      if (i <= code.length) {
        setTypedCode(code.slice(0, i));
        renderFrame(ctx, code.slice(0, i));
        i++;
      } else {
        clearInterval(animationRef.current);
        setIsAnimating(false);
        mediaRecorderRef.current.stop();
      }
    }, 100);
  };

  const renderFrame = (ctx, text) => {
    ctx.fillStyle = "#0a0e17";
    ctx.fillRect(0, 0, 800, 400);
    ctx.font = "20px Fira Code";
    ctx.fillStyle = "#ffffff";

    const lines = text.split("\n");
    const maxLines = Math.floor(360 / 24); // Max lines that fit in canvas
    const start = Math.max(0, lines.length - maxLines);
    const visibleLines = lines.slice(start);

    visibleLines.forEach((line, index) => {
      ctx.fillText(line, 20, 50 + index * 24);
    });
  };

  const downloadRecording = () => {
    const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "animation.webm";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <StyledApp>
      <Container>
        <CodePanel>
          <h2>Code Editor</h2>
          <CodeMirror
            value={code}
            onChange={setCode}
            extensions={[javascript(), EditorView.lineWrapping]}
            theme={dracula}
            height="100%"
          />
        </CodePanel>

        <AnimationPanel>
          <h2>Preview</h2>
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          <CodeMirror
            value={typedCode}
            extensions={[javascript(), EditorView.lineWrapping]}
            theme={dracula}
            readOnly
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <IconButton
              onClick={startAnimation}
              disabled={isAnimating}
              title="Start Animation"
            >
              <Play color="white" size={24} />
            </IconButton>
            <IconButton
              onClick={downloadRecording}
              title="Download Recording"
            >
              <Download color="white" size={24} />
            </IconButton>
          </div>
        </AnimationPanel>
      </Container>
    </StyledApp>
  );
};

export default App;

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
  background: #0a0e17;
  color: #e0e0e0;
  font-family: "Fira Code", monospace;
  overflow: hidden;
  width: 100dvw;
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  gap: 20px;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Panel = styled.div`
  background: #121a2a;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CodePanel = styled(Panel)`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  overflow: auto;
`;

const AnimationPanel = styled(Panel)`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  overflow: auto;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
