function leftSideDeepCompare(objA, objB) {
  if (objA === null && objB === null) {
    return true;
  }
  // Check if both objects are objects
  if (typeof objA !== 'object' || typeof objB !== 'object') {
    return false;
  }
  // Get the keys of the first object
  const keysA = Object.keys(objA);
  for (const key of keysA) {
    // Check if the property exists in the second object
    if (!objB.hasOwnProperty(key)) {
      return false;
    }
    // Recursively compare nested objects or values
    if (typeof objA[key] === 'object' && typeof objB[key] === 'object') {
      if (!leftSideDeepCompare(objA[key], objB[key])) {
        return false;
      }
    } else if (objA[key] !== objB[key]) {
      return false;
    }
  }
  // If all properties and nested properties are equal, return true
  return true;
}

module.exports = leftSideDeepCompare;
