import React, { useState, useEffect } from 'react';

const slides = [
  './images/hero_01.jpg',
  './images/hero_02.jpg',
  './images/hero_03.jpg',
  './images/hero_04.jpg',
  './images/hero_05.jpg',
  './images/hero_06.jpg',
  './images/hero_07.jpg',
  './images/hero_08.jpg',
  './images/hero_09.jpg',
  './images/hero_11.jpg',
  './images/hero_12.jpg',
  './images/hero_13.jpg',
  './images/hero_14.jpg',
  './images/hero_15.jpg',
  './images/hero_16.jpg',
  './images/hero_17.jpg',
  './images/hero_18.jpg',
  './images/hero_19.jpg',
  './images/hero_21.jpg',
  './images/hero_22.jpg',
  './images/hero_23.jpg',
  './images/hero_24.jpg',
  './images/hero_25.jpg',
  './images/hero_26.jpg',
  './images/hero_27.jpg',
  './images/hero_28.jpg',
  './images/hero_29.jpg',
  './images/hero_30.jpg',
  './images/hero_31.jpg',
  './images/hero_32.jpg'
];

const videoUrls = [
  './videos/sophia.webm',
  './videos/sophia.webm',
  './videos/sophia.webm',
  './videos/sophia.webm',
  './videos/sophia.webm',
  './videos/sophia.webm',
  './videos/sophia.webm',
  './videos/sophia.webm',
  './videos/sophia.webm'
];

const content = {
  en: {
    explore: 'TAP TO EXPLORE MORE',
    exit: 'EXIT VIDEO',
    gridTitles: [
      'MOTION CAPTURE', 'FORCE PLATES', 'ENVIRONMENTAL CHAMBERS',
      'ENDURANCE TESTING', 'INNOVATION PROCESS', 'LEAK PROTECTION: PERIOD',
      'BODY SCAN', 'FOOT SCAN', 'PRESSURE MAPPING'
    ]
  },
  es: {
    explore: 'TOCA PARA EXPLORAR MÁS',
    exit: 'SALIR DEL VIDEO',
    gridTitles: [
      'CAPTURA DE MOVIMIENTO', 'PLATAFORMA DE FUERZA', 'CÁMARAS AMBIENTALES',
      'EXAMEN DE RESISTENCIA', 'PROCESO DE INNOVACIÓN', 'PROTECCION DE GOTERA: PERIODO MENSTRUAL',
      'ESCANEO DEL CUERPO', 'ESCANEO DEL PIE', 'MAPEO DE PRESIÓN'
    ]
  }
};

const VideoPlayer = ({ videoUrl, onVideoEnd, onClose, language }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <video
        className="w-full h-full object-contain"
        autoPlay
        controls={false}
        onEnded={onVideoEnd}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      
      <button 
        onClick={onClose}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-full font-medium transition-colors"
      >
        {content[language].exit}
      </button>
    </div>
  );
};

const App = () => {
  const [showGrid, setShowGrid] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [language, setLanguage] = useState('en');
  const [showVideo, setShowVideo] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);

  useEffect(() => {
    if (!showGrid) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [showGrid]);

  useEffect(() => {
    if (showGrid && !showVideo) {  // This condition is now false when video plays
      const timer = setTimeout(() => {
        setShowGrid(false);
      }, 300000);
      return () => clearTimeout(timer);  // This cleanup runs when dependencies change
    }
  }, [showGrid, showVideo]);

  const handleGridItemClick = (index) => {
    setSelectedVideoIndex(index);
    setShowVideo(true);
  };

  const handleVideoEnd = () => {
    setShowVideo(false);
    setSelectedVideoIndex(null);
  };

  const getColumnClass = (colIndex) => {
    return colIndex === 1 ? "space-y-4 flex flex-col" : "space-y-4 flex flex-col";
  };

  const getItemClass = (colIndex, rowIndex) => {
    const baseClasses = "relative cursor-pointer overflow-hidden rounded-xl transform transition-transform duration-300 hover:scale-[1.02]";
    
    // Middle column (colIndex 1)
    if (colIndex === 1) {
      if (rowIndex === 1) { // Middle item
        return `${baseClasses} flex-grow-[1.4]`;
      }
      return `${baseClasses} flex-grow`;
    }
    
    // Other columns
    return `${baseClasses} flex-1`;
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-400">
      {showVideo && selectedVideoIndex !== null && (
        <VideoPlayer
          videoUrl={videoUrls[selectedVideoIndex]}
          onVideoEnd={handleVideoEnd}
          onClose={handleVideoEnd}
          language={language}
        />
      )}
      
      {!showGrid ? (
        <div className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer">
          <div className="absolute inset-0 w-full h-full">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 
                  ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
              >
                <img
                  src={slide}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover opacity-75"
                />
              </div>
            ))}
          </div>
          
          <div className="relative z-10 text-white text-center">
            <h1 className="text-8xl mb-4 font-futura" onClick={() => {setShowGrid(true); setLanguage('en');}}>{content[language].explore}</h1>
            <h2 className="text-6xl font-futura" onClick={() => {setShowGrid(true); setLanguage('es');}}>
              {content[language === 'en' ? 'es' : 'en'].explore}
            </h2>
          </div>
        </div>
      ) :  (
        <div className="relative w-full h-full p-4 flex flex-col"> {/* Added flex flex-col */}
          {!showVideo && (
            <button
              onClick={() => setLanguage(prev => prev === 'en' ? 'es' : 'en')}
              className="absolute top-4 right-4 bg-white/80 hover:bg-white p-3 rounded-lg shadow-lg z-50 transition-colors"
            >
              {language === 'en' ? 'ES' : 'EN'}
            </button>
          )}
          
          <div className="grid grid-cols-3 gap-4 flex-1"> {/* Added flex-1 */}
            {[0, 1, 2].map(colIndex => (
              <div key={colIndex} className={getColumnClass(colIndex)}>
                {[0, 1, 2].map(rowIndex => {
                  const index = colIndex * 3 + rowIndex;
                  const title = content[language].gridTitles[index];
                  return (
                    <div
                      key={index}
                      onClick={() => handleGridItemClick(index)}
                      className={getItemClass(colIndex, rowIndex)}
                    >
                      <div className="w-full h-full relative"> {/* Added wrapper div */}
                        <img
                          src={slides[index % slides.length]}
                          alt={title}
                          className="absolute inset-0 w-full h-full object-cover opacity-75"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <h3 className="text-white text-2xl md:text-4xl font-futura text-center px-4">
                            {title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;