import { useEffect } from 'react'

const useBeforeUnload = (callback?: () => void) => {
  useEffect(() => {

    const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      callback && callback()
    }
    addEventListener("beforeunload", beforeUnloadHandler)

    return () => {
      removeEventListener("beforeunload", beforeUnloadHandler)
    }
  }, [])

}

export default useBeforeUnload