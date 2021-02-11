import { makeAutoObservable } from "mobx";
import * as P from 'ts-prime'
export enum LayoutMode {
    MOBILE,
    DESKTOP
}

const layoutSize = [{ width: 1240, mode: 'desktop' }, { width: 0, mode: 'mobile' }, { width: 900, mode: 'tablet' }] as const

type LayoutModes = typeof layoutSize[number]['mode']

class LayoutState {
    screenSize: LayoutModes
    sideBarIsCollapsed = true
    constructor() {
        this.screenSize = layoutSize[0].mode
        this.calculateSize()
        window.addEventListener('resize', () => {
            this.calculateSize()
        })
    }

    private calculateSize() {
        const sorted = layoutSize.filter((q) => q.width <= window.innerWidth)
        this.screenSize = P.maxBy(sorted, (q) => q.width)[0].mode
        if (this.screenSize === 'mobile') {
            this.sideBarIsCollapsed = true
        } else {
            this.sideBarIsCollapsed = false
        }
    }

    size<E extends { [k in LayoutModes]: any }>(data: E): E[LayoutModes] {
        return data[this.screenSize]
    }
}



export const layout = makeAutoObservable(new LayoutState())


