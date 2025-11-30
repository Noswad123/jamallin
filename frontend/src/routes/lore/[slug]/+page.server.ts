import type { PageLoad } from './$types';
import matter from 'gray-matter';
import { marked } from 'marked';
import { base } from '$app/paths';

type LoreFrontmatter = {
  title?: string;
  slug?: string;
  hidden?: boolean;
};

const loreFiles = import.meta.glob('/src/lib/lore/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>;

export const load: PageLoad = async ({ params }) => {
  const { slug } = params;

  const entry = Object.entries(loreFiles).find(([path]) =>
    path.endsWith(`/${slug}.md`)
  );

  if (!entry) {
    throw new Error(`Lore entry not found: ${slug}`);
  }

  const [, raw] = entry;

  const { data, content } = matter(raw);
  const fm = data as LoreFrontmatter;

  const title = fm.title ?? slug;

  const rawHtml = marked.parse(content) as string;

  const html = rewriteLoreLinks(rawHtml, `${base}/lore/`);

  return {
    slug,
    title,
    hidden: fm.hidden ?? false,
    html
  };
};

/**
 * Converts internal lore links such as <a href="ideomancer"> into
 * fully qualified lore paths like <a href="/lore/ideomancer">.
 *
 * A link is considered a lore link if its href:
 * - does NOT start with "http://" or "https://"
 * - does NOT start with "/"
 * - does NOT start with "#" (anchor link)
 *
 * All such href values are treated as lore slugs and are prefixed
 * with the lore route path.
 */
function rewriteLoreLinks(html: string, lorePrefix: string): string {
  return html.replace(
    /href="([^"]+)"/g,
    (match, href) => {
      // Skip absolute URLs, root-relative URLs, and anchors
      if (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('/') ||
        href.startsWith('#')
      ) {
        return match;
      }

      // Otherwise, treat as lore slug
      return `href="${lorePrefix}${href}"`;
    }
  );
}
