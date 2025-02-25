class Utils {
  static isValidInteger(newValue) {
    return Number.isNaN(newValue) || Number.isFinite(newValue);
  }
}

export default Utils;
