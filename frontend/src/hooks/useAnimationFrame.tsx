import { useRef, useEffect } from "react";

const useAnimationFrame = (callback: Function) => {
  const requestRef = useRef(0);

  const animate = () => {
    callback();
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);
};

export default useAnimationFrame;