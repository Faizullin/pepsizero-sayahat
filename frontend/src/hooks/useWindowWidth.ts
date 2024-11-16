import {useEffect, useState} from "react";

type TBreakpointType = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
const screens: Record<TBreakpointType, number> = {
    "xs": 0,

    'sm': 640,
    // => @media (min-width: 640px) { ... }

    'md': 768,
    // => @media (min-width: 768px) { ... }

    'lg': 1024,
    // => @media (min-width: 1024px) { ... }

    'xl': 1280,
    // => @media (min-width: 1280px) { ... }

    '2xl': 1536,
    // => @media (min-width: 1536px) { ... }
}


const getBreakpointName = (windowWidth: number): TBreakpointType => {
    if (windowWidth >= screens['2xl']) {
        return ('2xl');
    } else if (windowWidth >= screens['xl']) {
        return ('xl');
    } else if (windowWidth >= screens['lg']) {
        return ('lg');
    } else if (windowWidth >= screens['md']) {
        return ('md');
    } else if (windowWidth >= screens['sm']) {
        return ('sm');
    } else {
        return ('xs');
    }
}

const getCurrentWith = () => {
    if (typeof window === 'undefined') {
        return 0;
    }
    return (window as any).innerWidth;
}

const useWindowWidth = () => {
    const [width, setWidth] = useState<number>(getCurrentWith());
    const [currentBreakpoint, setCurrentBreakpoint] = useState<TBreakpointType>("xs");

    useEffect(() => {
        const handleResize = () => {
            const newWidthValue = getCurrentWith();
            setWidth(newWidthValue);
            setCurrentBreakpoint(getBreakpointName(newWidthValue));
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return {
        width, setWidth, breakpoint: currentBreakpoint, breakpoints: screens,
    };
}

export default useWindowWidth;