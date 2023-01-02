import React, { useLayoutEffect, useState } from 'react'

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState([0, 0]);

    useLayoutEffect(() => {
        const updateSize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener('resize', updateSize);
        updateSize();
    }, []);

    return windowSize;
}

export default useWindowSize