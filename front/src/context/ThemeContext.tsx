import React, { createContext, useMemo, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import lightTheme from '../theme/light';
import darkTheme from '../theme/dark';

type ThemeType = typeof lightTheme;

type ThemeContextType = {
    theme: ThemeType;
    toggleTheme: () => void;
    isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType>({ theme: darkTheme, toggleTheme: () => null, isDark: true });

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDark, setIsDark] = useState(true);

    const toggleTheme = () => setIsDark((prev) => !prev);
    const theme = isDark ? darkTheme : lightTheme;

    const contextValue = useMemo(() => ({ theme, toggleTheme, isDark }), [theme, isDark]);

    return (
        <ThemeContext.Provider value={contextValue}>
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </ThemeContext.Provider>
    );
};

export { ThemeContext, ThemeContextProvider }