export interface CheerioElement {
    text(): string;
    attr(name: string): string | null;
    html(): string;
    find(selector: string): CheerioElement[];
    children(): CheerioElement[];
    each(fn: (i: number, el: CheerioElement) => void): void;
    eq(index: number): CheerioElement | null;
}
export interface CheerioAPI {
    (selector: string): CheerioCollection;
}
export interface CheerioCollection {
    length: number;
    text(): string;
    attr(name: string): string | null;
    html(): string;
    find(selector: string): CheerioCollection;
    children(): CheerioCollection;
    each(fn: (i: number, el: CheerioElement) => void): CheerioCollection;
    eq(index: number): CheerioElement | null;
    map<T>(fn: (i: number, el: CheerioElement) => T): T[];
    [index: number]: CheerioElement;
}
export declare function parseHTML(html: string): CheerioAPI;
export { CheerioAPI, CheerioCollection, CheerioElement };
//# sourceMappingURL=html-parser.d.ts.map