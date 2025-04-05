import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView } from "@codemirror/view";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { RotateCcw } from "lucide-react";
import { Fixed, IconButton } from "./SharedComponents";
import styled from "styled-components";

export const CodeEditorPanel = ({ code, setCode, isAnimating, emptyCode }) => {
  return (
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
  );
};

const CodePanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 80vh;
  overflow: auto;
  background: #121a2a;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  height: 100%;
  max-height: 46vh;
  min-height: 40vh;
`;