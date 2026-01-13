import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { heroVideo, smallHeroVideo } from '../utils';

function Hero() {
  const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo);
  const iframeRef = useRef(null);
  const [message, setMessage] = useState(''); // To show feedback below button

  useEffect(() => {
    gsap.to('#hero', { opacity: 1, delay: 1.5 });
    gsap.to('#cta', { opacity: 1, y: -50, delay: 1.5 });
  }, []);

  const handleVideoSrcSet = () => {
    setVideoSrc(window.innerWidth < 760 ? smallHeroVideo : heroVideo);
  };

  useEffect(() => {
    window.addEventListener('resize', handleVideoSrcSet);
    return () => window.removeEventListener('resize', handleVideoSrcSet);
  }, []);

  const knownMapping = {
    sun: 'sun',
    mercury: 'mercury',
    venus: 'venus',
    earth: 'earth',
    mars: 'mars',
    jupiter: 'jupiter',
    saturn: 'saturn',
    uranus: 'uranus',
    neptune: 'neptune',
    iss: 'sc_iss',
    'voyager 1': 'sc_voyager_1',
    'europa clipper': 'sc_europa_clipper',
    'osiris rex': 'sc_osiris_rex_src'
  };

  const startVoiceCommand = () => {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      setMessage('Speech Recognition not supported in this browser.');
      return;
    }

    setMessage('Listening... Please speak.');
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = (event) => {
      const spoken = event.results[0][0].transcript.toLowerCase().trim();
      console.log('Heard:', spoken);
      setMessage(`Heard: "${spoken}"`);

      // Try to find in known mapping
      const key = Object.keys(knownMapping).find(k => spoken.includes(k));

      if (key) {
        const url = `https://eyes.nasa.gov/apps/solar-system/#/${knownMapping[key]}`;
        iframeRef.current.src = url;
        setMessage(`Loading "${key}"...`);
      } else {
        // Fallback: sanitize and try direct load
        const sanitized = spoken.replace(/\s+/g, '_');
        const url = `https://eyes.nasa.gov/apps/solar-system/#/${sanitized}`;

        // Load it but also warn that it might not exist
        iframeRef.current.src = url;
        setMessage(`Loading "${spoken}" (direct)... Note: If not found, try different phrase.`);
        console.warn(`No mapping found for "${spoken}". Trying direct load.`);
      }
    };

    recognition.onerror = (event) => {
      setMessage(`Error occurred: ${event.error}`);
      console.error('Speech recognition error:', event.error);
    };
  };

  return (
    <section className="w-full nav-height bg-black relative mt-5">
      <div className="w-full">
        <div className="h-5/6 w-full flex-center flex-col mt-[-15px]">
          <div style={{ position: 'absolute', top: '10px', left: '30%', zIndex: 100, paddingTop: '60px' }}>
            <p id="hero" className="hero-title">
              Discover the <span className="text-white">Symphony of the Stars</span>
              <br />
              Where Music Meets the Universe
            </p>
            <button onClick={startVoiceCommand} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
              🎤 Speak to Explore
            </button>
            <p className="mt-2 text-white">{message}</p>
          </div>
        </div>
      </div>

      <div className="w-full h-screen">
        <iframe
          ref={iframeRef}
          src="https://eyes.nasa.gov/apps/solar-system/#/home?interactPrompt=true&featured=false&logo=false&shareButton=false&menu=false"
          allowFullScreen
          className="w-full h-full border-none"
          title="NASA Eyes Solar System"
        ></iframe>
      </div>
    </section>
  );
}

export default Hero;
