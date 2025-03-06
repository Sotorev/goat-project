"use client";
import { useEffect, useState } from "react";

const useScroll = () => {

	const [lastScrollY, setLastScrollY] = useState(0);
	const [scrollDir, setscrollDir] = useState("NONE");

	useEffect(() => {
		function handleScroll() {
			if (window.scrollY === 0) {
				setscrollDir("NONE");
			}
			else if (window.scrollY < lastScrollY) {
				setscrollDir("UP");
			}
			else {
				setscrollDir("DOWN");
			}
			setLastScrollY(window.scrollY);
		}
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY])
	return scrollDir;
}

export default useScroll;