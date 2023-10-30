import { ThemeProvider } from "@mui/material/styles";
import DateTrackerProvider from "./DateTrackerProvider";
import ResizingProvider from "./ResizingProvider";
import SharedVariablesProvider from "./SharedVariablesProvider";
import theme from "@theme";
export default function AllProviders({ children }) {
    return (
        <ResizingProvider>
            <SharedVariablesProvider>
                <DateTrackerProvider>
                    <ThemeProvider theme={theme}>
                        {children}
                    </ThemeProvider>
                </DateTrackerProvider >
            </SharedVariablesProvider>
        </ResizingProvider>
    );
}