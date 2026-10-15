import { BlogPost } from '../types.ts';

export function updatePageSEO(options: {
  title: string;
  description: string;
  canonicalPath?: string;
  image?: string;
  article?: BlogPost;
}) {
  const { title, description, canonicalPath = window.location.pathname, image = '/images/hero_athlete.jpg', article } = options;

  // 1. Title
  document.title = title;

  // 2. Meta description
  updateOrCreateMeta('description', description);

  // 3. OpenGraph tags
  updateOrCreateMeta('og:title', title, 'property');
  updateOrCreateMeta('og:description', description, 'property');
  updateOrCreateMeta('og:type', article ? 'article' : 'website', 'property');
  
  const origin = window.location.origin || 'https://builtbydiscipline.com';
  const fullCanonical = `${origin}${canonicalPath}`;
  updateOrCreateMeta('og:url', fullCanonical, 'property');
  updateOrCreateMeta('og:image', `${origin}${image}`, 'property');

  // 4. Twitter tags
  updateOrCreateMeta('twitter:card', 'summary_large_image');
  updateOrCreateMeta('twitter:title', title);
  updateOrCreateMeta('twitter:description', description);
  updateOrCreateMeta('twitter:image', `${origin}${image}`);

  // 5. Canonical link tag
  let linkCanonical = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
  if (!linkCanonical) {
    linkCanonical = document.createElement('link');
    linkCanonical.setAttribute('rel', 'canonical');
    document.head.appendChild(linkCanonical);
  }
  linkCanonical.setAttribute('href', fullCanonical);

  // 6. Schema.org JSON-LD Structured Data
  let scriptJsonLd = document.querySelector<HTMLScriptElement>('#schema-jsonld');
  if (!scriptJsonLd) {
    scriptJsonLd = document.createElement('script');
    scriptJsonLd.id = 'schema-jsonld';
    scriptJsonLd.type = 'application/ld+json';
    document.head.appendChild(scriptJsonLd);
  }

  if (article) {
    const jsonLdData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline: article.title,
          description: article.metaDescription,
          image: `${origin}${article.image}`,
          datePublished: '2026-10-01T08:00:00+00:00',
          dateModified: '2026-10-15T08:00:00+00:00',
          author: {
            '@type': 'Organization',
            name: 'Built By Discipline Research Team',
            url: origin,
          },
          publisher: {
            '@type': 'Organization',
            name: 'Built By Discipline',
            logo: {
              '@type': 'ImageObject',
              url: `${origin}/favicon.ico`,
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': fullCanonical,
          },
          keywords: [article.primaryKeyword, ...article.relatedKeywords].join(', '),
        },
        {
          '@type': 'FAQPage',
          mainEntity: article.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: origin,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Journal',
              item: `${origin}/blog`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: article.title,
              item: fullCanonical,
            },
          ],
        },
      ],
    };
    scriptJsonLd.textContent = JSON.stringify(jsonLdData);
  } else {
    const jsonLdData = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Built By Discipline',
      applicationCategory: 'HealthAndFitnessApplication',
      operatingSystem: 'All',
      description: description,
      url: origin,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    };
    scriptJsonLd.textContent = JSON.stringify(jsonLdData);
  }
}

function updateOrCreateMeta(nameOrProperty: string, content: string, attributeType: 'name' | 'property' = 'name') {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attributeType}='${nameOrProperty}']`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attributeType, nameOrProperty);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}
