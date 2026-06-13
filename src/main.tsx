import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { DirectionProvider } from "@/components/ui/direction"
import App from "./App"
import { ThemeProvider } from "@/components/theme-provider"

import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DirectionProvider dir="rtl">
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </DirectionProvider>
  </StrictMode>
)
