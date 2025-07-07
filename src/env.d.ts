interface Window {
  CookieManager: {
    hasMediaConsent(): boolean;
    setMediaConsent(allowed: boolean): void;
    getCookie(name: string): string | null;
    setCookie(name: string, value: string, days: number): void;
    deleteCookie(name: string): void;
  };
}

// Media Consent Event
interface MediaConsentUpdateEvent extends CustomEvent {
  detail: {
    allowed: boolean;
  };
}