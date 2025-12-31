type Tokens = { access: string | null, refresh: string | null }

const emptyTokens: Tokens = { access: null, refresh: null }
let tokens: Tokens = emptyTokens

export const tokenStore = {
    get: () => tokens,
    set: (t: Tokens | null) => tokens = t ?? emptyTokens,
    clear: () => { tokens = emptyTokens },
}