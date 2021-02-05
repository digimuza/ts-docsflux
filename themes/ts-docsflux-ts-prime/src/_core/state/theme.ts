import { autorun, makeAutoObservable } from "mobx";
import * as P from 'ts-prime'
export const THEME_KEY = "ts-prime-theme";

class ThemeState {
    theme: 'dark' | 'light' = 'dark'
    constructor() {
        const loc = localStorage.getItem("ts-prime-theme") || ''
        this.theme = P.isOneOf(loc, ['dark', 'light']) ? loc : 'dark'
    }
}

export const theme = makeAutoObservable(new ThemeState())

autorun(() => {
    localStorage.setItem(THEME_KEY, theme.theme);
});
