import { useState } from "react";
import {
  Monitor,
  Clock,
  Download,
  Code,
  Music,
  Volume2,
  Type,
  Image,
  Hash,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import styled from "styled-components";

const VideoSettings = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [settings, setSettings] = useState({
    // Canvas Settings
    resolution: "1080p",
    width: 1920,
    height: 1080,
    backgroundColor: "#121a2a",
    fontFamily: "Inter",
    fontSize: 16,

    // Animation & Timing
    typingSpeed: 3,
    frameRate: 30,
    duration: 10,
    playbackSpeed: 1,

    // Export Options
    outputFormat: "MP4",
    compressionQuality: "High",
    frameByFrame: false,

    // Code Editor
    syntaxTheme: "Dracula",
    lineNumbers: true,

    // Audio
    backgroundMusic: false,
    typingSounds: false,
    soundSync: false,

    // Watermark
    watermark: false,
    branding: "CodeToVideo",
  });

  const toggleSection = (section) => {
    setActiveSection((prev) => {
      const newSection = prev === section ? null : section;
      localStorage.setItem("activeSection", newSection || "");
      return newSection;
    });
  };

  const handleSectionClick = (e) => {
    e.stopPropagation(); // Prevents child clicks from affecting parent toggle
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
  };

  const handleColorChange = (color) => {
    if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
      setSettings((prev) => ({ ...prev, backgroundColor: color }));
    }
  };

  const resolutionOptions = [
    { value: "720p", label: "720p (1280×720)" },
    { value: "1080p", label: "1080p (1920×1080)" },
    { value: "4K", label: "4K (3840×2160)" },
  ];

  const fontOptions = ["Inter", "Poppins", "Roboto", "Monospace"];
  const themeOptions = ["Dark", "Light", "Solarized", "Dracula"];
  const frameRateOptions = [24, 30, 60];
  const speedOptions = [0.5, 1, 1.5, 2];
  const formatOptions = ["MP4", "WebM", "PNG Sequence", "GIF"];
  const qualityOptions = ["Low", "Medium", "High", "Lossless"];

  return (
    <SettingsPanel>
      <SettingSection
        open={activeSection === "canvas"}
        onClick={() => toggleSection("canvas")}
      >
        <SectionHeader>
          <Monitor size={18} />
          <h3>Canvas Settings</h3>
          {activeSection === "canvas" ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </SectionHeader>

        {activeSection === "canvas" && (
          <SectionContent onClick={handleSectionClick}>
            <SettingGroup>
              <label>Resolution</label>
              <Select
                name="resolution"
                value={settings.resolution}
                onChange={handleChange}
              >
                {resolutionOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
            </SettingGroup>

            <SettingGroup>
              <label>Canvas Size</label>
              <DimensionInputs>
                <input
                  type="number"
                  name="width"
                  value={settings.width}
                  onChange={handleChange}
                  min="100"
                  max="7680"
                />
                <span>×</span>
                <input
                  type="number"
                  name="height"
                  value={settings.height}
                  onChange={handleChange}
                  min="100"
                  max="4320"
                />
              </DimensionInputs>
            </SettingGroup>

            <SettingGroup>
              <label>Background Color</label>
              <ColorInput>
                <input
                  type="color"
                  value={settings.backgroundColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                />
                <span>{settings.backgroundColor}</span>
              </ColorInput>
            </SettingGroup>

            <SettingGroup>
              <label>Font Family</label>
              <Select
                name="fontFamily"
                value={settings.fontFamily}
                onChange={handleChange}
              >
                {fontOptions.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </Select>
            </SettingGroup>

            <SettingGroup>
              <label>Font Size</label>
              <input
                type="number"
                name="fontSize"
                value={settings.fontSize}
                onChange={handleChange}
                min="8"
                max="72"
              />
            </SettingGroup>
          </SectionContent>
        )}
      </SettingSection>

      <SettingSection
        open={activeSection === "animation"}
        onClick={() => toggleSection("animation")}
      >
        <SectionHeader>
          <Clock size={18} />
          <h3>Animation & Timing</h3>
          {activeSection === "animation" ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </SectionHeader>

        {activeSection === "animation" && (
          <SectionContent onClick={handleSectionClick}>
            <SettingGroup>
              <label>Typing Speed</label>
              <SliderContainer>
                <input
                  type="range"
                  name="typingSpeed"
                  min="1"
                  max="5"
                  step="0.1"
                  value={settings.typingSpeed}
                  onChange={handleChange}
                />
                <span>{settings.typingSpeed}x</span>
              </SliderContainer>
            </SettingGroup>

            <SettingGroup>
              <label>Frame Rate</label>
              <Select
                name="frameRate"
                value={settings.frameRate}
                onChange={handleChange}
              >
                {frameRateOptions.map((fps) => (
                  <option key={fps} value={fps}>
                    {fps} FPS
                  </option>
                ))}
              </Select>
            </SettingGroup>

            <SettingGroup>
              <label>Total Duration (seconds)</label>
              <input
                type="number"
                name="duration"
                value={settings.duration}
                onChange={handleChange}
                min="1"
                max="600"
                step="0.1"
              />
            </SettingGroup>

            <SettingGroup>
              <label>Playback Speed</label>
              <Select
                name="playbackSpeed"
                value={settings.playbackSpeed}
                onChange={handleChange}
              >
                {speedOptions.map((speed) => (
                  <option key={speed} value={speed}>
                    {speed}x
                  </option>
                ))}
              </Select>
            </SettingGroup>
          </SectionContent>
        )}
      </SettingSection>

      <SettingSection
        open={activeSection === "export"}
        onClick={() => toggleSection("export")}
      >
        <SectionHeader>
          <Download size={18} />
          <h3>Export Options</h3>
          {activeSection === "export" ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </SectionHeader>

        {activeSection === "export" && (
          <SectionContent onClick={handleSectionClick}>
            <SettingGroup>
              <label>Output Format</label>
              <Select
                name="outputFormat"
                value={settings.outputFormat}
                onChange={handleChange}
              >
                {formatOptions.map((format) => (
                  <option key={format} value={format}>
                    {format}
                  </option>
                ))}
              </Select>
            </SettingGroup>

            <SettingGroup>
              <label>Compression Quality</label>
              <Select
                name="compressionQuality"
                value={settings.compressionQuality}
                onChange={handleChange}
              >
                {qualityOptions.map((quality) => (
                  <option key={quality} value={quality}>
                    {quality}
                  </option>
                ))}
              </Select>
            </SettingGroup>

            <ToggleGroup>
              <ToggleLabel>
                <input
                  type="checkbox"
                  name="frameByFrame"
                  checked={settings.frameByFrame}
                  onChange={handleChange}
                />
                <span>Frame-by-Frame Rendering</span>
              </ToggleLabel>
            </ToggleGroup>
          </SectionContent>
        )}
      </SettingSection>

      <SettingSection
        open={activeSection === "editor"}
        onClick={() => toggleSection("editor")}
      >
        <SectionHeader>
          <Code size={18} />
          <h3>Code Editor Customization</h3>
          {activeSection === "editor" ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </SectionHeader>

        {activeSection === "editor" && (
          <SectionContent onClick={handleSectionClick}>
            <SettingGroup>
              <label>Syntax Theme</label>
              <Select
                name="syntaxTheme"
                value={settings.syntaxTheme}
                onChange={handleChange}
              >
                {themeOptions.map((theme) => (
                  <option key={theme} value={theme}>
                    {theme}
                  </option>
                ))}
              </Select>
            </SettingGroup>

            <ToggleGroup>
              <ToggleLabel>
                <input
                  type="checkbox"
                  name="lineNumbers"
                  checked={settings.lineNumbers}
                  onChange={handleChange}
                />
                <span>Show Line Numbers</span>
              </ToggleLabel>
            </ToggleGroup>
          </SectionContent>
        )}
      </SettingSection>

      <SettingSection
        open={activeSection === "audio"}
        onClick={() => toggleSection("audio")}
      >
        <SectionHeader>
          <Music size={18} />
          <h3>Audio & Sound Effects</h3>
          {activeSection === "audio" ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </SectionHeader>

        {activeSection === "audio" && (
          <SectionContent onClick={handleSectionClick}>
            <ToggleGroup>
              <ToggleLabel>
                <input
                  type="checkbox"
                  name="backgroundMusic"
                  checked={settings.backgroundMusic}
                  onChange={handleChange}
                />
                <span>Enable Background Music</span>
              </ToggleLabel>
            </ToggleGroup>

            <ToggleGroup>
              <ToggleLabel>
                <input
                  type="checkbox"
                  name="typingSounds"
                  checked={settings.typingSounds}
                  onChange={handleChange}
                />
                <span>Typing Sound Effects</span>
              </ToggleLabel>
            </ToggleGroup>

            <ToggleGroup>
              <ToggleLabel>
                <input
                  type="checkbox"
                  name="soundSync"
                  checked={settings.soundSync}
                  onChange={handleChange}
                />
                <span>Custom Sound Syncing</span>
              </ToggleLabel>
            </ToggleGroup>
          </SectionContent>
        )}
      </SettingSection>

      <SettingSection
        open={activeSection === "branding"}
        onClick={() => toggleSection("branding")}
      >
        <SectionHeader>
          <Image size={18} />
          <h3>Watermark & Branding</h3>
          {activeSection === "branding" ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </SectionHeader>

        {activeSection === "branding" && (
          <SectionContent onClick={handleSectionClick}>
            <ToggleGroup>
              <ToggleLabel>
                <input
                  type="checkbox"
                  name="watermark"
                  checked={settings.watermark}
                  onChange={handleChange}
                />
                <span>Add Watermark</span>
              </ToggleLabel>
            </ToggleGroup>

            <SettingGroup>
              <label>Custom Branding</label>
              <input
                type="text"
                name="branding"
                value={settings.branding}
                onChange={handleChange}
                placeholder="Your Brand Name"
              />
            </SettingGroup>
          </SectionContent>
        )}
      </SettingSection>
    </SettingsPanel>
  );
};

// Styled Components
const SettingsPanel = styled.div`
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  overflow: hidden;
  box-shadow: var(--shadow-md);
`;

const SettingSection = styled.div`
  border-bottom: 1px solid var(--color-border);
  transition: all var(--transition-base);

  &:last-child {
    border-bottom: none;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  cursor: pointer;
  user-select: none;
  transition: background var(--transition-base);

  &:hover {
    background: var(--color-surface-alt);
  }

  h3 {
    font-size: var(--font-size-base);
    font-weight: 600;
    margin: 0;
    flex: 1;
  }

  svg {
    color: var(--color-primary);
  }
`;

const SectionContent = styled.div`
  padding: 0 var(--space-5) var(--space-5);
  display: grid;
  gap: var(--space-4);
`;

const SettingGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-2);

  label {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    font-weight: 500;
  }

  input[type="number"],
  input[type="text"],
  select {
    background: var(--color-surface-alt);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-3);
    color: var(--color-text-primary);
    font-family: var(--font-family);
    transition: all var(--transition-base);

    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px var(--color-primary-light);
    }
  }

  input[type="number"] {
    width: 100%;
  }
`;

const DimensionInputs = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-2);

  span {
    color: var(--color-text-tertiary);
  }

  input {
    flex: 1;
    text-align: center;
  }
`;

const ColorInput = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);

  input[type="color"] {
    width: 40px;
    height: 40px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: 2px;
    background: var(--color-surface);
    cursor: pointer;
  }

  span {
    font-family: var(--font-mono);
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
  }
`;

const Select = styled.select`
  width: 100%;
  appearance: none;
  /* background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23adb5bd' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E"); */
  background-repeat: no-repeat;
  background-position: right var(--space-3) center;
  background-size: 16px;
  padding-right: var(--space-8);
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);

  input[type="range"] {
    flex: 1;
    height: 6px;
    border-radius: var(--radius-full);
    background: var(--color-surface-alt);
    appearance: none;
    outline: none;

    &::-webkit-slider-thumb {
      appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--color-primary);
      cursor: pointer;
      transition: all var(--transition-base);

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  span {
    font-family: var(--font-mono);
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    min-width: 30px;
    text-align: right;
  }
`;

const ToggleGroup = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleLabel = styled.label`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  cursor: pointer;
  user-select: none;
  font-size: var(--font-size-sm);

  input[type="checkbox"] {
    position: relative;
    width: 36px;
    height: 20px;
    appearance: none;
    background: var(--color-surface-alt);
    border-radius: var(--radius-full);
    border: 1px solid var(--color-border);
    transition: all var(--transition-base);
    cursor: pointer;

    &:checked {
      background: var(--color-primary);
      border-color: var(--color-primary);

      &::before {
        transform: translateX(16px);
      }
    }

    &::before {
      content: "";
      position: absolute;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: white;
      top: 1px;
      left: 1px;
      transition: transform var(--transition-base);
    }
  }
`;

export default VideoSettings;
