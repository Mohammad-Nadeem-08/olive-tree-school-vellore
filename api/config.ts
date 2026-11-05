import fs from 'fs';
import path from 'path';

export interface SiteConfig {
  admissionYear: string;
  yearsOfExcellence: string;
  primaryPhone: string;
  secondaryPhone: string;
  altPhone: string;
  email: string;
  address: string;
  officeHours: string;
  tickerAnnouncementEn: string;
  tickerAnnouncementTa: string;
  tickerAnnouncementUr: string;
}

export const DEFAULT_CONFIG: SiteConfig = {
  admissionYear: '2027-2028',
  yearsOfExcellence: '13+',
  primaryPhone: '86101 13160',
  secondaryPhone: '96290 49907',
  altPhone: '89037 99660',
  email: 'olivetreeschool032013@gmail.com',
  address: 'Chinayya Layout, Behind Janipoonthattam, Kaspa, Vellore - 632 001',
  officeHours: '9:00 AM to 4:00 PM on all Working Days',
  tickerAnnouncementEn:
    'Admissions Open 2027-2028 for Pre-KG to 5th Std • Office Hours: 9:00 AM – 4:00 PM on all Working Days • Call 86101 13160 / 96290 49907',
  tickerAnnouncementTa:
    '2027-2028 மாணவர் சேர்க்கை ஆரம்பம் (Pre-KG முதல் 5-ஆம் வகுப்பு வரை) • அலுவலக நேரம்: காலை 9:00 - மாலை 4:00 • தொடர்பு: 86101 13160 / 96290 49907',
  tickerAnnouncementUr:
    'تعلیمی سال 2027-2028 کے داخلے جاری ہیں (پری کے جی تا پنجم) • دفتری اوقات: صبح 9:00 تا شام 4:00 • رابطہ: 86101 13160 / 96290 49907',
};

const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const TMP_FILE = path.join(process.platform === 'win32' ? process.env.TEMP || 'C:\\Windows\\Temp' : '/tmp', 'ots_school_config.json');

// Memory cache across warm serverless requests
let memoryCache: SiteConfig | null = null;

/**
 * Fetch config from Upstash / Vercel KV if configured, or fall back to /tmp/memory
 */
async function loadPersistentConfig(): Promise<SiteConfig> {
  if (KV_URL && KV_TOKEN) {
    try {
      const response = await fetch(`${KV_URL.replace(/\/$/, '')}/get/ots_site_config`, {
        headers: {
          Authorization: `Bearer ${KV_TOKEN}`,
        },
      });
      if (response.ok) {
        const data: any = await response.json();
        if (data && data.result) {
          const parsed = typeof data.result === 'string' ? JSON.parse(data.result) : data.result;
          if (parsed && typeof parsed === 'object') {
            const merged: SiteConfig = { ...DEFAULT_CONFIG, ...parsed };
            memoryCache = merged;
            return merged;
          }
        }
      }
    } catch {
      // Fallback to local/temp store if remote KV is temporarily unreachable
    }
  }

  // Fallback to memory cache
  if (memoryCache) {
    return memoryCache;
  }

  // Fallback to local temporary filesystem file
  try {
    if (fs.existsSync(TMP_FILE)) {
      const raw = fs.readFileSync(TMP_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        const merged: SiteConfig = { ...DEFAULT_CONFIG, ...parsed };
        memoryCache = merged;
        return merged;
      }
    }
  } catch {
    // Ignore file read error and fall back to DEFAULT_CONFIG
  }

  return DEFAULT_CONFIG;
}

/**
 * Save config to Upstash / Vercel KV and update local memory/temp
 */
async function savePersistentConfig(newConfig: SiteConfig): Promise<boolean> {
  memoryCache = newConfig;

  // Save to /tmp
  try {
    fs.writeFileSync(TMP_FILE, JSON.stringify(newConfig, null, 2), 'utf8');
  } catch {
    // Non-fatal if /tmp is read-only
  }

  if (KV_URL && KV_TOKEN) {
    try {
      const response = await fetch(`${KV_URL.replace(/\/$/, '')}/set/ots_site_config`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${KV_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(JSON.stringify(newConfig)),
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  return true;
}

/**
 * Validate authorized admin credentials:
 * Accepts:
 * - Authorization: Bearer olive2026
 * - Authorization: Basic YWRtaW46b2xpdmUyMDI2 (admin:olive2026 in Base64)
 * - Header x-admin-token: olive2026
 */
function isAuthorized(authHeader?: string | string[], adminTokenHeader?: string | string[]): boolean {
  if (adminTokenHeader && (adminTokenHeader === 'olive2026' || (Array.isArray(adminTokenHeader) && adminTokenHeader[0] === 'olive2026'))) {
    return true;
  }

  if (!authHeader) return false;
  const headerStr = Array.isArray(authHeader) ? authHeader[0] : authHeader;

  if (headerStr === 'Bearer olive2026') return true;

  if (headerStr.startsWith('Basic ')) {
    try {
      const b64 = headerStr.slice(6).trim();
      const decoded = Buffer.from(b64, 'base64').toString('utf8');
      const [user, pass] = decoded.split(':');
      if (user === 'admin' && pass === 'olive2026') {
        return true;
      }
    } catch {
      return false;
    }
  }

  return false;
}

/**
 * Standard serverless request handler
 */
export default async function handler(req: any, res: any) {
  // CORS & caching headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-token');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const config = await loadPersistentConfig();
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'public, s-maxage=15, stale-while-revalidate=60');
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, config, source: KV_URL ? 'cloud-kv' : 'cached' }));
      return;
    } catch {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, error: 'Failed to retrieve configuration', fallback: DEFAULT_CONFIG }));
      return;
    }
  }

  if (req.method === 'POST') {
    // Authenticate
    const authHeader = req.headers['authorization'];
    const adminToken = req.headers['x-admin-token'];

    if (!isAuthorized(authHeader, adminToken)) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, error: 'Unauthorized: Admin authentication required.' }));
      return;
    }

    // Parse Body
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'Invalid JSON payload.' }));
        return;
      }
    }

    if (!body || typeof body !== 'object') {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, error: 'Configuration object expected.' }));
      return;
    }

    // Validate fields
    const { admissionYear, yearsOfExcellence, primaryPhone, secondaryPhone, altPhone } = body;

    if (!admissionYear || typeof admissionYear !== 'string' || admissionYear.trim().length < 4 || admissionYear.trim().length > 25) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, error: 'Admission Year must be between 4 and 25 characters (e.g. "2027-2028").' }));
      return;
    }

    if (!yearsOfExcellence || typeof yearsOfExcellence !== 'string' || yearsOfExcellence.trim().length < 1 || yearsOfExcellence.trim().length > 15) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, error: 'Years of Excellence must be between 1 and 15 characters (e.g. "13+").' }));
      return;
    }

    const cleanPrimary = (primaryPhone || '').replace(/\D/g, '');
    if (cleanPrimary.length < 10) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, error: 'Primary phone must contain at least 10 digits.' }));
      return;
    }

    // Load current config and merge updates
    const currentConfig = await loadPersistentConfig();
    const updatedConfig: SiteConfig = {
      ...currentConfig,
      admissionYear: admissionYear.trim(),
      yearsOfExcellence: yearsOfExcellence.trim(),
      primaryPhone: primaryPhone.trim(),
      secondaryPhone: typeof secondaryPhone === 'string' ? secondaryPhone.trim() : currentConfig.secondaryPhone,
      altPhone: typeof altPhone === 'string' ? altPhone.trim() : currentConfig.altPhone,
    };

    // Auto-update ticker announcements if they mention old year/phones
    if (body.updateTickers !== false) {
      const year = updatedConfig.admissionYear;
      const phone1 = updatedConfig.primaryPhone;
      const phone2 = updatedConfig.secondaryPhone;
      const phonesFormatted = phone2 ? `${phone1} / ${phone2}` : phone1;

      updatedConfig.tickerAnnouncementEn = `Admissions Open ${year} for Pre-KG to 5th Std • Office Hours: 9:00 AM – 4:00 PM on all Working Days • Call ${phonesFormatted}`;
      updatedConfig.tickerAnnouncementTa = `${year} மாணவர் சேர்க்கை ஆரம்பம் (Pre-KG முதல் 5-ஆம் வகுப்பு வரை) • அலுவலக நேரம்: காலை 9:00 - மாலை 4:00 • தொடர்பு: ${phonesFormatted}`;
      updatedConfig.tickerAnnouncementUr = `تعلیمی سال ${year} کے داخلے جاری ہیں (پری کے جی تا پنجم) • دفتری اوقات: صبح 9:00 تا شام 4:00 • رابطہ: ${phonesFormatted}`;
    }

    await savePersistentConfig(updatedConfig);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: true, message: 'School configuration successfully updated and saved.', config: updatedConfig }));
    return;
  }

  res.statusCode = 405;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ success: false, error: 'Method Not Allowed' }));
}
