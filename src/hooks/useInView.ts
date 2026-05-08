import { useEffect, useRef, useState } from 'react'
import type { LazyOptions } from '../types'

export interface UseInViewOptions extends LazyOptions {
  disabled?: boolean
}

export interface UseInViewResult<T extends Element> {
  ref: (node: T | null) => void
  inView: boolean
  entry: IntersectionObserverEntry | null
}

export function useInView<T extends Element = HTMLElement>(
  options: UseInViewOptions = {}
): UseInViewResult<T> {
  const {
    disabled = false,
    initialInView = false,
    root = null,
    rootMargin = '200px 0px',
    threshold = 0,
    triggerOnce = true
  } = options

  const [node, setNode] = useState<T | null>(null)
  const [inView, setInView] = useState(initialInView || disabled)
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const hasTriggeredRef = useRef(false)

  useEffect(() => {
    if (disabled) {
      setInView(true)
      return
    }

    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    if (triggerOnce && hasTriggeredRef.current) return

    const observer = new IntersectionObserver(
      entries => {
        const nextEntry = entries[0]
        if (!nextEntry) return

        const nextInView = nextEntry.isIntersecting || nextEntry.intersectionRatio > 0
        setEntry(nextEntry)
        setInView(nextInView)

        if (nextInView && triggerOnce) {
          hasTriggeredRef.current = true
          observer.disconnect()
        }
      },
      { root, rootMargin, threshold }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [disabled, node, root, rootMargin, threshold, triggerOnce])

  return {
    ref: setNode,
    inView,
    entry
  }
}
