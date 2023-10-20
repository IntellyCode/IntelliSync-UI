import { createContext, useContext, useEffect, useState } from 'react';

//Write a context component that will set the value of a shared variable
//to if the window is resizing or not. It should either be
// increasing, decreasing, or not resizing. 
//use an object named ResizeEnum that stores values increasing:1,decresing:-1,not resizing:0 and use the values in resizing state

const ResizingContext = createContext(null);

export const ResizeEnum = {
    increasing: 1,
    decreasing: -1,
    notResizing: 0
}


export const isResizing =()=> useContext(ResizingContext);


export default function ResizingProvider({ children }) {
    const [resizing, setResizing] = useState(0);

    useEffect(() => {
        let previousWidth = window.innerWidth;

        const updateResizingState = () => {
            const currentWidth = window.innerWidth;
            if (currentWidth > previousWidth) {
                if (resizing != ResizeEnum.increasing) setResizing(ResizeEnum.increasing);
            } else if (currentWidth < previousWidth) {
                if (resizing != ResizeEnum.decreasing) setResizing(ResizeEnum.decreasing);
            } else {
                if (resizing != ResizeEnum.notResizing) setResizing(ResizeEnum.notResizing);
            }

            previousWidth = currentWidth;
        };
        //ensure the updateResizingState is called with a debounce of 200ms
        
        window.addEventListener("resize", updateResizingState);

        updateResizingState();

        return () => {
            window.removeEventListener("resize", updateResizingState);
        };
    }, [resizing]);

    return <ResizingContext.Provider value={{ resizing }}>{children}</ResizingContext.Provider>;
}
