export type LoreProject = {
  title: string;
  githubUrl: string;
};

export type LoreSource = {
  slug: string;
  title: string;
  sourcePath: string;
  sourceMarkdownUrl: string;
  sourceWebUrl: string;
  sourceWebRootUrl: string;
  sourceRawRootUrl: string;
};

const jamalArcanaRawBase = 'https://raw.githubusercontent.com/Noswad123/jamal-arcana/HEAD';
const jamalArcanaWebBase = 'https://github.com/Noswad123/jamal-arcana/blob/main';

const knownLoreSlugs = [
  'aerospace',
  'celestial-loom',
  'coven',
  'djinn',
  'errandhall',
  'foodie',
  'grimmoire',
  'hivemind',
  'ideomancer',
  'lasoundra',
  'mimic',
  'mind-weaver',
  'opencode',
  'polyglot',
  'sagebond',
  'tmux',
  'top-five',
  'twin-loci',
  'waystone',
  'wisp'
];

export function getLoreSource(slug: string): LoreSource {
  const sourcePath = `docs/lore/${slug}.md`;

  return {
    slug,
    title: titleFromSlug(slug),
    sourcePath,
    sourceMarkdownUrl: `${jamalArcanaRawBase}/${sourcePath}`,
    sourceWebUrl: `${jamalArcanaWebBase}/${sourcePath}`,
    sourceWebRootUrl: `${jamalArcanaWebBase}/`,
    sourceRawRootUrl: `${jamalArcanaRawBase}/`
  };
}

export function getKnownLoreSlugs(): string[] {
  return knownLoreSlugs;
}

export function isKnownLoreSlug(slug: string): boolean {
  return knownLoreSlugs.includes(slug);
}

export function getProjectLoreSlug(project: LoreProject): string | null {
  try {
    const url = new URL(project.githubUrl);
    const repo = url.pathname.split('/').filter(Boolean).at(1)?.replace(/\.git$/, '');
    return repo ? slugify(repo) : slugify(project.title);
  } catch {
    return slugify(project.title);
  }
}

export async function loreFileExists(slug: string): Promise<boolean> {
  const source = getLoreSource(slug);
  const res = await fetch(source.sourceMarkdownUrl, { method: 'HEAD' });

  if (res.ok) return true;

  if (res.status === 405) {
    const fallback = await fetch(source.sourceMarkdownUrl);
    return fallback.ok;
  }

  return false;
}

function titleFromSlug(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
