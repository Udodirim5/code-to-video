import { useState, useRef, useEffect } from "react";

export const useAnimationLogic = (settings, code) => {
  const [typedCode, setTypedCode] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const animationRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  // Cursor Blinking Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Frame Rate Effect
  useEffect(() => {
    if (settings.frameByFrame) {
      document.addEventListener("keydown", handleNextFrame);
      return () => document.removeEventListener("keydown", handleNextFrame);
    }
  }, [settings.frameByFrame, typedCode]);

  const handleNextFrame = () => {
    if (!settings.frameByFrame || !isAnimating) return;

    if (animationRef.current) {
      clearInterval(animationRef.current);
    }

    if (typedCode.length < code.length) {
      setTypedCode(code.slice(0, typedCode.length + 1));
      renderFrame(
        canvasRef.current.getContext("2d"),
        code.slice(0, typedCode.length + 1)
      );
    } else {
      setIsAnimating(false);
      mediaRecorderRef.current.stop();
    }
  };

  const playSound = (type) => {
    if (!settings.typingSounds && type === "typing") return;
    if (!settings.backgroundMusic && type === "background") return;

    const sound = new Audio(
      type === "typing" ? "/sounds/keypress.mp3" : "/sounds/background.mp3"
    );

    if (type === "background") {
      sound.loop = true;
    }

    sound.play();
  };

  const startAnimation = () => {
    setIsAnimating(true);
    setTypedCode("");
    recordedChunksRef.current = [];

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = settings.width;
    canvas.height = settings.height;

    const stream = canvas.captureStream(
      settings.frameRate * settings.playbackSpeed
    );
    mediaRecorderRef.current = new MediaRecorder(stream, {
      mimeType: settings.outputFormat === "MP4" ? "video/mp4" : "video/webm",
    });
    mediaRecorderRef.current.ondataavailable = (event) =>
      recordedChunksRef.current.push(event.data);
    mediaRecorderRef.current.start();

    let i = 0;
    animationRef.current = setInterval(
      () => {
        if (i <= code.length) {
          setTypedCode(code.slice(0, i));
          renderFrame(ctx, code.slice(0, i));
          if (settings.typingSounds) playSound("typing");
          i++;
        } else {
          clearInterval(animationRef.current);
          setIsAnimating(false);
          mediaRecorderRef.current.stop();
        }
      },
      1000 / settings.typingSpeed / settings.playbackSpeed
    );

    if (settings.backgroundMusic) playSound("background");
  };

  const renderFrame = (ctx, text) => {
    ctx.fillStyle = settings.backgroundColor;
    ctx.fillRect(0, 0, settings.width, settings.height);
    ctx.font = `${settings.fontSize}px ${settings.fontFamily} monospace`;

    const lines = text.split("\n");
    const maxLines = Math.floor(settings.height / (settings.fontSize * 1.5));
    const start = Math.max(0, lines.length - maxLines);
    const visibleLines = lines.slice(start);

    visibleLines.forEach((line, index) => {
      const yPos = 50 + index * (settings.fontSize * 1.5);
      if (settings.lineNumbers) {
        ctx.fillStyle = settings.textColor;
        ctx.fillText(`${start + index + 1}. `, 5, yPos);
      }
      ctx.fillStyle = settings.textColor;
      ctx.fillText(line, 20, yPos);
    });

    if (showCursor) {
      const lastLine = visibleLines[visibleLines.length - 1] || "";
      ctx.fillText(
        "|",
        20 + ctx.measureText(lastLine).width,
        50 + (visibleLines.length - 1) * (settings.fontSize * 1.5)
      );
    }

    if (settings.watermark) {
      ctx.font = "12px Arial";
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.fillText(
        "© " + settings.branding,
        settings.width - 120,
        settings.height - 10
      );
    }
  };

  const downloadRecording = () => {
    const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = (`animation.${settings.outputFormat}`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return {
    typedCode,
    isAnimating,
    showCursor,
    canvasRef,
    startAnimation,
    downloadRecording,
  };
};