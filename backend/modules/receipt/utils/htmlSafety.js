export const escapeHtml = (value) => {
  return String(value ?? '').replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[ch]));
};

export const safeMessage = (error, fallback) => {
  return process.env.NODE_ENV === 'production' ? fallback : error.message;
};