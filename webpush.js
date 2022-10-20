self.addEventListener('load', async () => {
  if ('serviceWorker' in navigator) {
    window.sw = await navigator.serviceWorker.register('/service-worker.js', {scope: '/'});
  }
});

async function allowWebPush() {
  if ('Notification' in window) {
    let permission = Notification.permission;
    if (permission === 'denied') {
      alert('denied');
      return false;
    } else if (permission === 'granted') {
      alert('granted');
      return false;
    }
  }
  const appServerKey = 'BPC0LjhBlaykMyraxwasUzV9BoxCK8iQyhAjb_pKLvtA86ByX6Lz7uy0TB1-H18rMPIhwZFYBARJQhm-2O4ewtQ';
  const applicationServerKey = urlB64ToUint8Array(appServerKey);
  let subscription = undefined;
  try {
    subscription = await window.sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey
    });
  } catch (e) {
    alert(e);
    return false;
  }
  const key = subscription.getKey('p256dh');
  const token = subscription.getKey('auth');
  const request = {
    endpoint: subscription.endpoint,
    userPublicKey: btoa(String.fromCharCode.apply(null, new Uint8Array(key))),
    userAuthToken: btoa(String.fromCharCode.apply(null, new Uint8Array(token)))
  };
  console.log(request);
}

function urlB64ToUint8Array (base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
