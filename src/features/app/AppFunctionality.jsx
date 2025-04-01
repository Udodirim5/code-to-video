import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView } from "@codemirror/view";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { Download, Play, RotateCcw, Settings } from "lucide-react";
import Modal from "../../ui/Modal";
import VideoSettings from "./VideoSettings";

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
  typingSounds: false,
  soundSync: false,
  watermark: false,
  branding: "CodeToVideo",
};

const AppFunctionality = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [code, setCode] = useState(
    `// Welcome to CodeAnim\nfunction helloWorld() {\n  console.log('Hello, World!');\n  return "Animation complete!";\n}`
  );
  const [typedCode, setTypedCode] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Refs
  const animationRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  // Scroll to the bottom of output when code updates
  useEffect(() => {
    setTimeout(() => {
      const outputElement = document.getElementById("output");
      if (outputElement) {
        outputElement.scrollTop = outputElement.scrollHeight;
      }
    }, 0);
  }, [typedCode]);

  // Cursor Blinking Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);




  const startAnimation = () => {
    setIsAnimating(true);
    setTypedCode("");
    recordedChunksRef.current = [];

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = settings.width;   // 800
    canvas.height = settings.height;  // 400

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
    }, 500 / settings.typingSpeed);
  };

  const renderFrame = (ctx, text) => {
    ctx.fillStyle = settings.backgroundColor;
    ctx.fillRect(0, 0, settings.width, settings.height);
    ctx.font = `${settings.fontSize}px ${settings.fontFamily} monospace`;
    ctx.fillStyle = settings.textColor;

    const lines = text.split("\n");
    // const maxLines = Math.floor(360 / 24);
    const maxLines = Math.floor(settings.height / (settings.fontSize * 1.5)); // Adjust max lines based on font size

    const start = Math.max(0, lines.length - maxLines);
    const visibleLines = lines.slice(start);

    visibleLines.forEach((line, index) => {
      // ctx.fillText(line, 20, 50 + index * 24);
      ctx.fillText(line, 20, 50 + index * (settings.fontSize * 1.5)); // Adjust line spacing
    });

    // Blinking Cursor
    if (showCursor) {
      const lastLine = visibleLines[visibleLines.length - 1] || "";
      ctx.fillText(
        "|",
        20 + ctx.measureText(lastLine).width,
        50 + (visibleLines.length - 1) * (settings.fontSize * 1.5)

        // 50 + (visibleLines.length - 1) * 24
      );
    }
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

  const emptyCode = () => {
    setCode("");
  };

  const openSettings = () => {};

  return (
    <StyledApp>
      <Container>
        <CodePanel>
          <Fixed>
            <h2>Code Editor</h2>
            {code && (
              <IconButton
                onClick={emptyCode}
                disabled={isAnimating}
                title="Start Animation"
              >
                <RotateCcw color="white" size={24} />
              </IconButton>
            )}
          </Fixed>

          <div style={{ flex: 1, overflow: "auto", borderRadius: "6px" }}>
            <CodeMirror
              value={code}
              onChange={setCode}
              extensions={[javascript(), EditorView.lineWrapping]}
              theme={dracula}
              height="100%"
            />
          </div>
        </CodePanel>

        <AnimationPanel>
          <Fixed>
            <h2>Preview</h2>
            <div style={{ display: "flex", gap: "10px" }}>
              <Modal>
                <Modal.Open opensWindowName="window1">
                  <IconButton
                    onClick={openSettings}
                    disabled={isAnimating}
                    title="Start Animation"
                  >
                    <Settings color="white" size={24} />
                  </IconButton>
                </Modal.Open>
                <Modal.Window name="window1">
                  <VideoSettings
                    settings={settings}
                    setSettings={setSettings}
                  />
                </Modal.Window>
              </Modal>

              <IconButton
                onClick={startAnimation}
                disabled={isAnimating}
                title="Start Animation"
              >
                <Play color="white" size={24} />
              </IconButton>
              <IconButton
                disabled={isAnimating}
                onClick={downloadRecording}
                title="Download Recording"
              >
                <Download color="white" size={24} />
              </IconButton>
            </div>
          </Fixed>
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

          <div
            id="output"
            style={{
              flex: 1,
              overflow: "auto",
              borderRadius: "6px",
            }}
          >
            <CodeMirror
              value={typedCode + (showCursor ? "|" : "")}
              extensions={[javascript(), EditorView.lineWrapping]}
              theme={dracula}
              readOnly
            />
          </div>
        </AnimationPanel>
      </Container>
    </StyledApp>
  );
};

export default AppFunctionality;

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
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
  height: 80vh;
  overflow: auto;
`;

const AnimationPanel = styled(Panel)`
  position: relative;
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

const Fixed = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  background: #121a2a;
  z-index: 10;
`;
