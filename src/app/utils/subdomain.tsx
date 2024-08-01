export const getValidSubdomain = (host?: string | null) => {
  let subdomain: string | null = null;
  if (!host && typeof window !== 'undefined') {
    // On client side, get the host from window
    host = window.location.host;
  }
  if (host && host.includes('.')) {
    // console.log(host);
    const candidate = host.split('.')[0];
    if (
      candidate &&
      !candidate.includes('prlocal') &&
      !candidate.includes('dev-pluto') &&
      !candidate.includes('localhost')
    ) {
      // Valid candidate
      subdomain = `_subdomains/${candidate}`;
    }
  }
  return subdomain;
};
