export class ViewportManager {
  init() {
    ["DOMContentLoaded", "resize"].forEach((event) => {
      window.addEventListener(event, () => {
        this._updateViewportSize();
      });
    });
  }
  _updateViewportSize() {
    const viewportWidth = window.innerWidth + "px";
    const viewportHeight = window.innerHeight + "px";

    document.documentElement.style.setProperty("--vw", viewportWidth);
    document.documentElement.style.setProperty("--vh", viewportHeight);
  }
}
