import { useState } from "react";
import About from "./components/About";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import confetti from "canvas-confetti";
import Skills from "./components/Skills";
import Projects from "./components/Projects";

function App() {
  const [partyMode, setPartyMode] = useState(false);
  const handleConfettiExplosion = (event) => {
    // Delay the execution to 2 seconds after the click
    const { clientX: x, clientY: y } = event;

    // Convert click position to relative position for the confetti function
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.style.position = "fixed";
    canvas.style.pointerEvents = "none";
    canvas.style.top = "0";
    canvas.style.left = "0";

    const confettiSettings = {
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }, // Adjust based on the need
      zIndex: 1051, // Ensure confetti is above most elements
    };

    // Position the canvas for the confetti
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const confettiInstance = confetti.create(canvas, { resize: true });
    confettiInstance({
      ...confettiSettings,
      // Calculate the confetti origin based on click position
      origin: { x: x / window.innerWidth, y: y / window.innerHeight },
    });

    // Remove the canvas after the animation is done
    setTimeout(() => {
      document.body.removeChild(canvas);
    }, 2000); // Adjust this duration as needed
  };

  return (
    <div
      onClick={partyMode ? handleConfettiExplosion : null}
      style={{ position: "relative" }}
    >
      <Navbar />
      <Header handleConfettiExplosion={handleConfettiExplosion} />
      <About />
      <Skills handleConfettiExplosion={handleConfettiExplosion} />
      <Projects />
    </div>
  );
}

export default App;
