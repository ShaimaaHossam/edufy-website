export async function getDeviceLocation() {
  if (!navigator.geolocation) return;

  const position = await new Promise(function (resolve) {
    navigator.geolocation.getCurrentPosition(resolve, null, {
      enableHighAccuracy: true,
      timeout: 3 * 1000,
    });
  });

  return { lat: position.coords.latitude, lng: position.coords.longitude };
}
