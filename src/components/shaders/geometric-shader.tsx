"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { PerspectiveCamera, RoundedBox } from "@react-three/drei"
import { useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"
import type { ReactNode } from "react"

interface GeometricShadersProps {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "custom"
  width?: string
  height?: string
  top?: string
  right?: string
  bottom?: string
  left?: string
  isDarkMode?: boolean
}

interface PositionProps {
  position?: [number, number, number]
  scale?: number | [number, number, number]
  rotation?: [number, number, number]
}

export default function GeometricShaders({
  width = "100%",
  height = "100%",

  isDarkMode = false,
}: GeometricShadersProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized position (-1 to 1) based on window dimensions
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1
      const normalizedY = -(e.clientY / window.innerHeight) * 2 + 1

      setMousePosition({ x: normalizedX, y: normalizedY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      className="absolute top-0 left-0 -z-10 pointer-events-none"
      style={{
        width,
        height,
      }}
    >
      <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <SceneController mousePosition={mousePosition}>
          {/* Top left - Dot Grid */}
          <DotGrid position={[-2, 1.8, 0]} isDarkMode={isDarkMode} />

          {/* Top center - Diagonal Lines */}
          <DiagonalLines position={[0, 2, 0]} scale={0.5} rotation={[0, 0, Math.PI / 4]} isDarkMode={isDarkMode} />


          {/* Middle left - Cube */}
          <CubeWithTexture position={[0, 0, 0]} isDarkMode={isDarkMode} />

          {/* Middle center - Small Dot Grid */}
          <DotGrid position={[1, 2, 0]} rows={3} columns={3} spacing={0.2} dotSize={0.02} isDarkMode={isDarkMode} />

          {/* Middle right - Small Cube */}
          <CubeWithTexture position={[2, 0, 0]} scale={0.8} isDarkMode={isDarkMode} />

          {/* Bottom right - Dot Grid */}
          <DotGrid position={[4, 0, 0]} rows={4} columns={4} isDarkMode={isDarkMode} />

        </SceneController>
      </Canvas>
    </div>
  )
}

function SceneController({
  children,
  mousePosition,
}: {
  children: ReactNode
  mousePosition: { x: number; y: number }
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (!groupRef.current) return

    // Target rotation - very subtle
    const targetRotationX = mousePosition.y * 0.03
    const targetRotationY = mousePosition.x * 0.03

    // Target position - very subtle
    const targetPositionX = mousePosition.x * 0.30
    const targetPositionY = mousePosition.y * 0.30

    // Smooth rotation transition
    groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.05
    groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.05

    // Smooth position transition
    groupRef.current.position.x += (targetPositionX - groupRef.current.position.x) * 0.05
    groupRef.current.position.y += (targetPositionY - groupRef.current.position.y) * 0.05
  })

  return <group ref={groupRef}>{children}</group>
}

// Dot Grid Component
interface DotGridProps extends PositionProps {
  rows?: number
  columns?: number
  spacing?: number
  dotSize?: number
  isDarkMode?: boolean
}

function DotGrid({
  position = [0, 0, 0] as [number, number, number],
  rows = 5,
  columns = 5,
  spacing = 0.25,
  dotSize = 0.03,
  isDarkMode = false,
}: DotGridProps) {
  // Calculate grid offset to center the grid
  const offsetX = ((columns - 1) * spacing) / 2
  const offsetY = ((rows - 1) * spacing) / 2

  // Generate grid positions
  const positions = useMemo(() => {
    const positions = []
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        positions.push({
          x: j * spacing - offsetX,
          y: i * spacing - offsetY,
          z: 0,
        })
      }
    }
    return positions
  }, [rows, columns, spacing, offsetX, offsetY])

  return (
    <group position={position}>
      {positions.map((pos, index) => (
        <Dot key={index} position={[pos.x, pos.y, pos.z]} size={dotSize} delay={index * 0.01} isDarkMode={isDarkMode} />
      ))}
    </group>
  )
}

// Dot Component with shaders
interface DotProps {
  position: [number, number, number]
  size: number
  delay?: number
  isDarkMode?: boolean
}

function Dot({ position, size, delay = 0, isDarkMode = false }: DotProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const time = useRef(delay)
  const color = isDarkMode ? "#CCCCCC" : "#333333"

  // Create shader material
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: delay },
        u_color: { value: new THREE.Color(color) },
        u_darkMode: { value: isDarkMode ? 1.0 : 0.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vUv = uv;
          vPosition = position;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float u_time;
        uniform vec3 u_color;
        uniform float u_darkMode;
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          float pattern = abs(sin(vPosition.x * 4.0 + u_time * 0.8)) *
                          abs(cos(vPosition.y * 4.0 + u_time * 0.6));
          
          float lighting = dot(vNormal, normalize(vec3(1.0, 1.0, 1.0))) * 0.5 + 0.5;
          pattern = mix(pattern, lighting, 0.3);
          
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
          vec3 finalColor = u_color * (pattern + fresnel * 0.5);
          
          // Adjust brightness for dark mode
          if (u_darkMode > 0.5) {
            finalColor = mix(finalColor, vec3(1.0), 0.2);
          }
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      side: THREE.DoubleSide,
    })
  }, [color, delay, isDarkMode])

  const geometry = useMemo(() => new THREE.SphereGeometry(size, 8, 8), [size])

  // Animate shader
  useFrame(() => {
    if (!meshRef.current) return
    time.current += 0.01
    material.uniforms.u_time.value = time.current
  })

  return (
    <mesh ref={meshRef} geometry={geometry} position={position}>
      <primitive object={material} attach="material" />
    </mesh>
  )
}

// Diagonal Lines Component
interface DiagonalLinesProps extends PositionProps {
  isDarkMode?: boolean
}

function DiagonalLines({
  position = [0, 0, 0] as [number, number, number],
  scale = 1,
  rotation = [0, 0, 0] as [number, number, number],
  isDarkMode = false,
}: DiagonalLinesProps) {
  const lineCount = 8
  const lineWidth = 0.01
  const lineLength = 2
  const lineSpacing = 0.15
  const color = isDarkMode ? "#CCCCCC" : "#333333"
  const lineGeometry = useMemo(() => new THREE.BoxGeometry(lineLength, lineWidth, lineWidth), [])
  const lineMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color }), [color])

  return (
    <group position={position} scale={scale} rotation={rotation}>
      {Array.from({ length: lineCount }).map((_, i) => (
        <mesh
          key={i}
          geometry={lineGeometry}
          material={lineMaterial}
          position={[0, i * lineSpacing - (lineCount * lineSpacing) / 2, 0] as [number, number, number]}
        />
      ))}
    </group>
  )
}

// Cube with Texture Component
interface CubeWithTextureProps extends PositionProps {
  isDarkMode?: boolean
}



function CubeWithTexture({
  // position = [-4, 0, 0] as [number, number, number],
  scale = 0.7,
  isDarkMode = false,
}: CubeWithTextureProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const time = useRef(0)

  // Create shader material for the cube
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_color: { value: new THREE.Color(isDarkMode ? "#EEEEEE" : "#444444") },
        u_darkMode: { value: isDarkMode ? 1.0 : 0.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vUv = uv;
          vPosition = position;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float u_time;
        uniform vec3 u_color;
        uniform float u_darkMode;
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        float grid(vec2 uv, float res) {
          vec2 grid = fract(uv * res);
          return step(0.95, max(grid.x, grid.y));
        }
        
        void main() {
          vec2 uv = vUv;
          
          // Create grid pattern
          float gridPattern = grid(uv, 10.0);
          
          // Create flowing patterns based on position
          float pattern = sin(vPosition.x * 5.0 + u_time * 0.2) * 
                         cos(vPosition.y * 5.0 + u_time * 0.3);
          
          // Add normal-based lighting
          float lighting = dot(vNormal, normalize(vec3(1.0, 1.0, 1.0))) * 0.5 + 0.5;
          
          // Edge highlighting
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
          
          // Final color with grid pattern
          vec3 gridColor = u_darkMode > 0.5 ? vec3(1.0) : vec3(1.0);
          vec3 finalColor = mix(u_color, gridColor, gridPattern * 0.5) * (lighting + pattern * 0.2 + fresnel * 0.3);
          
          // Add a bit more contrast in dark mode
          if (u_darkMode > 0.5) {
            finalColor = mix(finalColor, vec3(1.0), 0.1);
            fresnel *= 1.5;
            finalColor += vec3(fresnel * 0.3);
          }
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      side: THREE.DoubleSide,
    })
  }, [isDarkMode])

  // Animate shader
  useFrame(() => {
    if (!meshRef.current) return
    time.current += 0.01
    material.uniforms.u_time.value = time.current

    // Subtle rotation
    meshRef.current.rotation.x += 0.002
    meshRef.current.rotation.y += 0.003
  })

  return (
    <RoundedBox ref={meshRef} args={[0.8, 0.8, 0.8]} radius={0.05} position={[-4, 0, 0]} scale={scale}>
      <primitive object={material} attach="material" />
    </RoundedBox>
  )
}


