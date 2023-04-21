export default function getGeolocation(successCallback: PositionCallback) {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(successCallback)
  } else {
    // BONUS SHOW MESSAGE TO THE USER
    console.log('geolocation IS NOT available on your browser')
  }
}
