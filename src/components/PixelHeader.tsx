import React from 'react';
import { Volume2, VolumeX, Monitor, Sparkles } from 'lucide-react';
import { RetroTheme, TemperatureUnit } from '../types';
import { soundFx } from '../utils/audio';

interface PixelHeaderProps {
  unit: TemperatureUnit;
  onToggleUnit: () => void;
  theme: RetroTheme;
  onChangeTheme: (theme: RetroTheme) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  crtEnabled: boolean;
  onToggleCrt: () => void;
}

export const PixelHeader: React.FC<PixelHeaderProps> = ({
  unit,
  onToggleUnit,
  theme,
  onChangeTheme,
  soundEnabled,
  onToggleSound,
  crtEnabled,
  onToggleCrt,
}) => {
  return (
    <header className="border-b-4 border-white bg-zinc-950 px-4 py-4 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Brand Logo / Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white text-black font-pixel-heading text-xl flex items-center justify-center font-black border-2 border-white shadow-brutal-white shrink-0">
            W
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-pixel-heading text-lg md:text-xl font-black uppercase tracking-tighter text-white">
                WEATHER_OS v2.0
              </h1>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 border border-emerald-400 font-mono font-bold uppercase tracking-widest animate-pulse">
                SYS_ACTIVE
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono mt-0.5 uppercase tracking-wide hidden sm:block">
              [ Status: Active // Open-Meteo Data Stream ]
            </p>
          </div>
        </div>

        {/* Right: Controls & Options */}
        <div className="flex items-center flex-wrap justify-end gap-2.5 text-xs font-mono">
          {/* Unit Switcher Button */}
          <button
            onClick={() => {
              soundFx.playToggle();
              onToggleUnit();
            }}
            title="Toggle Temperature Unit (°C / °F)"
            className="px-3 py-1.5 bg-zinc-900 text-white hover:bg-zinc-800 border-2 border-white font-bold text-xs uppercase transition shadow-brutal-white flex items-center gap-1.5"
          >
            <span className="text-zinc-400">UNIT:</span>
            <span className="text-emerald-400 font-black">{unit === 'C' ? '°C (METRIC)' : '°F (IMPERIAL)'}</span>
          </button>

          {/* Theme Dropdown */}
          <div className="relative flex items-center">
            <select
              value={theme}
              onChange={(e) => {
                soundFx.playClick();
                onChangeTheme(e.target.value as RetroTheme);
              }}
              className="bg-zinc-900 text-white border-2 border-white px-2.5 py-1.5 text-xs font-bold uppercase focus:outline-none focus:border-emerald-400 cursor-pointer shadow-brutal-white"
            >
              <option value="cyberpunk">MINIMAL MONO</option>
              <option value="classic-dark">ARCADE DARK</option>
              <option value="gameboy">GAMEBOY MATRIX</option>
              <option value="sunset">SYNTH RETRO</option>
            </select>
          </div>

          {/* CRT Overlay Toggle */}
          <button
            onClick={() => {
              soundFx.playToggle();
              onToggleCrt();
            }}
            title={crtEnabled ? 'Disable CRT Scanlines' : 'Enable CRT Scanlines'}
            className={`p-2 border-2 font-mono text-xs transition shadow-brutal-white flex items-center gap-1 ${
              crtEnabled
                ? 'bg-emerald-400 text-black border-white font-bold'
                : 'bg-zinc-900 text-zinc-400 border-white hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span className="hidden sm:inline uppercase text-[10px] font-bold">CRT</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              soundFx.playSelect();
            }}
            title={soundEnabled ? 'Mute Chiptune Sound FX' : 'Enable Chiptune Sound FX'}
            className={`p-2 border-2 font-mono text-xs transition shadow-brutal-white flex items-center gap-1 ${
              soundEnabled
                ? 'bg-white text-black border-white font-bold'
                : 'bg-zinc-900 text-zinc-500 border-white'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline uppercase text-[10px] font-bold">AUDIO</span>
          </button>
        </div>
      </div>
    </header>
  );
};

