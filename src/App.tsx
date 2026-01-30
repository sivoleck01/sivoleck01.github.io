import { useState, useEffect, useCallback } from 'react';

// Componente de Monedas de Oro (Gold Coins Confetti)
function GoldCoins() {
  const [coins, setCoins] = useState<{ id: number; left: number; delay: number; duration: number; spinDuration: number }[]>([]);

  useEffect(() => {
    const newCoins = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 3,
      spinDuration: 0.5 + Math.random() * 0.5,
    }));
    setCoins(newCoins);
  }, []);

  return (
    <>
      {coins.map((c) => (
        <div
          key={c.id}
          className="gold-coin"
          style={{
            left: `${c.left}%`,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`,
          }}
        >
          <div
            className="gold-coin-inner"
            style={{ animationDuration: `${c.spinDuration}s` }}
          >
            ₿
          </div>
        </div>
      ))}
    </>
  );
}

// Componente del Reloj
function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="neon-green font-pixel text-xs">
      {time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </span>
  );
}

// Componente del Cofre del Tesoro
function TreasureChest({ onClick, isOpen }: { onClick: () => void; isOpen: boolean }) {
  return (
    <div
      className={`treasure-chest ${isOpen ? 'open' : ''}`}
      onClick={onClick}
    >
      <div className="chest-glow"></div>
      <div className="chest-body"></div>
      <div className="chest-lid"></div>
    </div>
  );
}

// Componente de Olas
function Waves() {
  const wavePattern = "~~~~~~";
  const fullWave = wavePattern.repeat(20);

  return (
    <div className="waves-container mt-4">
      <div className="waves-text">
        {fullWave.split('').map((char, i) => (
          <span
            key={i}
            className="wave-char"
            style={{ animationDelay: `${(i % 10) * 0.1}s` }}
          >
            {char}
          </span>
        ))}
        {fullWave.split('').map((char, i) => (
          <span
            key={`dup-${i}`}
            className="wave-char"
            style={{ animationDelay: `${(i % 10) * 0.1}s` }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}

// Componente del Barco
function SailingBoat() {
  return (
    <div className="flex flex-col items-center">
      <div className="animate-sail text-6xl">
        ⛵
      </div>
      <Waves />
    </div>
  );
}

// Componente del Cartel WANTED - Estilo One Piece Clásico  
function WantedPoster() {
  return (
    <div className="relative bg-amber-50 p-3 max-w-xs mx-auto"
      style={{
        background: 'linear-gradient(to bottom, #f4e4bc 0%, #e8d4a8 5%, #f5e6d3 15%, #f0dfc4 50%, #e8d4b5 85%, #d4a574 95%, #c49a6c 100%)',
        boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
        border: '3px solid #8B4513',
      }}>

      {/* Textura de papel viejo */}
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Bordes rasgados */}
      <div className="absolute -top-1 left-0 right-0 h-2 bg-amber-100 opacity-50"
        style={{ clipPath: 'polygon(0 100%, 5% 60%, 10% 100%, 15% 40%, 20% 100%, 25% 70%, 30% 100%, 35% 50%, 40% 100%, 45% 80%, 50% 100%, 55% 60%, 60% 100%, 65% 40%, 70% 100%, 75% 70%, 80% 100%, 85% 50%, 90% 100%, 95% 80%, 100% 100%)' }} />

      {/* Header WANTED */}
      <div className="text-center mb-2 relative">
        <h2 className="text-4xl font-bold text-amber-900 tracking-widest"
          style={{
            fontFamily: 'serif',
            textShadow: '2px 2px 0 rgba(0,0,0,0.3)',
            letterSpacing: '0.15em'
          }}>
          WANTED
        </h2>
      </div>

      {/* Foto */}
      <div className="relative mx-auto w-52 h-52 mb-2 border-2 border-amber-900 bg-amber-100 overflow-hidden">
        <img
          src="maria.jpg"
          alt="Maria La Calva Premium"
          className="w-full h-full object-cover grayscale-[30%] sepia-[30%]"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.parentElement!.innerHTML = `
              <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-200 to-amber-300">
                <span class="text-7xl opacity-40">👤</span>
              </div>
            `;
          }}
        />
      </div>

      {/* DEAD OR ALIVE */}
      <p className="text-center text-sm font-bold text-amber-900 mb-1"
        style={{ fontFamily: 'serif', letterSpacing: '0.1em' }}>
        DEAD OR ALIVE
      </p>

      {/* Nombre */}
      <h3 className="text-center text-2xl font-bold text-amber-950 mb-2"
        style={{ fontFamily: 'serif' }}>
        MARIA
      </h3>
      <p className="text-center text-sm text-amber-800 -mt-1 mb-2" style={{ fontFamily: 'serif' }}>
        "La Calva Premium"
      </p>

      {/* Recompensa */}
      <div className="text-center border-t-2 border-amber-900 pt-2">
        <p className="text-3xl font-bold text-amber-950" style={{ fontFamily: 'serif' }}>
          ฿ 1.000.000
        </p>
        <p className="text-xs text-amber-800 mt-1" style={{ fontFamily: 'serif' }}>
          (Un chicle y un abrazo)
        </p>
      </div>

      {/* Sello MARINE */}
      <div className="absolute bottom-3 right-3 w-12 h-12 opacity-40 rotate-[-15deg]">
        <div className="w-full h-full rounded-full border-2 border-blue-900 flex items-center justify-center bg-blue-100/30">
          <span className="text-blue-900 text-xs font-bold" style={{ fontFamily: 'serif' }}>MARINE</span>
        </div>
      </div>
    </div>
  );
}

// Cartelito de Info adicional
function InfoCard() {
  const startDate = new Date('2021-12-17');
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-gray-900/80 border border-cyan-500/30 rounded-lg p-4 max-w-xs mx-auto mt-6">
      <h4 className="font-pixel text-xs text-cyan-400 text-center mb-3">📋 FICHA PIRATA</h4>

      <div className="space-y-2 text-sm font-mono">
        <div className="flex justify-between">
          <span className="text-gray-500">Edad:</span>
          <span className="text-pink-400">22 años 🎂</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Servidor:</span>
          <span className="text-white">ES 🇪🇸</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">1er avistamiento:</span>
          <span className="text-amber-400">17/12/2021</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Días de viaje:</span>
          <span className="text-cyan-400">{diffDays} días ⏱️</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-700">
        <p className="font-pixel text-xs text-red-400 text-center mb-2">⚠️ HABILIDADES ⚠️</p>
        <ul className="text-xs text-gray-300 space-y-1">
          <li>✨ Flash por calvicie</li>
          <li>💘 Roba corazones</li>
        </ul>
      </div>
    </div>
  );
}

// Componente del Mensaje con Typewriter
function TypewriterMessage() {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const message = `31, 31... Mira que no me gustan nada los números impares, pero este me encanta... ¡porque es el día de mi queridísima MARIA!

Así que... ¡Muchísimas felicidades!

Quién nos iba a decir que han pasado ya 4 años, 1 mes y 14 días desde que nos conocimos (aquel 17 de diciembre de 2021)... ¡1506 días nada menos! Me flipa que ya cumplas 22 años, sobre todo pensando que te conocí cuando apenas tenías 18.

Como siempre, me hace mucha ilusión celebrar nuestra amistad, que es grandiosa y preciosa a pesar de los baches que hayamos podido tener. Siempre habrá un día que se me quedará grabado a fuego: en el patio de segundo de la ESO, un diciembre en el que un amigo me cogió el móvil para mirar mis contactos y soltó algo sobre ti. Yo, que estaba en mi burbuja, tuve la genial idea de decirte lo que había dicho (no quiero ni nombrarlo) y luego, claro, no supe gestionar la situación. Cada vez que me viene ese recuerdo, me doy cuenta de lo mucho que he evolucionado a tu lado, aunque no hablemos con tanta frecuencia como antes.

También recuerdo con muchísima nostalgia las noches de Fortnite (que ya ni lo tengo instalado), el reírme de ti en el Valorant aunque yo sea igual de malo JASJS, y la de horas que hemos pasado en llamadas, ya fuera a solas o con Sumi y el resto.

En fin... que me lío. Solo quiero que sepas que te quiero muchísimo y que eres una persona muy especial para mí. Espero que pases un día fantástico porque te lo mereces más que nadie. ¡Disfruta de tus 22!`;

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < message.length) {
        setDisplayedText(message.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Rollo superior */}
      <div className="scroll-edge-top mx-4" />

      {/* Cuerpo del pergamino */}
      <div className="parchment-bg p-6 mx-2 shadow-2xl relative overflow-hidden"
        style={{
          borderLeft: '8px solid #8B5A2B',
          borderRight: '8px solid #8B5A2B',
        }}>

        {/* Header del pergamino */}
        <div className="text-center mb-4 pb-3 border-b-2 border-amber-700 relative">
          <h2 className="text-xl text-amber-900 font-bold" style={{ fontFamily: 'serif' }}>
            Carta de clovis para su calva favorita
          </h2>
        </div>

        {/* Contenido del mensaje */}
        <div className="text-amber-900 leading-relaxed whitespace-pre-line text-sm md:text-base relative z-10"
          style={{ fontFamily: 'serif' }}>
          {displayedText}
          {!isComplete && <span className="typewriter-cursor"></span>}
        </div>

        {/* Firma con sello */}
        {isComplete && (
          <div className="mt-6 flex justify-end items-center gap-4">
            <div className="text-right">
              <p className="text-amber-800 italic text-sm" style={{ fontFamily: 'serif' }}>~ Clovis ~</p>
              <p className="text-amber-700 text-xs mt-1" style={{ fontFamily: 'serif' }}>31/1/2026</p>
            </div>
            <div className="w-16 h-16 rounded-full border-3 border-red-800 flex items-center justify-center bg-red-100/50 rotate-[-10deg]">
              <span className="text-2xl">🇫🇷</span>
            </div>
          </div>
        )}
      </div>

      {/* Rollo inferior */}
      <div className="scroll-edge-bottom mx-4" />
    </div>
  );
}

// Componente Principal
export function App() {
  const [screen, setScreen] = useState<'login' | 'main' | 'scroll'>('login');
  const [transitioning, setTransitioning] = useState(false);
  const [chestOpen, setChestOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSetSail = useCallback(() => {
    setTransitioning(true);
    setTimeout(() => {
      setScreen('main');
      setTransitioning(false);
    }, 500);
  }, []);

  const handleChestClick = useCallback(() => {
    setChestOpen(true);
    setTimeout(() => {
      setShowConfetti(true);
      setScreen('scroll');
    }, 600);
  }, []);

  const handleBack = useCallback(() => {
    setShowConfetti(false);
    setChestOpen(false);
    setScreen('main');
  }, []);

  return (
    <div className="min-h-screen bg-[#050510] text-cyan-400 scanlines noise overflow-x-hidden">
      {/* Confetti */}
      {showConfetti && <GoldCoins />}

      {/* Pantalla de Login - Grand Line */}
      {screen === 'login' && (
        <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${transitioning ? 'animate-fade-out' : 'animate-fade-in'}`}>
          {/* Fondo con estrellas */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  opacity: Math.random() * 0.7 + 0.3,
                }}
              />
            ))}
          </div>

          {/* Contenido */}
          <div className="text-center z-10">
            {/* Terminal header */}
            <div className="mb-8 space-y-2">
              <p className="font-pixel text-xs text-red-500 animate-pulse">
                ⚠️ SYSTEM BREACH DETECTED ⚠️
              </p>
              <h1 className="font-pixel text-2xl md:text-4xl neon-pink glitch">
                GRAND LINE
              </h1>
              <p className="font-mono text-sm neon-cyan mt-2">
                Target: Maria <span className="text-pink-400">"Calva Premium"</span>
              </p>
              <p className="font-mono text-xs text-gray-500">
                [UNAUTHORIZED ACCESS GRANTED]
              </p>
            </div>

            {/* Barco animado con olas */}
            <div className="my-12">
              <SailingBoat />
            </div>

            {/* Botón ZARPAR */}
            <button
              onClick={handleSetSail}
              className="font-pixel text-sm md:text-base px-8 py-4 bg-gradient-to-r from-cyan-600 to-pink-600 rounded-lg 
                         hover:from-pink-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105
                         shadow-md border-2 border-cyan-400/50
                         text-white"
            >
              ZARPAR &gt;&gt;
            </button>

            <p className="mt-6 font-mono text-xs text-gray-600">
              Presiona para iniciar la aventura...
            </p>
          </div>
        </div>
      )}

      {/* Pantalla Principal */}
      {screen === 'main' && (
        <div className="min-h-screen p-4 animate-fade-in">
          {/* Header */}
          <header className="flex flex-wrap justify-between items-center mb-6 p-3 bg-gray-900/80 rounded-lg border border-cyan-500/20">
            <div className="flex items-center gap-3">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="font-mono text-xs text-green-400">SERVER: ONLINE</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-gray-500">LOCAL TIME:</span>
              <Clock />
            </div>
          </header>

          {/* Título */}
          <div className="text-center mb-6">
            <h1 className="font-pixel text-xl md:text-3xl neon-pink mb-2">
              🎂 FELIZ 22, MARIA 🎂
            </h1>
            <p className="font-mono text-sm neon-cyan">
              La Calva Más Buscada del Grand Line
            </p>
          </div>

          {/* Cartel WANTED */}
          <div className="mb-4 animate-float">
            <WantedPoster />
          </div>

          {/* Info Card */}
          <div className="mb-8">
            <InfoCard />
          </div>

          {/* Cofre del Tesoro */}
          <div className="text-center">
            <p className="font-pixel text-xs neon-gold mb-4 animate-pulse">
              🔓 CLICK EN EL COFRE PARA TU REGALO 🔓
            </p>
            <div className="flex justify-center">
              <TreasureChest onClick={handleChestClick} isOpen={chestOpen} />
            </div>
            <p className="font-mono text-xs text-gray-600 mt-4">
              ¿Qué tesoro esconde...? 💎
            </p>
          </div>

          {/* Footer */}
          <footer className="mt-8 text-center">
            <p className="font-mono text-xs text-gray-600">
              Hecho con 💖 para la mejor nakama
            </p>
          </footer>
        </div>
      )}

      {/* Sección del Pergamino */}
      {screen === 'scroll' && (
        <div className="fixed inset-0 z-50 bg-gradient-radial from-gray-900 via-gray-950 to-black flex items-center justify-center p-4 overflow-y-auto"
          style={{ background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0f0f1a 50%, #050510 100%)' }}>
          <div className="w-full max-w-3xl my-8 animate-fade-in">
            {/* Pergamino */}
            <div className="scroll-unroll">
              <TypewriterMessage />
            </div>

            {/* Botón Volver */}
            <div className="text-center mt-6">
              <button
                onClick={handleBack}
                className="font-pixel text-xs px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-800 rounded-lg 
                           hover:from-amber-700 hover:to-amber-900 transition-all duration-300 transform hover:scale-105
                           shadow-lg border-2 border-amber-500 text-amber-100"
              >
                ← VOLVER AL BARCO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
