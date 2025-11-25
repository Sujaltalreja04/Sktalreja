import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Move, Eye, Info } from 'lucide-react';

interface Museum3DGalleryProps {
    isOpen: boolean;
    onClose: () => void;
    project: {
        title: string;
        description: string;
        image: string;
        tags: string[];
        projectUrl?: string;
        githubUrl?: string;
        videoUrl?: string;
    };
}

// Museum Room Component
function MuseumRoom({ projectImage }: { projectImage: string }) {
    const texture = useTexture(projectImage);

    return (
        <group>
            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
                <planeGeometry args={[30, 30]} />
                <meshStandardMaterial
                    color="#1a1a1a"
                    roughness={0.3}
                    metalness={0.7}
                />
            </mesh>

            {/* Ceiling */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 6, 0]}>
                <planeGeometry args={[30, 30]} />
                <meshStandardMaterial color="#0a0a0a" />
            </mesh>

            {/* Back Wall */}
            <mesh position={[0, 2, -10]} receiveShadow>
                <planeGeometry args={[30, 10]} />
                <meshStandardMaterial color="#2a2a2a" />
            </mesh>

            {/* Left Wall */}
            <mesh position={[-15, 2, 5]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[30, 10]} />
                <meshStandardMaterial color="#2a2a2a" />
            </mesh>

            {/* Right Wall */}
            <mesh position={[15, 2, 5]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[30, 10]} />
                <meshStandardMaterial color="#2a2a2a" />
            </mesh>

            {/* Project Display Frame - Main Attraction */}
            <group position={[0, 1.5, -9.8]}>
                {/* Frame Border */}
                <mesh position={[0, 0, 0.01]}>
                    <boxGeometry args={[8.4, 5.4, 0.2]} />
                    <meshStandardMaterial
                        color="#c0c0c0"
                        metalness={0.9}
                        roughness={0.1}
                    />
                </mesh>

                {/* Project Image */}
                <mesh position={[0, 0, 0.11]}>
                    <planeGeometry args={[8, 5]} />
                    <meshStandardMaterial
                        map={texture}
                        emissive="#ffffff"
                        emissiveIntensity={0.2}
                    />
                </mesh>

                {/* Spotlight on the frame */}
                <spotLight
                    position={[0, 3, 2]}
                    angle={0.5}
                    penumbra={0.5}
                    intensity={2}
                    castShadow
                    target-position={[0, 0, 0]}
                />
            </group>

            {/* Pedestal for interactive info */}
            <mesh position={[0, -1, -7]} castShadow>
                <cylinderGeometry args={[0.8, 1, 2, 32]} />
                <meshStandardMaterial
                    color="#3a3a3a"
                    metalness={0.6}
                    roughness={0.4}
                />
            </mesh>

            {/* Ambient lighting spheres (decorative) */}
            <mesh position={[-8, 4, -8]}>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshStandardMaterial
                    color="#00ffff"
                    emissive="#00ffff"
                    emissiveIntensity={0.5}
                />
            </mesh>

            <mesh position={[8, 4, -8]}>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshStandardMaterial
                    color="#ff00ff"
                    emissive="#ff00ff"
                    emissiveIntensity={0.5}
                />
            </mesh>
        </group>
    );
}

// Floating Info Panel in 3D Space
function FloatingInfoPanel({ project, position }: { project: any; position: [number, number, number] }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
        }
    });

    return (
        <group position={position}>
            <Html
                transform
                distanceFactor={2}
                style={{
                    width: '400px',
                    background: 'rgba(26, 26, 26, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(192, 192, 192, 0.3)',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.8)',
                }}
            >
                <div style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    <h3 style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        marginBottom: '12px',
                        background: 'linear-gradient(to right, #d1d5db, #9ca3af)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        {project.title}
                    </h3>
                    <p style={{
                        color: '#9ca3af',
                        fontSize: '14px',
                        marginBottom: '16px',
                        lineHeight: '1.6'
                    }}>
                        {project.description}
                    </p>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginBottom: '16px'
                    }}>
                        {project.tags.map((tag: string, i: number) => (
                            <span
                                key={i}
                                style={{
                                    background: 'rgba(192, 192, 192, 0.1)',
                                    border: '1px solid rgba(192, 192, 192, 0.2)',
                                    borderRadius: '12px',
                                    padding: '4px 12px',
                                    fontSize: '12px',
                                    color: '#d1d5db',
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </Html>
            <mesh ref={meshRef}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial
                    color="#00ffff"
                    emissive="#00ffff"
                    emissiveIntensity={1}
                />
            </mesh>
        </group>
    );
}

// Camera Controller for smooth navigation
function CameraController() {
    const { camera } = useThree();
    const [keys, setKeys] = useState<Set<string>>(new Set());

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setKeys(prev => new Set(prev).add(e.key.toLowerCase()));
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            setKeys(prev => {
                const newSet = new Set(prev);
                newSet.delete(e.key.toLowerCase());
                return newSet;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useFrame(() => {
        const speed = 0.1;
        const direction = new THREE.Vector3();

        camera.getWorldDirection(direction);
        direction.y = 0;
        direction.normalize();

        const right = new THREE.Vector3();
        right.crossVectors(camera.up, direction).normalize();

        // WASD Controls
        if (keys.has('w') || keys.has('arrowup')) {
            camera.position.addScaledVector(direction, -speed);
        }
        if (keys.has('s') || keys.has('arrowdown')) {
            camera.position.addScaledVector(direction, speed);
        }
        if (keys.has('a') || keys.has('arrowleft')) {
            camera.position.addScaledVector(right, speed);
        }
        if (keys.has('d') || keys.has('arrowright')) {
            camera.position.addScaledVector(right, -speed);
        }

        // Keep camera at a reasonable height
        camera.position.y = Math.max(0, Math.min(4, camera.position.y));

        // Boundary constraints
        camera.position.x = Math.max(-12, Math.min(12, camera.position.x));
        camera.position.z = Math.max(-5, Math.min(15, camera.position.z));
    });

    return null;
}

export const Museum3DGallery: React.FC<Museum3DGalleryProps> = ({
    isOpen,
    onClose,
    project
}) => {
    const [showInstructions, setShowInstructions] = useState(true);

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => setShowInstructions(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 bg-black"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 z-50 p-3 backdrop-blur-md bg-[rgba(26,26,26,0.8)] border border-[rgba(192,192,192,0.3)] rounded-xl text-gray-300 hover:bg-[rgba(192,192,192,0.2)] transition-all"
                    >
                        <X size={24} />
                    </button>

                    {/* Title Banner */}
                    <motion.div
                        initial={{ y: -100 }}
                        animate={{ y: 0 }}
                        className="absolute top-6 left-6 z-50 backdrop-blur-md bg-[rgba(26,26,26,0.8)] border border-[rgba(192,192,192,0.3)] rounded-xl px-6 py-4"
                    >
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent flex items-center gap-3">
                            <Eye className="text-cyan-400" size={28} />
                            3D Museum Gallery
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">{project.title}</p>
                    </motion.div>

                    {/* Instructions Panel */}
                    <AnimatePresence>
                        {showInstructions && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 backdrop-blur-md bg-[rgba(26,26,26,0.9)] border border-[rgba(192,192,192,0.3)] rounded-xl px-8 py-4 max-w-2xl"
                            >
                                <div className="flex items-start gap-4">
                                    <Info className="text-cyan-400 flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">Navigation Controls</h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                                            <div className="flex items-center gap-2">
                                                <Move size={16} className="text-cyan-400" />
                                                <span><strong>WASD</strong> or <strong>Arrow Keys</strong> - Move around</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Eye size={16} className="text-cyan-400" />
                                                <span><strong>Mouse Drag</strong> - Look around</span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-3">Explore the gallery and walk closer to the project display!</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Action Buttons */}
                    <div className="absolute bottom-6 right-6 z-50 flex flex-col gap-3">
                        {project.projectUrl && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.open(project.projectUrl, '_blank')}
                                className="px-6 py-3 backdrop-blur-md bg-[rgba(26,26,26,0.8)] border border-[rgba(192,192,192,0.3)] rounded-xl text-gray-300 hover:bg-cyan-500/20 transition-all font-semibold"
                            >
                                Visit Live Project
                            </motion.button>
                        )}
                        {project.videoUrl && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.open(project.videoUrl, '_blank')}
                                className="px-6 py-3 backdrop-blur-md bg-[rgba(26,26,26,0.8)] border border-[rgba(192,192,192,0.3)] rounded-xl text-gray-300 hover:bg-purple-500/20 transition-all font-semibold"
                            >
                                Watch Demo Video
                            </motion.button>
                        )}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowInstructions(!showInstructions)}
                            className="px-6 py-3 backdrop-blur-md bg-[rgba(26,26,26,0.8)] border border-[rgba(192,192,192,0.3)] rounded-xl text-gray-300 hover:bg-gray-500/20 transition-all font-semibold"
                        >
                            {showInstructions ? 'Hide' : 'Show'} Controls
                        </motion.button>
                    </div>

                    {/* 3D Canvas */}
                    <Canvas shadows>
                        <PerspectiveCamera makeDefault position={[0, 1, 10]} fov={75} />

                        {/* Lighting Setup */}
                        <ambientLight intensity={0.3} />
                        <directionalLight
                            position={[10, 10, 5]}
                            intensity={0.5}
                            castShadow
                        />
                        <pointLight position={[0, 5, 0]} intensity={0.8} color="#ffffff" />
                        <pointLight position={[-8, 4, -8]} intensity={0.5} color="#00ffff" />
                        <pointLight position={[8, 4, -8]} intensity={0.5} color="#ff00ff" />

                        {/* Museum Environment */}
                        <MuseumRoom projectImage={project.image} />

                        {/* Floating Info Panel */}
                        <FloatingInfoPanel project={project} position={[0, 0.5, -7]} />

                        {/* Camera Controls */}
                        <OrbitControls
                            enablePan={false}
                            enableZoom={true}
                            minDistance={2}
                            maxDistance={15}
                            maxPolarAngle={Math.PI / 2}
                            target={[0, 1, -5]}
                        />
                        <CameraController />

                        {/* Fog for depth */}
                        <fog attach="fog" args={['#0a0a0a', 15, 30]} />
                    </Canvas>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
