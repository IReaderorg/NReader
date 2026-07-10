import { parseHTML as linkedomParse } from 'linkedom';
export function parseHTML(html) {
    const { document } = linkedomParse(html);
    function cheerio(selector) {
        let elements = [];
        if (selector === undefined || selector === '') {
            elements = [document.documentElement];
        }
        else if (selector.startsWith('#')) {
            const el = document.getElementById(selector.slice(1));
            if (el)
                elements = [el];
        }
        else if (selector.startsWith('.')) {
            elements = [...document.querySelectorAll(selector)];
        }
        else {
            elements = [...document.querySelectorAll(selector)];
        }
        return createCollection(elements);
    }
    function createCollection(elements) {
        const collection = {
            get length() { return elements.length; },
            text() { return elements.map(e => e.textContent || '').join(''); },
            attr(name) { return elements[0]?.getAttribute(name) ?? null; },
            html() { return elements.map(e => e.innerHTML).join(''); },
            find(selector) {
                const found = [];
                for (const el of elements)
                    found.push(...el.querySelectorAll(selector));
                return createCollection(found);
            },
            children() {
                const kids = [];
                for (const el of elements)
                    kids.push(...el.children);
                return createCollection(kids);
            },
            each(fn) {
                elements.forEach((el, i) => fn(i, wrapElement(el)));
                return collection;
            },
            eq(index) {
                const el = elements[index];
                return el ? wrapElement(el) : null;
            },
            map(fn) {
                return elements.map((el, i) => fn(i, wrapElement(el)));
            },
        };
        elements.forEach((el, i) => { collection[i] = wrapElement(el); });
        return collection;
    }
    function wrapElement(el) {
        return {
            text() { return el.textContent || ''; },
            attr(name) { return el.getAttribute(name); },
            html() { return el.innerHTML; },
            find(selector) { return createCollection([...el.querySelectorAll(selector)]); },
            children() { return createCollection([...el.children]); },
            each(fn) {
                ;
                [...el.children].forEach((child, i) => fn(i, wrapElement(child)));
            },
            eq(index) {
                const child = el.children[index];
                return child ? wrapElement(child) : null;
            },
        };
    }
    return cheerio;
}
//# sourceMappingURL=html-parser.js.map