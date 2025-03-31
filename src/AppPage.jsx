import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView } from "@codemirror/view";

const loadFFmpeg = async () => {
  const { createFFmpeg, fetchFile } = await import("@ffmpeg/ffmpeg");
  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();
};

loadFFmpeg();

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #0a0e17;
  color: #e0e0e0;
  font-family: "Fira Code", monospace;
  overflow: hidden;
  padding: 20px;
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Panel = styled.div`
  background: #121a2a;
  padding: 16px;
  border-radius: 8px;
  flex: 1;
`;

const Button = styled.button`
  background: #6e45e2;
  border: none;
  padding: 12px;
  color: white;
  cursor: pointer;
  border-radius: 6px;
  &:hover {
    background: #5543c0;
  }
`;

const App = () => {
  const [code, setCode] = useState(
    `function helloWorld() {\n  console.log('Hello, World!');\n}`
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [typedCode, setTypedCode] = useState("");
  const animationRef = useRef(null);
  const frameData = useRef([]);

  useEffect(() => {
    return () => clearInterval(animationRef.current);
  }, []);

  const startAnimation = () => {
    setIsAnimating(true);
    setTypedCode("");
    frameData.current = [];

    let i = 0;
    animationRef.current = setInterval(() => {
      if (i <= code.length) {
        setTypedCode(code.slice(0, i));
        frameData.current.push(code.slice(0, i));
        i++;
      } else {
        clearInterval(animationRef.current);
        setIsAnimating(false);
      }
    }, 100);
  };

  const exportMP4 = async () => {
    if (!ffmpeg.isLoaded()) await ffmpeg.load();
    const frames = frameData.current;

    for (let i = 0; i < frames.length; i++) {
      const frame = new Blob([frames[i]], { type: "text/plain" });
      await ffmpeg.FS("writeFile", `frame${i}.txt`, await fetchFile(frame));
    }

    await ffmpeg.run("-framerate", "2", "-i", "frame%d.txt", "output.mp4");
    const data = ffmpeg.FS("readFile", "output.mp4");
    const videoURL = URL.createObjectURL(
      new Blob([data.buffer], { type: "video/mp4" })
    );

    const a = document.createElement("a");
    a.href = videoURL;
    a.download = "animation.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <StyledApp>
      <Container>
        <Panel>
          <h2>Code Editor</h2>
          <CodeMirror
            value={code}
            onChange={setCode}
            extensions={[javascript(), EditorView.lineWrapping]}
            theme="dark"
          />
        </Panel>

        <Panel>
          <h2>Animation</h2>
          <Button onClick={startAnimation} disabled={isAnimating}>
            Start Animation
          </Button>

          <CodeMirror
            value={typedCode}
            extensions={[javascript(), EditorView.lineWrapping]}
            theme="dark"
            readOnly
          />

          <Button onClick={exportMP4} disabled={isAnimating || !typedCode}>
            Export as MP4
          </Button>
        </Panel>
      </Container>
    </StyledApp>
  );
};

export default App;
