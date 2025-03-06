import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import httpClient from "./httpClient";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function subscribeToNotifications() {
  try {
    // Register service worker
    const registration = await navigator.serviceWorker.register(
      "/service-worker.js"
    );
    await navigator.serviceWorker.ready;

    registration.active?.postMessage({
      type: "CONFIG",
      apiUrl: process.env.NEXT_PUBLIC_API_URL,
    });

    // Get push subscription
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });
    console.log("Subscription:", subscription);
    var enc = new TextDecoder();

    // Send subscription to api
    try {
      await httpClient.post("/api/notifications/subscribe", {
        endpoint: subscription.endpoint,
        p256dh: arrayBufferToBase64(subscription.getKey("p256dh")!),
        auth: arrayBufferToBase64(subscription.getKey("auth")!),
      });
    } catch (error) {
      console.error("Error sending subscription to API:", error);
      throw error;
    }

    return subscription;
  } catch (error) {
    console.error("Error subscribing to notifications:", error);
    throw error;
  }
}

// Helper function to convert ArrayBuffer to Base64 string
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  // Convert ArrayBuffer to byte array
  const bytes = new Uint8Array(buffer);
  // Convert byte array to string
  const binary = bytes.reduce(
    (str, byte) => str + String.fromCharCode(byte),
    ""
  );
  // Convert binary string to base64
  return btoa(binary);
}

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function parseSearchParams(searchParams: any, attributes?: string[]) {
  const { page, size, sort } = searchParams;
  var obj: { [k: string]: any } = {};
  attributes?.forEach((attr) => (obj[attr] = searchParams[attr]));

  const params = { ...obj, page, size, sort } as any;
  const queryKeys = Object.keys(params)
  .map((el) => params[el] && params[el].toString())
  .filter((n) => n) as string[];
  
  return {params, queryKeys};
}

export function generatePassword(passwordLength=10, useSymbols = false, useNumbers = true, useLowerCase=true, useUpperCase=true) {
  let charset = "";
  let newPassword = "";

  if (useSymbols) charset += "!@#$%^&*()";
  if (useNumbers) charset += "0123456789";
  if (useLowerCase) charset += "abcdefghijklmnopqrstuvwxyz";
  if (useUpperCase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < passwordLength; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return newPassword;
};