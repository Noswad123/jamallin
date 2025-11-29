import type { PageLoad } from './$types';
import matter from 'gray-matter';
import { marked } from 'marked';

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

  // Markdown -> HTML
  const rawHtml = marked.parse(content) as string;

  // Fix internal lore links
  const html = rewriteLoreLinks(rawHtml);

  return {
    slug,
    title,
    hidden: fm.hidden ?? false,
    html
  };
};

/**
 * Rewrite <a href="ideomancer"> to <a href="/lore/ideomancer">
 *
 * Rules:
 * - If href DOES NOT start with http(s):// AND
 * - DOES NOT start with "/" AND
 * - DOES NOT start with "#" (anchors)
 * → treat it as a lore slug and prefix with "/lore/".
 */
function rewriteLoreLinks(html: string): string {
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
      return `href="/lore/${href}"`;
    }
  );
}
