/**
 * WhatsApp Click-to-Chat Integration Utility
 * Default Destination: +91 86101 13160 (Olive Tree School Official Admissions Desk)
 *
 * NOTE: openWhatsAppChat must ONLY be invoked from an explicit user click handler
 * (e.g. "Confirm & Continue to WhatsApp"), never during form submission,
 * preview rendering, component mounting, or useEffect.
 */

export const OFFICIAL_WHATSAPP_NUMBER = '918610113160';
export const DISPLAY_PHONE_NUMBER = '+91 86101 13160';

/**
 * Normalizes any phone string (e.g. "86101 13160", "+91 86101 13160", "96290-49907")
 * to standard international WhatsApp format without spaces, hyphens, or '+'
 */
export function normalizeWhatsAppNumber(rawPhone?: string): string {
  if (!rawPhone) return OFFICIAL_WHATSAPP_NUMBER;
  const digits = rawPhone.replace(/\D/g, '');
  if (!digits) return OFFICIAL_WHATSAPP_NUMBER;
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 12 && digits.startsWith('91')) return digits;
  return digits;
}

/**
 * Formats a raw phone string into a clean user-facing display string (e.g. "+91 86101 13160")
 */
export function formatPhoneDisplay(rawPhone?: string): string {
  if (!rawPhone) return DISPLAY_PHONE_NUMBER;
  const digits = rawPhone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  if (digits.length === 12 && digits.startsWith('91')) {
    const local = digits.slice(2);
    return `+91 ${local.slice(0, 5)} ${local.slice(5)}`;
  }
  return rawPhone;
}

/**
 * Generates the official WhatsApp Click-to-Chat URL with proper URL encoding.
 */
export function createWhatsAppUrl(message: string, customPhone?: string): string {
  const targetNumber = normalizeWhatsAppNumber(customPhone);
  return `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Safely triggers opening WhatsApp in a new window/tab from an explicit user action.
 * Handles popup blockers gracefully and returns both success status and fallback URL.
 */
export function openWhatsAppChat(message: string, customPhone?: string): { success: boolean; url: string } {
  const url = createWhatsAppUrl(message, customPhone);

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
