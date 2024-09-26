import {useEffect, useState} from 'react';
import { number } from 'zod';
let useProgress = (animate: boolean, time: number) => {
	let [progress, setProgress] = useState(0);

	useEffect(() => {
		if (animate) {
			let rafId : number ;
			let start : number;
			let step = (timestamp: number) => {
				if (!start) start = timestamp;
				let progress = timestamp - start;
				setProgress(progress);
				if(progress < time) {
					rafId = requestAnimationFrame(step);
				}
			}

			rafId = requestAnimationFrame(step);
			return () => cancelAnimationFrame(rafId)
		}
	}, [animate, time]);

	return animate ? Math.min(progress / time, 1) : 0;
}