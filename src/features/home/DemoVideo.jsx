import styled, { keyframes } from "styled-components";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const DemoVideo = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isPlaying]);

  return (
    <StyledDemoVideoContainer 
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => !isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        width="100%"
        height="100%"
        autoPlay
        loop
        muted={isMuted}
        onClick={togglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="https://videos.pexels.com/video-files/6548176/6548176-hd_1920_1080_24fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <VideoOverlay $show={showControls}>
        <ControlButtons>
          <ControlButton onClick={togglePlay}>
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </ControlButton>
          <ControlButton onClick={toggleMute}>
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </ControlButton>
        </ControlButtons>
      </VideoOverlay>

      <GlowEffect />
    </StyledDemoVideoContainer>
  );
};

export default DemoVideo;

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(100, 108, 255, 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(100, 108, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(100, 108, 255, 0); }
`;

// Styled Components
const StyledDemoVideoContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.9);
  padding: 2px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.1);
  }

  video {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
    cursor: pointer;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.01);
    }
  }
`;

const VideoOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  opacity: ${props => props.$show ? 1 : 0};
  transition: opacity 0.3s ease;
  animation: ${fadeIn} 0.3s ease;
`;

const ControlButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const ControlButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;
  backdrop-filter: blur(5px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const GlowEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
  pointer-events: none;
  animation: ${pulse} 3s infinite;
  opacity: 0.7;
`;