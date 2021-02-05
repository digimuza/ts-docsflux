import { makeAutoObservable } from "mobx";
import * as P from 'ts-prime'
export enum LayoutMode {
    MOBILE,
    DESKTOP
}

class LayoutState<T extends ReadonlyArray<{ width: number, mode: string }>> {
    screenSize: T[number]['mode']
    constructor(private breakpoints: T) {
        if (breakpoints.length === 0) throw new Error("Please provide at least one breakpoint")
        this.screenSize = breakpoints[0].mode
        this.calculateSize()
        window.addEventListener('resize', () => {
            this.calculateSize()
        })
    }

    private calculateSize() {
        const sorted = this.breakpoints.filter((q) => q.width <= window.innerWidth)
        this.screenSize = P.maxBy(sorted, (q) => q.width)[0].mode

    }

    size<E extends { [k in T[number]['mode']]: any }>(data: E): E[T[number]['mode']] {
        return data[this.screenSize]
    }
}

export const layout = makeAutoObservable(new LayoutState([{ width: 1240, mode: 'desktop' }, { width: 0, mode: 'mobile' }, { width: 900, mode: 'tablet' }] as const))


