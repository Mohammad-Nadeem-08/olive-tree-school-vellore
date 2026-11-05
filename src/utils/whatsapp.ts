/**
 * WhatsApp Click-to-Chat Integration Utility
 * Destination: +91 86101 13160 (Olive Tree School Official Admissions Desk)
 *
 * NOTE: openWhatsAppChat must ONLY be invoked from an explicit user click handler
 * (e.g. "Confirm & Continue to WhatsApp"), never during form submission,
 * preview rendering, component mounting, or useEffect.
 */

export const OFFICIAL_WHATSAPP_NUMBER = '918610113160';
export const DISPLAY_PHONE_NUMBER = '+91 86101 13160';

/**
 * Generates the official WhatsApp Click-to-Chat URL with proper URL encoding.
 */
export function createWhatsAppUrl(message: string): string {
  return `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Safely triggers opening WhatsApp in a new window/tab from an explicit user action.
 * Handles popup blockers gracefully and returns both success status and fallback URL.
 */
export function openWhatsAppChat(message: string): { success: boolean; url: string } {
  const url = createWhatsAppUrl(message);

  if (typeof window === 'undefined') {
    return { success: false, url };
  }

  try {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      // Browser popup blocker prevented automatic window.open
      return { success: false, url };
    }
    return { success: true, url };
  } catch {
    return { success: false, url };
  }
}
