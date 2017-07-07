class LocalStorageHelper {
  constructor() {
    // service
    this.enabled = window && window.localStorage;
  }

  getStorageItem(itemName) {
    if (this.enabled) {
      const playerName = window.localStorage.getItem(itemName);

      if (playerName && playerName !== '') {
        return playerName;
      }
    }

    return false;
  }

  setStorageItem(itemName, item) {
    if (this.enabled) {
      window.localStorage.setItem(itemName, item);
    }
  }
}

export default new LocalStorageHelper();
