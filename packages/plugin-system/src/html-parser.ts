import { parseHTML as linkedomParse } from 'linkedom'

export interface CheerioElement {
  text(): string
  attr(name: string): string | null
  html(): string
  find(selector: string): CheerioElement[]
  children(): CheerioElement[]
  each(fn: (i: number, el: CheerioElement) => void): void
  eq(index: number): CheerioElement | null
}

export interface CheerioAPI {
  (selector: string): CheerioCollection
}

export interface CheerioCollection {
  length: number
  text(): string
  attr(name: string): string | null
  html(): string
  find(selector: string): CheerioCollection
  children(): CheerioCollection
  each(fn: (i: number, el: CheerioElement) => void): CheerioCollection
  eq(index: number): CheerioElement | null
  map<T>(fn: (i: number, el: CheerioElement) => T): T[]
  [index: number]: CheerioElement
}

export function parseHTML(html: string): CheerioAPI {
  const { document } = linkedomParse(html)

  function cheerio(selector: string): CheerioCollection {
    let elements: Element[] = []

    if (selector === undefined || selector === '') {
      elements = [document.documentElement]
    } else if (selector.startsWith('#')) {
      const el = document.getElementById(selector.slice(1))
      if (el) elements = [el]
    } else if (selector.startsWith('.')) {
      elements = [...document.querySelectorAll(selector)]
    } else {
      elements = [...document.querySelectorAll(selector)]
    }

    return createCollection(elements)
  }

  function createCollection(elements: Element[]): CheerioCollection {
    const collection: CheerioCollection = {
      get length() { return elements.length },
      text() { return elements.map(e => e.textContent || '').join('') },
      attr(name: string) { return elements[0]?.getAttribute(name) ?? null },
      html() { return elements.map(e => e.innerHTML).join('') },
      find(selector: string) {
        const found: Element[] = []
        for (const el of elements) found.push(...el.querySelectorAll(selector))
        return createCollection(found)
      },
      children() {
        const kids: Element[] = []
        for (const el of elements) kids.push(...el.children)
        return createCollection(kids)
      },
      each(fn: (i: number, el: CheerioElement) => void) {
        elements.forEach((el, i) => fn(i, wrapElement(el)))
        return collection
      },
      eq(index: number) {
        const el = elements[index]
        return el ? wrapElement(el) : null
      },
      map(fn: (i: number, el: CheerioElement) => void) {
        return elements.map((el, i) => fn(i, wrapElement(el)))
      },
    }

    elements.forEach((el, i) => { collection[i] = wrapElement(el) })
    return collection
  }

  function wrapElement(el: Element): CheerioElement {
    return {
      text() { return el.textContent || '' },
      attr(name: string) { return el.getAttribute(name) },
      html() { return el.innerHTML },
      find(selector: string) { return createCollection([...el.querySelectorAll(selector)]) },
      children() { return createCollection([...el.children]) },
      each(fn: (i: number, el: CheerioElement) => void) {
        ;[...el.children].forEach((child, i) => fn(i, wrapElement(child)))
      },
      eq(index: number) {
        const child = el.children[index]
        return child ? wrapElement(child) : null
      },
    }
  }

  return cheerio
}

export { CheerioAPI, CheerioCollection, CheerioElement }
