import { Play, Download, Settings } from "lucide-react";
import Modal from "../../ui/Modal";
import VideoSettings from "./VideoSettings";
import { Fixed, IconButton } from "./SharedComponents";

export const AnimationControls = ({
  isAnimating,
  startAnimation,
  downloadRecording,
  settings,
  setSettings,
}) => {
  return (
    <Fixed>
      <h2>Preview</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        <Modal>
          <Modal.Open opensWindowName="window1">
            <IconButton disabled={isAnimating} title="Settings">
              <Settings color="white" size={24} />
            </IconButton>
          </Modal.Open>
          <Modal.Window name="window1">
            <VideoSettings settings={settings} setSettings={setSettings} />
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
  );
};
