/**
 * Intégration newsletter (Brevo / Sibforms) : iframe, sitemap, métadonnées SEO.
 */
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { NewsletterEmbed, NEWSLETTER_FORM_URL } from '@/components/vitrine/NewsletterEmbed';
import sitemap from '@/app/sitemap';

describe('NewsletterEmbed', () => {
  it('pointe vers le formulaire Brevo v2 en HTTPS', () => {
    const url = new URL(NEWSLETTER_FORM_URL);
    expect(url.protocol).toBe('https:');
    expect(url.hostname).toBe('c8801ef7.sibforms.com');
    expect(url.pathname.startsWith('/v2/serve/')).toBe(true);
  });

  it('garde une hauteur de 760 px par défaut (305 px tronquait le formulaire)', () => {
    const html = renderToStaticMarkup(React.createElement(NewsletterEmbed));
    expect(html).toContain('height="760"');
    expect(html).not.toContain('height="305"');
  });

  it('est accessible, chargé en différé et ne déborde pas', () => {
    const html = renderToStaticMarkup(React.createElement(NewsletterEmbed));
    expect(html).toContain('title="Inscription aux lettres spirituelles de l’Institut ISHES"');
    expect(html).toContain('loading="lazy"');
    expect(html).toContain('max-w-full');
    expect(html).toContain('width="100%"');
  });

  it('accepte une hauteur personnalisée', () => {
    const html = renderToStaticMarkup(React.createElement(NewsletterEmbed, { height: 900 }));
    expect(html).toContain('height="900"');
  });
});

describe('sitemap', () => {
  it('référence la page /newsletter', () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls).toContain('https://ishes.fr/newsletter');
  });

  it("n'a pas d'URL en double", () => {
    const urls = sitemap().map((e) => e.url);
    expect(new Set(urls).size).toBe(urls.length);
  });
});
