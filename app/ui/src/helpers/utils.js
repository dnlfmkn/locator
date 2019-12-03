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

  export const getLocationError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log('User denied geolocation permission')
        break;
      case error.POSITION_UNAVAILABLE:
        console.log('Cannot find current position')
        break;
      case error.TIMEOUT:
        console.log('The request to get user location timed out')
        break;
      case error.UNKNOWN_ERROR:
        console.log('An unknown error occured')
        break;
    }
  }
