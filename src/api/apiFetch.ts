import {tokenStore} from './tokenStore';
import * as auth from './auth';

let refreshInProgress: Promise<boolean> | null = null;

export async function refreshOnce(): Promise<boolean> {
  if (!refreshInProgress) {
    refreshInProgress = auth.refresh().finally(() => {
      refreshInProgress = null;
    });
  }

  return refreshInProgress;
}

export async function authorizedFetch(input: RequestInfo, init: RequestInit = {}) {
  const headers = new Headers(init.headers);

  const t = tokenStore.get();
  if (t.access) {
    headers.set('Authorization', `Bearer ${t.access}`);
  }

  const res = await fetch(input, {...init, headers, credentials: 'include'});
  if (res.status !== 401) {
    return res;
  }

  const ok = await refreshOnce();
  if (ok === false) {
    tokenStore.clear();
    return res;
  }

  const retryHeaders = new Headers(init.headers);
  const t2 = tokenStore.get();
  if (t2.access) {
    retryHeaders.set('Authorization', `Bearer ${t2.access}`);
  }

  return fetch(input, {...init, headers: retryHeaders, credentials: 'include'});
}
