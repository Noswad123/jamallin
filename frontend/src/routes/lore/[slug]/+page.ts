import projects from '$lib/data/projects.json';
import { getLoreSource, getProjectLoreSlug } from '$lib/data/loreSources';
import type { PageLoad } from './$types';

export const entries = () => {
  const slugs = projects.map(getProjectLoreSlug).filter((slug): slug is string => Boolean(slug));
  return Array.from(new Set(slugs)).map((slug) => ({ slug }));
};

export const load: PageLoad = ({ params }) => {
  return { source: getLoreSource(params.slug) };
};
