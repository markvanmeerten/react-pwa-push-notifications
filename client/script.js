const checkPermissions = () => {
  if (!("serviceWorker" in navigator)) {
    throw new Error("No support for service worker!");
  }

  if (!("Notification" in window)) {
    throw new Error("No support for notification API");
  }

  if (!("PushManager" in window)) {
    throw new Error("No support for Push API");
  }
};

const registerSW = async () => {
  const registration = await navigator.serviceWorker.register(
    "service-worker.js"
  );
  return registration;
};

const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    throw new Error("Notification permission not granted");
  }
};

const enableNotifications = async () => {
  checkPermissions();
  await requestNotificationPermission();
  await registerSW();
};
