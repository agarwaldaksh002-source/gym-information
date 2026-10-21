import { BlogPost } from '../types.ts';

export function updatePageSEO(options: {
  title: string;
  description: string;
  canonicalPath?: string;
  image?: string;
  article?: BlogPost;
}) {
  const {
    title,
    description,
    canonicalPath = window.location.pathname,
    image = '/images/hero_athlete.jpg',
    article,
  } = options;

  // 1. Title Tag
  document.title = title;

  // 2. Meta description & robots
  updateOrCreateMeta('description', description);
  updateOrCreateMeta(
    'robots',
    'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  );
  updateOrCreateMeta('author', article ? article.author.name : 'Built By Discipline Athletic Science');

  // 3. OpenGraph tags
  updateOrCreateMeta('og:title', title, 'property');
  updateOrCreateMeta('og:description', description, 'property');
  updateOrCreateMeta('og:type', article ? 'article' : 'website', 'property');
  updateOrCreateMeta('og:site_name', 'Built By Discipline', 'property');

  const origin = window.location.origin || 'https://gyminformationbyda.vercel.app';
  const fullCanonical = `${origin}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;
  const fullImageUrl = image.startsWith('http') ? image : `${origin}${image}`;

  updateOrCreateMeta('og:url', fullCanonical, 'property');
  updateOrCreateMeta('og:image', fullImageUrl, 'property');
  updateOrCreateMeta('og:image:alt', article ? article.alt : 'Built By Discipline Athletic Performance', 'property');

  // 4. Twitter Card tags
  updateOrCreateMeta('twitter:card', 'summary_large_image');
  updateOrCreateMeta('twitter:title', title);
  updateOrCreateMeta('twitter:description', description);
  updateOrCreateMeta('twitter:image', fullImageUrl);
  updateOrCreateMeta('twitter:image:alt', article ? article.alt : 'Built By Discipline Athletic Performance');

  // 5. Canonical Link tag
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
          '@id': `${fullCanonical}#article`,
          isPartOf: {
            '@type': 'WebPage',
            '@id': fullCanonical,
          },
          headline: article.title,
          description: article.metaDescription,
          image: [fullImageUrl],
          datePublished: '2026-10-01T08:00:00+00:00',
          dateModified: '2026-10-15T08:00:00+00:00',
          author: {
            '@type': 'Person',
            name: article.author.name,
            jobTitle: article.author.role,
            description: article.author.credentials,
            url: `${origin}/blog`,
          },
          reviewedBy: {
            '@type': 'Person',
            name: article.reviewedBy.name,
            jobTitle: article.reviewedBy.role,
          },
          publisher: {
            '@type': 'Organization',
            name: 'Built By Discipline',
            url: origin,
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
          articleSection: article.category,
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', '.aeo-direct-answer', '.summary-takeaway'],
          },
        },
        {
          '@type': 'FAQPage',
          '@id': `${fullCanonical}#faq`,
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
          '@id': `${fullCanonical}#breadcrumb`,
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
              name: 'Athletic Journal',
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
    scriptJsonLd.textContent = JSON.stringify(jsonLdData, null, 2);
  } else if (canonicalPath === '/blog' || canonicalPath === '/blog/') {
    const jsonLdData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': `${origin}/blog#webpage`,
          url: `${origin}/blog`,
          name: title,
          description: description,
          publisher: {
            '@type': 'Organization',
            name: 'Built By Discipline',
            url: origin,
          },
          breadcrumb: {
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
                name: 'Athletic Journal',
                item: `${origin}/blog`,
              },
            ],
          },
        },
      ],
    };
    scriptJsonLd.textContent = JSON.stringify(jsonLdData, null, 2);
  } else {
    // Homepage Schema
    const jsonLdData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${origin}/#website`,
          url: origin,
          name: 'Built By Discipline',
          description: description,
          publisher: {
            '@type': 'Organization',
            name: 'Built By Discipline',
            url: origin,
            logo: {
              '@type': 'ImageObject',
              url: `${origin}/favicon.ico`,
            },
          },
        },
        {
          '@type': 'Organization',
          '@id': `${origin}/#organization`,
          name: 'Built By Discipline',
          url: origin,
          logo: `${origin}/favicon.ico`,
          sameAs: [
            'https://instagram.com/builtbydiscipline',
            'https://youtube.com/@builtbydiscipline',
            'https://x.com/builtbydisc',
          ],
        },
        {
          '@type': 'WebApplication',
          '@id': `${origin}/#application`,
          name: 'Built By Discipline Athletic Portal',
          applicationCategory: 'HealthAndFitnessApplication',
          operatingSystem: 'All',
          description: description,
          url: origin,
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        },
      ],
    };
    scriptJsonLd.textContent = JSON.stringify(jsonLdData, null, 2);
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
