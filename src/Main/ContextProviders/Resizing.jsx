import { createContext, useContext, useEffect, useState, useRef } from 'react';
const ResizingContext = createContext(null);

export const ResizeEnum = {
    increasing: 1,
    decreasing: -1,
    notResizing: 0
}


export const isResizing = () => useContext(ResizingContext);


export default function ResizingProvider({ children }) {
    const [resizing, setResizing] = useState(0);
    const [containerInfo, setContainerInfo] = useState(
        {
            width: window.innerWidth,
            height: window.innerHeight,
            resizingX: ResizeEnum.notResizing,
            resizingY: ResizeEnum.notResizing
        });
    const previousSize = useRef({ width: window.innerWidth, height: window.innerHeight });
    useEffect(() => {
        let timeoutId;

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                setContainerInfo((prevContainer) => {
                    const container = { ...prevContainer };
                    if (width > previousSize.current.width) {
                        container.resizingX = ResizeEnum.increasing;
                    } else if (width < previousSize.current.width) {
                        container.resizingX = ResizeEnum.decreasing;
                    } else {
                        container.resizingX = ResizeEnum.notResizing;
                    }
                    if (height > previousSize.current.height) {
                        container.resizingY = ResizeEnum.increasing;
                    } else if (height < previousSize.current.height) {
                        container.resizingY = ResizeEnum.decreasing;
                    } else {
                        container.resizingY = ResizeEnum.notResizing;
                    }
                    container.width = width;
                    container.height = height;
                    previousSize.current = { width, height };
                    return container;
                });
            }
        });

        resizeObserver.observe(window.document.body);

        return () => {
            resizeObserver.disconnect();
            
        };
    }, []);
    return <ResizingContext.Provider value={containerInfo}>{children}</ResizingContext.Provider>;
}
