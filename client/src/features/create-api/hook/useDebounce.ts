import { useRef, useCallback, useState, useEffect } from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounceFn<T extends (...args: any[]) => void>(callback: T, delay: number) {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const debounce = useCallback(
        (...args: Parameters<T>) => {
            if(timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
            timeoutRef.current = setTimeout(() => {
                callback(...args)
            }, delay)
        },
        [callback, delay]
    )

    return debounce
}
export function useDebounceValue(value: string | number, delay: number) {
    const [debounce, setDebounce] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounce(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debounce
}