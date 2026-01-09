// Rate limiting store
const rateLimitStore = new Map<string, number[]>();

export const sanitizeInput = (input: string): string => {
  // Basic HTML sanitization without external dependency
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*<\/script>)/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*<\/iframe>)/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*<\/object>)/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*<\/embed>)/gi, '')
    .replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*<\/form>)/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
};

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password: string): { valid: boolean; message: string } => {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  return { valid: true, message: 'Password is valid' };
};

export const rateLimit = (key: string, limit: number, windowMs: number): boolean => {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  if (!rateLimitStore.has(key)) {
    rateLimitStore.set(key, []);
  }
  
  const requests = rateLimitStore.get(key)!.filter(time => time > windowStart);
  
  if (requests.length >= limit) {
    return false;
  }
  
  requests.push(now);
  rateLimitStore.set(key, requests);
  return true;
};

export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

export const encryptApiKey = (apiKey: string): string => {
  // In production, use proper encryption
  return btoa(apiKey);
};

export const decryptApiKey = (encryptedKey: string): string => {
  // In production, use proper decryption
  return atob(encryptedKey);
};
