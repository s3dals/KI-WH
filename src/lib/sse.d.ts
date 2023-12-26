import type { SSEOptions } from "sse.js"

declate module 'sse.js' {
    export type SSEOptions = EventSourceInit & {
        headers?: Record<string, string>
        payload?: string
        method?: string
    }
}

export class SSE extends EventSoruce {
    constructor(url: string | URL, sseOptions?: SSEOptions)
    stream(): void
}