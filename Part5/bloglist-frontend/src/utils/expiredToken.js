function handleTokenExpiration() {
  const hours = 1;
  const now = new Date().getTime();
  const setupTime = window.localStorage.getItem('setupTime');

  if (setupTime && now - setupTime > hours * 60 * 60 * 1000) {
    window.localStorage.clear();
  }
}

export default handleTokenExpiration;
