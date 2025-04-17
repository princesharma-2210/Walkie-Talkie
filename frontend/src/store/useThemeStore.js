
import { create } from "zustand";

export const useThemeStore= create((set)=>({
    theme:"coffee",
    setTheme:(theme)=>{
        localStorage.setItem("chat-theme",theme);
        set({theme});
    },
}));