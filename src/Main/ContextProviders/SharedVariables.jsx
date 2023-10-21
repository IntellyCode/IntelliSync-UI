import React, { useState, useEffect, createContext, useContext } from "react";

const SharedContext = createContext();

const SharedVariables = {
    sidebarHideSize: 900,
    sidebarMinSize: 250,
    navBarHeight: 80,
    footerHeight: 40,
    drawerWidth: 250,
    minNavBarWidth: 680,
}

export default function SharedVariablesProvider({ children }) {
    
    return (
        <SharedContext.Provider value={SharedVariables}>
            {children}
        </SharedContext.Provider>
    )
}

export function getSharedVariables() {
    return useContext(SharedContext);
}