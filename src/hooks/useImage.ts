import { useCallback, useEffect, useMemo, useReducer } from 'react'
import type { ImageStatus, UseImageOptions, UseImageResult } from '../types'
import {
  getCachedImageError,
  getCachedImageStatus,
  getImageCacheKey,
  preloadImage
} from '../utils/preload'

interface State {
  status: ImageStatus
  error: Error | null
  image: HTMLImageElement | null
  reloadKey: number
}

type Action =
  | { type: 'idle' }
  | { type: 'loading' }
  | { type: 'loaded'; image: HTMLImageElement | null }
  | { type: 'error'; error: Error }
  | { type: 'reload' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'idle':
      return { ...state, status: 'idle', error: null, image: null }
    case 'loading':
      return { ...state, status: 'loading', error: null }
    case 'loaded':
      return { ...state, status: 'loaded', error: null, image: action.image }
    case 'error':
      return { ...state, status: 'error', error: action.error, image: null }
    case 'reload':
      return { ...state, reloadKey: state.reloadKey + 1 }
    default:
      return state
  }
}

export function useImage(options: UseImageOptions): UseImageResult {
  const {
    src,
    srcSet,
    sizes,
    enabled = true,
    decode = true,
    retry = 0,
    timeout,
    crossOrigin,
    referrerPolicy
  } = options

  const cacheKey = useMemo(
    () => getImageCacheKey({ src, srcSet, sizes, crossOrigin, referrerPolicy }),
    [crossOrigin, referrerPolicy, sizes, src, srcSet]
  )

  const [state, dispatch] = useReducer(reducer, undefined, (): State => {
    const cachedStatus = getCachedImageStatus({ src, srcSet, sizes, crossOrigin, referrerPolicy })

    if (!enabled || !src) {
      return { status: 'idle', error: null, image: null, reloadKey: 0 }
    }

    if (cachedStatus === 'loaded') {
      return { status: 'loaded', error: null, image: null, reloadKey: 0 }
    }

    if (cachedStatus === 'error') {
      return {
        status: 'error',
        error: getCachedImageError({ src, srcSet, sizes, crossOrigin, referrerPolicy }),
        image: null,
        reloadKey: 0
      }
    }

    return { status: 'loading', error: null, image: null, reloadKey: 0 }
  })

  useEffect(() => {
    let isActive = true
    let attempt = 0

    if (!enabled || !src) {
      dispatch({ type: 'idle' })
      return
    }

    const cachedStatus = getCachedImageStatus({ src, srcSet, sizes, crossOrigin, referrerPolicy })

    if (cachedStatus === 'loaded') {
      dispatch({ type: 'loaded', image: null })
      return
    }

    dispatch({ type: 'loading' })

    const load = () => {
      preloadImage({
        src,
        srcSet,
        sizes,
        enabled,
        decode,
        timeout,
        crossOrigin,
        referrerPolicy
      })
        .then(image => {
          if (!isActive) return
          dispatch({ type: 'loaded', image })
        })
        .catch(error => {
          if (!isActive) return
          if (attempt < retry) {
            attempt += 1
            load()
            return
          }
          dispatch({ type: 'error', error })
        })
    }

    load()

    return () => {
      isActive = false
    }
  }, [
    cacheKey,
    crossOrigin,
    decode,
    enabled,
    referrerPolicy,
    retry,
    sizes,
    src,
    srcSet,
    state.reloadKey,
    timeout
  ])

  const reload = useCallback(() => dispatch({ type: 'reload' }), [])

  return {
    status: state.status,
    error: state.error,
    image: state.image,
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isLoaded: state.status === 'loaded',
    isError: state.status === 'error',
    reload
  }
}
