export const isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false
      }
    }
    return true
  }

  export const hasValidMembers = (obj) => {
    for (var key in obj) {
      if (obj[key] === "") {
        return false
      }
    }
    return true
  }