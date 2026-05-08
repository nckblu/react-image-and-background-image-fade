import { act } from '@testing-library/react'

type MockImageMode = 'load' | 'error'

export function mockImage(mode: MockImageMode = 'load') {
  class MockImage {
    onload: (() => void) | null = null
    onerror: (() => void) | null = null
    complete = false
    naturalWidth = mode === 'load' ? 100 : 0
    crossOrigin: string | null = null
    referrerPolicy = ''
    sizes = ''
    srcset = ''
    private source = ''

    set src(value: string) {
      this.source = value
      queueMicrotask(() => {
        if (mode === 'load') {
          this.complete = true
          this.onload?.()
        } else {
          this.onerror?.()
        }
      })
    }

    get src() {
      return this.source
    }

    decode() {
      return Promise.resolve()
    }
  }

  Object.defineProperty(window, 'Image', {
    configurable: true,
    writable: true,
    value: MockImage
  })
}

export async function flushImageLoad() {
  await act(async () => {
    await Promise.resolve()
    await Promise.resolve()
  })
}

export function mockIntersectionObserver(isIntersecting = true) {
  class MockIntersectionObserver {
    constructor(private callback: IntersectionObserverCallback) {}

    observe(element: Element) {
      this.callback(
        [
          {
            isIntersecting,
            intersectionRatio: isIntersecting ? 1 : 0,
            target: element
          } as IntersectionObserverEntry
        ],
        this as unknown as IntersectionObserver
      )
    }

    disconnect() {}

    unobserve() {}

    takeRecords() {
      return []
    }
  }

  Object.defineProperty(window, 'IntersectionObserver', {
    configurable: true,
    writable: true,
    value: MockIntersectionObserver
  })

  Object.defineProperty(globalThis, 'IntersectionObserver', {
    configurable: true,
    writable: true,
    value: MockIntersectionObserver
  })
}
