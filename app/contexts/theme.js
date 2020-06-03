import React from 'react'

const ThemeContext = React.createContext()

export const ThemeConsumer = ThemeContext.Consumer
export const ThemeProvider = ThemeContext.Provider

export default ThemeContext;