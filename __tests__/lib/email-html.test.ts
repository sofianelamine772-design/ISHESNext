import { htmlToPlainText, looksLikeHtml, sanitizeEmailHtml, toEmailBodyHtml } from '@/lib/email-html';

describe('email-html', () => {
  test('détecte le HTML', () => {
    expect(looksLikeHtml('<b>bonjour</b>')).toBe(true);
    expect(looksLikeHtml('bonjour')).toBe(false);
  });

  test('conserve gras, italique, titre et couleur', () => {
    const html = sanitizeEmailHtml('<h2 style="color: #C69C6D">Rentrée</h2><p><b>gras</b> et <i>italique</i></p>');
    expect(html).toContain('<h2 style="color: #C69C6D;">');
    expect(html).toContain('<b>gras</b>');
    expect(html).toContain('<i>italique</i>');
  });

  test('conserve le centrage du titre', () => {
    const html = sanitizeEmailHtml('<h2 style="text-align: center; color: #0a192f">Rentrée</h2>');
    expect(html).toContain('text-align: center');
    expect(html).toContain('color: #0a192f');
  });

  test('conserve les couleurs Chrome via <font color>', () => {
    const html = sanitizeEmailHtml('<font color="#C69C6D">texte or</font>');
    expect(html).toContain('style="color: #C69C6D;"');
    expect(html).toContain('texte or');
    expect(html).not.toContain('<font');
  });

  test('retire les scripts', () => {
    const html = sanitizeEmailHtml('<p>ok</p><script>alert(1)</script>');
    expect(html).not.toContain('script');
    expect(html).toContain('<p>ok</p>');
  });

  test('convertit le HTML en texte', () => {
    expect(htmlToPlainText('<p>Bonjour</p><br />famille')).toContain('Bonjour');
  });

  test('échappe le texte brut', () => {
    expect(toEmailBodyHtml('a < b')).toBe('a &lt; b');
  });
});
