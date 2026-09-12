const ALLOWED_TAGS = new Set([
  'b', 'strong', 'i', 'em', 'u', 'br', 'p', 'div', 'span', 'h1', 'h2', 'h3', 'ul', 'ol', 'li',
]);

export function looksLikeHtml(value: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(value || '');
}

export function escapeHtml(text: string): string {
  return (text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function htmlToPlainText(html: string): string {
  return (html || '')
    .replace(/<\s*br\s*\/?>/gi, '\n')
    .replace(/<\/\s*(p|div|h1|h2|h3|li)\s*>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function sanitizeEmailHtml(html: string): string {
  if (!html) return '';

  let cleaned = html
    .replace(/<(script|style|iframe|object|embed|link|meta)[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<(script|style|iframe|object|embed|link|meta)[^>]*\/?>/gi, '')
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/(href|src)\s*=\s*(['"]?)\s*javascript:[^'"\s>]*/gi, '');

  cleaned = cleaned.replace(/<\/?([a-z0-9]+)(\s[^>]*)?>/gi, (match, tag: string, attrs = '') => {
    const t = tag.toLowerCase();
    if (t === 'font') {
      if (match.startsWith('</')) return '</span>';
      const colorAttr = String(attrs).match(/color\s*=\s*["']?([^"'\s>]+)/i);
      const value = colorAttr?.[1]?.trim().replace(/[^#a-z0-9(),.% ]/gi, '');
      return value ? `<span style="color: ${value};">` : '<span>';
    }
    if (!ALLOWED_TAGS.has(t)) return '';
    if (match.startsWith('</')) return `</${t}>`;
    if (t === 'br') return '<br />';

    let safeAttrs = '';
    if (['span', 'p', 'div', 'h1', 'h2', 'h3'].includes(t)) {
      const styles: string[] = [];
      const color = String(attrs).match(/style\s*=\s*["'][^"']*color\s*:\s*([^;"']+)/i);
      if (color) {
        const value = color[1].trim().replace(/[^#a-z0-9(),.% ]/gi, '');
        if (value) styles.push(`color: ${value}`);
      }
      const align = String(attrs).match(/style\s*=\s*["'][^"']*text-align\s*:\s*(center|left|right|justify)/i)
        || String(attrs).match(/align\s*=\s*["']?(center|left|right|justify)/i);
      if (align?.[1]) styles.push(`text-align: ${align[1].toLowerCase()}`);
      if (styles.length) safeAttrs = ` style="${styles.join('; ')};"`;
    }
    return `<${t}${safeAttrs}>`;
  });

  return cleaned;
}

export function toEmailBodyHtml(content: string): string {
  if (looksLikeHtml(content)) return sanitizeEmailHtml(content);
  return escapeHtml(content).replace(/\n/g, '<br />');
}
