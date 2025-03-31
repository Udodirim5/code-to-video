import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView } from "@codemirror/view";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { Download, Play } from "lucide-react";

// Dynamically import FFmpeg to avoid Vite ESM issues
let ffmpeg;
const loadFFmpeg = async () => {
  if (!ffmpeg) {
    const { createFFmpeg, fetchFile } = await import("@ffmpeg/ffmpeg");
    ffmpeg = createFFmpeg({ log: true });
    await ffmpeg.load();
    console.log("✅ FFmpeg loaded successfully");
  }
};

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

const App = () => {
  const [code, setCode] = useState(
    `// Welcome to CodeAnim\nfunction helloWorld() {\n  console.log('Hello, World!');\n  return "Animation complete!";\n}`
  );
  const [typedCode, setTypedCode] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [ffmpegReady, setFfmpegReady] = useState(false);
  const animationRef = useRef(null);
  const outputRef = useRef(null);

  // Initialize FFmpeg on mount
  useEffect(() => {
    const init = async () => {
      try {
        await loadFFmpeg();
        setFfmpegReady(true);
      } catch (error) {
        console.error("❌ FFmpeg failed to load:", error);
      }
    };
    init();
  }, []);

  // Auto-scroll preview output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [typedCode]);

  const startAnimation = () => {
    setIsAnimating(true);
    setTypedCode("");

    let i = 0;
    animationRef.current = setInterval(() => {
      if (i <= code.length) {
        setTypedCode(code.slice(0, i));
        i++;
      } else {
        clearInterval(animationRef.current);
        setIsAnimating(false);
      }
    }, 100);
  };

  const exportMP4 = async () => {
    if (!ffmpegReady) {
      console.error("❌ FFmpeg is not ready yet!");
      return;
    }

    try {
      console.log("🎬 Rendering animation frames...");

      // Convert code to an image
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 800;
      canvas.height = 400;
      ctx.fillStyle = "#0a0e17";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ffffff";
      ctx.font = "20px Fira Code";
      ctx.fillText(typedCode, 20, 50);

      // Convert canvas to image buffer
      const imageBuffer = await new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), "image/png");
      });

      // Load image into FFmpeg
      await ffmpeg.FS("writeFile", "frame.png", await (await fetch(imageBuffer)).arrayBuffer());

      console.log("🎥 Encoding MP4...");
      await ffmpeg.run(
        "-loop",
        "1",
        "-t",
        "3",
        "-i",
        "frame.png",
        "-vf",
        "format=yuv420p",
        "-c:v",
        "libx264",
        "output.mp4"
      );

      console.log("✅ Export complete!");
      const data = ffmpeg.FS("readFile", "output.mp4");
      const videoBlob = new Blob([data.buffer], { type: "video/mp4" });
      const videoUrl = URL.createObjectURL(videoBlob);

      // Trigger download
      const a = document.createElement("a");
      a.href = videoUrl;
      a.download = "animation.mp4";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("❌ Export failed:", error);
    }
  };

  return (
    <StyledApp>
      <Container>
        <CodePanel>
          <h2>Code Editor</h2>
          <div style={{ flex: 1, overflow: "auto" }}>
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
          <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", alignItems: "center" }}>
            <h2>Preview</h2>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <IconButton onClick={startAnimation} disabled={isAnimating} title="Start Animation">
                <Play color="white" size={24} />
              </IconButton>

              <IconButton onClick={exportMP4} disabled={isAnimating || !typedCode || !ffmpegReady} title="Export MP4">
                <Download color="white" size={24} />
              </IconButton>
            </div>
          </div>

          <div ref={outputRef} style={{ flex: 1, height: "100%", overflow: "auto", borderRadius: "6px" }}>
            <CodeMirror value={typedCode} extensions={[javascript(), EditorView.lineWrapping]} theme={dracula} readOnly />
          </div>
        </AnimationPanel>
      </Container>
    </StyledApp>
  );
};

export default App;









// /*

// import { useState, useRef, useEffect } from "react";
// import styled from "styled-components";
// import CodeMirror from "@uiw/react-codemirror";
// import { javascript } from "@codemirror/lang-javascript";
// import { EditorView } from "@codemirror/view";
// import { dracula } from "@uiw/codemirror-theme-dracula";
// import { Download, Play } from "lucide-react";

// // FFmpeg initialization
// let ffmpeg;
// const initFFmpeg = async () => {
//   try {
//     const { createFFmpeg, fetchFile } = await import("@ffmpeg/ffmpeg");
//     ffmpeg = createFFmpeg({ log: true });
//     await ffmpeg.load();
//     console.log("FFmpeg loaded successfully");
//   } catch (error) {
//     console.error("FFmpeg initialization failed:", error);
//   }
// };

// // Initialize FFmpeg when the module loads
// initFFmpeg();

// // Fallback theme
// const fallbackTheme = EditorView.theme({
//   "&": {
//     backgroundColor: "#0d1117",
//     color: "#e0e0e0",
//     height: "100%",
//   },
//   ".cm-content": {
//     caretColor: "#6e45e2",
//   },
//   "&.cm-focused .cm-cursor": {
//     borderLeftColor: "#6e45e2",
//   },
//   "&.cm-focused .cm-selectionBackground": {
//     backgroundColor: "#6e45e244",
//   },
//   ".cm-gutters": {
//     backgroundColor: "#0d1117",
//     color: "#6b6b6b",
//     borderRight: "1px solid #252f40",
//   },
// });

// const StyledApp = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 100dvh;
//   background: #0a0e17;
//   color: #e0e0e0;
//   font-family: "Fira Code", monospace;
//   overflow: hidden;
//   width: 100dvw;
// `;

// const Container = styled.div`
//   display: flex;
//   flex: 1;
//   gap: 20px;
//   padding: 20px;

//   @media (max-width: 768px) {
//     flex-direction: column;
//   }
// `;

// const Panel = styled.div`
//   background: #121a2a;
//   padding: 16px;
//   border-radius: 8px;
//   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
// `;

// const CodePanel = styled(Panel)`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   max-height: 80vh; /* Adjust based on your preference */
//   overflow: auto;
// `;

// const AnimationPanel = styled(Panel)`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   max-height: 80vh;
//   overflow: auto;
// `;

// const Button = styled.button`
//   background: linear-gradient(135deg, #6e45e2 0%, #88d3ce 100%);
//   border: none;
//   padding: 12px 24px;
//   color: white;
//   cursor: pointer;
//   border-radius: 6px;
//   font-weight: 600;
//   text-transform: uppercase;
//   letter-spacing: 1px;
//   transition: all 0.2s;

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 4px 15px rgba(110, 69, 226, 0.4);
//   }

//   &:disabled {
//     background: #444;
//     cursor: not-allowed;
//     transform: none;
//     box-shadow: none;
//     opacity: 0.7;
//   }
// `;

// const IconButton = styled.button`
//   background: transparent;
//   border: none;
//   cursor: pointer;
//   padding: 8px;
//   border-radius: 6px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: all 0.2s;

//   &:hover {
//     background: rgba(255, 255, 255, 0.1);
//   }

//   &:disabled {
//     opacity: 0.5;
//     cursor: not-allowed;
//   }
// `;

// const App = () => {
//   const [code, setCode] = useState(
//     `// Welcome to CodeAnim\nfunction helloWorld() {\n  console.log('Hello, World!');\n  return "Animation complete!";\n}`
//   );
//   const [typedCode, setTypedCode] = useState("");
//   const [isAnimating, setIsAnimating] = useState(false);
//   const animationRef = useRef(null);
//   const outputRef = useRef(null);

//   setTimeout(() => {
//     if (outputRef.current) {
//       outputRef.current.scrollTo({
//         top: outputRef.current.scrollHeight - 0,
//         behavior: "smooth",
//       });
//     }
//   }, 0);

//   const startAnimation = () => {
//     setIsAnimating(true);
//     setTypedCode("");

//     let i = 0;
//     animationRef.current = setInterval(() => {
//       if (i <= code.length) {
//         setTypedCode(code.slice(0, i));
//         i++;
//       } else {
//         clearInterval(animationRef.current);
//         setIsAnimating(false);
//       }
//     }, 100);
//   };

//   const exportMP4 = async () => {
//     if (!ffmpeg || !ffmpeg.isLoaded()) {
//       console.error("FFmpeg not ready");
//       return;
//     }

//     try {
//       const blob = new Blob([typedCode], { type: "text/plain" });
//       const url = URL.createObjectURL(blob);

//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "code_animation.txt";
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//     } catch (error) {
//       console.error("Export failed:", error);
//     }
//   };

//   useEffect(() => {
//     return () => clearInterval(animationRef.current);
//   }, []);

//   return (
//     <StyledApp>
//       <Container>
//         <CodePanel>
//           <h2>Code Editor</h2>
//           <div style={{ flex: 1, overflow: "auto" }}>
//             <CodeMirror
//               value={code}
//               onChange={setCode}
//               extensions={[javascript(), EditorView.lineWrapping]}
//               theme={dracula}
//               height="100%"
//             />
//           </div>
//         </CodePanel>

//         <AnimationPanel>
//           <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", alignItems: "center" }}>
//           <h2>Preview</h2>
//           <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
//             <IconButton
//               onClick={startAnimation}
//               disabled={isAnimating}
//               title="Start Animation"
//             >
//               <Play color="white" size={24} />
//             </IconButton>

//             <IconButton
//               onClick={exportMP4}
//               disabled={isAnimating || !typedCode}
//               title="Export MP4"
//             >
//               <Download color="white" size={24} />
//             </IconButton>
//           </div>
//           </div>

//           <div
//             ref={outputRef}
//             style={{
//               flex: 1,
//               height: "100%",
//               overflow: "auto",
//               borderRadius: "6px",
//             }}
//           >
//             <CodeMirror
//               value={typedCode}
//               extensions={[javascript(), EditorView.lineWrapping]}
//               theme={dracula}
//               readOnly
//             />
//           </div>
//         </AnimationPanel>
//       </Container>
//     </StyledApp>
//   );
// };

// export default App;
// */