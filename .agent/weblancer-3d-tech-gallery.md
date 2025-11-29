# Weblancer 3D Tech Gallery

## Overview
A futuristic, cyberpunk-themed 3D gallery specifically designed for the Weblancer Tech project. This replaces the museum theme with a high-tech, neon-lit environment while maintaining the same orange/red color scheme as QuickCourt.

## Features

### 🎨 Visual Theme
- **Tech Environment**: Futuristic cyber-themed room instead of museum
- **Color Scheme**: QuickCourt's orange/red palette (#ff4500, #ff6b00, #ffaa00)
- **Neon Aesthetics**: Glowing tech elements and holographic effects

### 🌟 3D Elements

#### 1. **Floating Data Cubes**
- 15 animated wireframe cubes floating in the space
- Rotating and bobbing animation
- Orange/red neon glow

#### 2. **Holographic Rings**
- Three concentric rotating rings around the project display
- Different opacity levels for depth
- QuickCourt color gradient

#### 3. **Circuit Board Floor Pattern**
- Grid-based circuit pattern on reflective floor
- Horizontal and vertical neon lines
- Subtle glow effect

#### 4. **Tech Display Frame**
- Angular, futuristic frame design
- Metallic dark gray with orange glow
- Corner accent lights
- Holographic glass overlay

#### 5. **Neon Ceiling Lights**
- Geometric light fixtures (boxes and cylinders)
- Volumetric light beams
- Orange/red color scheme
- Dynamic spotlight effects

#### 6. **Interactive Tech Nodes**
- Octahedron wireframe info points
- Rotating outer rings
- Hover and click interactions
- Tech-styled info panels

### 🎮 Interactive Features
- **WASD / Arrow Keys**: First-person movement
- **Mouse Drag**: Camera rotation
- **Auto-Tour**: 30-second guided tour (6 segments)
- **Background Music**: Tech-themed audio plays during auto-tour
- **Info Points**: Clickable tech nodes with project details

### 🚀 Technical Highlights
- Built with **React Three Fiber**
- **drei** helpers for advanced effects
- **Framer Motion** for UI animations
- **MeshReflectorMaterial** for premium floor reflections
- **Environment** preset for atmospheric lighting
- **Fog** for depth perception

## File Structure

```
src/components/3d/
├── Tech3DGalleryStandalone.tsx  (Main component)

public/
├── tech3d.html                   (Standalone HTML page)
```

## How to Use

### 1. **From Project Card**
Click the **"VIEW IN 3D TECH GALLERY"** button on the Weblancer project card (orange/red styled button)

### 2. **Direct Access**
Open `/tech3d.html` directly in your browser

### 3. **Embedding**
```tsx
import { Tech3DGalleryStandalone } from './components/3d/Tech3DGalleryStandalone';

<Tech3DGalleryStandalone project={weblancerProject} />
```

## Color Comparison

### QuickCourt Museum Theme
- Primary: `#ff4500` (Orange Red)
- Secondary: `#ff6b00` (Orange)
- Accent: `#ffaa00` (Light Orange)
- Theme: Museum/Exhibition Hall

### Weblancer Tech Theme
- Primary: `#ff4500` (Orange Red) ✓ Same
- Secondary: `#ff6b00` (Orange) ✓ Same
- Accent: `#ffaa00` (Light Orange) ✓ Same
- Theme: Tech/Cyberpunk Environment ✓ Different

## Theme Differences

| Feature | Museum (QuickCourt) | Tech (Weblancer) |
|---------|-------------------|-----------------|
| Environment | Classic gallery hall | Futuristic tech room |
| Floor Pattern | Reflective plain | Circuit board grid |
| Ceiling Lights | Spherical orbs | Geometric fixtures |
| Display Frame | Premium metallic | Angular tech design |
| Floating Elements | Particles | Data cubes + rings |
| Atmosphere | Elegant museum | Cyberpunk tech |

## Performance

- **Optimized**: Efficient geometry and materials
- **Lazy Loading**: Suspense with loading fallback
- **Responsive**: Adapts to different screen sizes
- **Smooth**: 60 FPS target with proper optimization

## Browser Support

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

## Future Enhancements

- [ ] Add more interactive tech elements
- [ ] Implement shader effects
- [ ] Add sound effects
- [ ] Create mobile-optimized version
- [ ] Add VR support

## Credits

Created for the Weblancer Tech project portfolio showcase.
Uses the same color palette as QuickCourt but with a completely different futuristic tech theme.
