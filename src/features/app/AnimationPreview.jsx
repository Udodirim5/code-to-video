import { useRef, useEffect } from "react";
import styled from "styled-components";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView } from "@codemirror/view";
import { dracula } from "@uiw/codemirror-theme-dracula";

export const AnimationPreview = ({ typedCode, showCursor }) => {
  const outputRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [typedCode]);

  return (
    <>
      <div
        ref={outputRef}
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
    </>
  );
};

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
`;
