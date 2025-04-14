import React, { useState } from 'react';
import './ShoeCustomizer.css';

const ShoeCustomizer = () => {
  const [colors, setColors] = useState({
    sole: '#222222',
    logo: '#ffffff',
    upper: '#6e00ff'
  });

  const [texture, setTexture] = useState('matte');
  const [textureIntensity, setTextureIntensity] = useState(50);
  const [rotation, setRotation] = useState({ x: 5, y: 5 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPreset, setCurrentPreset] = useState('custom');

  const colorPresets = {
    classic: { sole: '#222222', logo: '#ffffff', upper: '#000000' },
    neon: { sole: '#111111', logo: '#00fffb', upper: '#ff00aa' },
    sunset: { sole: '#333333', logo: '#ffffff', upper: '#ff6b00' },
    ocean: { sole: '#003366', logo: '#ffffff', upper: '#00a8ff' },
    custom: { ...colors }
  };

  // Apply preset
  const applyPreset = (presetName) => {
    setColors(colorPresets[presetName]);
    setCurrentPreset(presetName);
  };

  // Handle mouse down for rotation
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  // Handle mouse move for rotation
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    
    setRotation(prev => ({
      x: Math.max(-20, Math.min(20, prev.x + deltaY * 0.2)),
      y: Math.max(-20, Math.min(20, prev.y - deltaX * 0.2))
    }));
    
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  // Handle mouse up
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Reset rotation
  const resetRotation = () => {
    setRotation({ x: 5, y: 5 });
  };

  // RGB to HSL conversion
  const rgbToHsl = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    return [h * 360, s, l];
  };

  // Improved hex to filter converter
  const hexToFilter = (hexColor) => {
    if (hexColor === '#ffffff') return 'none';
    
    // Remove # if present
    const hex = hexColor.replace('#', '');
    
    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Calculate HSL values
    const [hue] = rgbToHsl(r, g, b);
    
    return `brightness(0.7) sepia(1) hue-rotate(${hue}deg) saturate(80%) brightness(1.2)`;
  };

  // Texture effect based on intensity
  const getTextureEffect = () => {
    const intensity = textureIntensity / 100;
    if (texture === 'matte') {
      return `contrast(${1 + intensity}) brightness(${1 - intensity * 0.2})`;
    }
    return `brightness(${1 + intensity * 0.3}) contrast(${1 + intensity * 0.2}) drop-shadow(0 0 ${intensity * 5}px rgba(255,255,255,${intensity * 0.5}))`;
  };

  return (
    <div 
      className="customizer-container" 
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <h2>CUSTOMISED NIKE AIR FORCE</h2>
      <p className="subtitle">Drag to rotate • Click presets for quick styles</p>
      
      <div className="preset-selector">
        {Object.keys(colorPresets).map(preset => (
          <button 
            key={preset}
            className={currentPreset === preset ? 'active' : ''}
            onClick={() => applyPreset(preset)}
          >
            {preset.charAt(0).toUpperCase() + preset.slice(1)}
          </button>
        ))}
      </div>
      
      <div 
        className="shoe-preview" 
        onMouseDown={handleMouseDown}
        style={{ perspective: `${1000 - rotation.x * 10}px` }}
      >
        {/* Sole */}
        <img 
          src="/images/sole.png" 
          alt="Sole" 
          className="shoe-part sole"
          style={{ 
            filter: `${hexToFilter(colors.sole)}`,
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateY(15px)`,
            zIndex: 1
          }}
        />
        
        {/* Upper */}
        <img 
          src="/images/upper.png" 
          alt="Upper" 
          className="shoe-part upper"
          style={{ 
            filter: `${hexToFilter(colors.upper)} ${getTextureEffect()}`,
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            zIndex: 2
          }}
        />
        
        {/* Logo */}
        <img 
          src="/images/nike_logo.png" 
          alt="Logo" 
          className="shoe-part logo"
          style={{ 
            filter: hexToFilter(colors.logo),
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            zIndex: 3
          }}
        />
        
        <div className={`gloss-effect ${texture === 'gloss' ? 'visible' : ''}`}></div>
        
        {/* <button className="reset-rotation" onClick={resetRotation}>
          <i className="icon-reset"></i> Reset View
        </button> */}
      </div>

      <div className="controls-container">
        <div className="color-controls">
          <div className="color-picker">
            <label>
              <span>Sole</span>
              <input 
                type="color" 
                value={colors.sole}
                onChange={(e) => {
                  setColors({...colors, sole: e.target.value});
                  setCurrentPreset('custom');
                }}
              />
            </label>
          </div>
          
          <div className="color-picker">
            <label>
              <span>Upper</span>
              <input 
                type="color" 
                value={colors.upper}
                onChange={(e) => {
                  setColors({...colors, upper: e.target.value});
                  setCurrentPreset('custom');
                }}
              />
            </label>
          </div>
          
          <div className="color-picker">
            <label>
              <span>Logo</span>
              <input 
                type="color" 
                value={colors.logo}
                onChange={(e) => {
                  setColors({...colors, logo: e.target.value});
                  setCurrentPreset('custom');
                }}
              />
            </label>
          </div>
        </div>

        <div className="texture-controls">
          <div className="texture-buttons">
            <button 
              className={texture === 'matte' ? 'active' : ''}
              onClick={() => setTexture('matte')}
            >
              <i className="icon-matte"></i> Matte
            </button>
            <button 
              className={texture === 'gloss' ? 'active' : ''}
              onClick={() => setTexture('gloss')}
            >
              <i className="icon-gloss"></i> Gloss
            </button>
          </div>
          
          <div className="intensity-slider">
            <label>Texture Intensity</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={textureIntensity}
              onChange={(e) => setTextureIntensity(parseInt(e.target.value, 10))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoeCustomizer;