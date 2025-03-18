"use client"
import { Html, useProgress, useGLTF } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense, useRef, useState, useEffect, useMemo } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"

// Define the props for the Goat component
interface GoatProps {
	scale?: number
	rotationSpeed?: number
	position?: [number, number, number]
	lightIntensity?: number
	lightColor?: string
	rotationLimit?: number
	verticalRotationLimit?: number
	pointSize?: number
	pointColor?: string
	pointDensity?: number
}

export default function Goat({
	scale = 5,
	rotationSpeed = 0.01,
	position = [0, 0, 0],
	lightIntensity = 100,
	lightColor = "white",
	rotationLimit = Math.PI / 3, // Default to 60 degrees
	verticalRotationLimit = Math.PI / 6, // Default to 30 degrees
	pointSize = 0.01,
	pointColor = "#000",
	pointDensity = 1,
}: GoatProps = {}) {
	return (
		<div className="relative w-full h-full">
			<Canvas style={{ width: "100%", height: "100%" }}>
				<ambientLight intensity={0.2} />
				<directionalLight color={lightColor} position={[0, 0, 5]} intensity={lightIntensity} />
				<pointLight position={[-10, 0, -10]} intensity={0.5} />
				<pointLight position={[10, 10, 10]} intensity={0.3} />
				<Suspense fallback={<Loader />}>
					<Scene 
						scale={scale} 
						rotationSpeed={rotationSpeed} 
						position={position} 
						rotationLimit={rotationLimit} 
						verticalRotationLimit={verticalRotationLimit}
						pointSize={pointSize}
						pointColor={pointColor}
						pointDensity={pointDensity}
					/>
				</Suspense>
			</Canvas>
		</div>
	)
}

interface SceneProps {
	scale: number
	rotationSpeed: number
	position: [number, number, number]
	rotationLimit: number
	verticalRotationLimit: number
	pointSize: number
	pointColor: string
	pointDensity: number
}

function Scene({ 
	scale, 
	rotationSpeed, 
	position, 
	rotationLimit, 
	verticalRotationLimit,
	pointSize,
	pointColor,
	pointDensity 
}: SceneProps) {
	const { scene } = useGLTF("/goat.glb")
	const modelRef = useRef<THREE.Group>(null)
	const [isHovering, setIsHovering] = useState(false)
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

	// Create points representation of the model
	const points = useMemo(() => {
		// Find the mesh in the scene
		let meshGeometry: THREE.BufferGeometry | null = null;
		
		scene.traverse((child) => {
			if (child instanceof THREE.Mesh && child.geometry) {
				// Hide the original mesh
				child.visible = false;
				// Get the geometry
				meshGeometry = child.geometry.clone();
			}
		});

		if (!meshGeometry) return null;
		
		// Type assertion to ensure TypeScript recognizes this is a valid BufferGeometry
		const geometry = meshGeometry as THREE.BufferGeometry & {
			attributes: {
				position: THREE.BufferAttribute | THREE.InterleavedBufferAttribute;
			};
		};

		// Ensure we have a position attribute
		if (!geometry.attributes.position) return null;

		// Optionally reduce point density by sampling
		if (pointDensity < 1) {
			const positions = geometry.attributes.position;
			const count = Math.floor(positions.count * pointDensity);
			const sampledPositions = new Float32Array(count * 3);
			
			for (let i = 0; i < count; i++) {
				const index = Math.floor(Math.random() * positions.count);
				
				// Access array data safely, ensuring it's a typed array
				const posArray = positions.array as Float32Array;
				sampledPositions[i * 3] = posArray[index * 3];
				sampledPositions[i * 3 + 1] = posArray[index * 3 + 1];
				sampledPositions[i * 3 + 2] = posArray[index * 3 + 2];
			}
			
			const sampledGeometry = new THREE.BufferGeometry();
			sampledGeometry.setAttribute('position', new THREE.BufferAttribute(sampledPositions, 3));
			
			// Create material for points
			const pointsMaterial = new THREE.PointsMaterial({
				color: pointColor,
				size: pointSize,
				sizeAttenuation: true
			});

			// Create points
			return new THREE.Points(sampledGeometry, pointsMaterial);
		}
		
		// Create material for points using the original geometry
		const pointsMaterial = new THREE.PointsMaterial({
			color: pointColor,
			size: pointSize,
			sizeAttenuation: true
		});

		// Create points
		return new THREE.Points(geometry, pointsMaterial);
	}, [scene, pointColor, pointSize, pointDensity]);

	// Track mouse position for the entire canvas
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			// Calculate normalized position (-1 to 1) based on window dimensions
			const normalizedX = (e.clientX / window.innerWidth) * 2 - 1
			const normalizedY = (e.clientY / window.innerHeight) * 2 - 1
			setMousePosition({ x: normalizedX, y: normalizedY })
			setIsHovering(true)
		}

		const handleMouseLeave = () => {
			setIsHovering(false)
		}

		window.addEventListener("mousemove", handleMouseMove)
		window.addEventListener("mouseleave", handleMouseLeave)

		return () => {
			window.removeEventListener("mousemove", handleMouseMove)
			window.removeEventListener("mouseleave", handleMouseLeave)
		}
	}, [])

	// Update rotation based on mouse position
	useFrame(() => {
		if (modelRef.current) {
			if (isHovering) {
				// Map mouse X position to horizontal rotation within limits
				const targetHorizontalRotation = mousePosition.x * rotationLimit
				// Map mouse Y position to vertical rotation within limits (inverted for natural feel)
				const targetVerticalRotation = mousePosition.y * verticalRotationLimit

				// Smooth rotation transition
				modelRef.current.rotation.y += (targetHorizontalRotation - modelRef.current.rotation.y) * 0.1
				modelRef.current.rotation.x += (targetVerticalRotation - modelRef.current.rotation.x) * 0.1
			} else {
				// Gentle swaying when not hovering
				modelRef.current.rotation.y += Math.sin(Date.now() * 0.001) * rotationSpeed * 0.1
				modelRef.current.rotation.x += Math.sin(Date.now() * 0.0015) * rotationSpeed * 0.05
			}

			// Ensure rotation stays within limits
			modelRef.current.rotation.y = Math.max(-rotationLimit, Math.min(rotationLimit, modelRef.current.rotation.y))
			modelRef.current.rotation.x = Math.max(-verticalRotationLimit, Math.min(verticalRotationLimit, modelRef.current.rotation.x))
		}
	})

	return (
		<group ref={modelRef} scale={scale} position={position}>
			{points ? (
				<primitive object={points} />
			) : (
				<primitive object={scene} />
			)}
		</group>
	)
}

function Loader() {
	const { progress } = useProgress()
	return <Html center>{progress.toFixed(0)}% loaded</Html>
}

