<script lang="ts">
  import { browser } from '$app/environment';
  import { marked } from 'marked';
  import { isKnownLoreSlug, type LoreSource } from '$lib/data/loreSources';
  import type { PageData } from './$types';

  export let data: PageData;

  let loading = true;
  let html = '';
  let loadError: string | null = null;
  let loadedSlug: string | null = null;
  let loreRequestId = 0;

  $: if (browser && data.source.slug !== loadedSlug) {
    loadedSlug = data.source.slug;
    void loadLore(data.source);
  }

  async function loadLore(source: LoreSource) {
    const requestId = ++loreRequestId;
    loading = true;
    html = '';
    loadError = null;

    try {
      const res = await fetch(source.sourceMarkdownUrl);
      if (!res.ok) throw new Error(`Failed to load Jamal Arcana lore: ${res.status}`);

      const markdown = await res.text();
      const selectedMarkdown = markdown.replace(/^\s*#\s+.*\n/, '').trim();

      if (!selectedMarkdown.trim()) {
        throw new Error(`No lore file found for ${source.title}.`);
      }

      if (requestId === loreRequestId) {
        html = rewriteDocLinks(marked.parse(selectedMarkdown) as string, source);
      }
    } catch (err) {
      if (requestId === loreRequestId) {
        loadError = err instanceof Error ? err.message : 'Failed to load lore.';
      }
    } finally {
      if (requestId === loreRequestId) loading = false;
    }
  }

  function rewriteDocLinks(renderedHtml: string, source: LoreSource): string {
    return renderedHtml.replace(/(\s(?:href|src)=)"([^"]*)"/g, (match, attr, value) => {
      const rewrittenUrl = rewriteDocUrl(value, source, attr.includes('src'));
      return rewrittenUrl === value ? match : `${attr}"${rewrittenUrl}"`;
    });
  }

  function rewriteDocUrl(value: string, source: LoreSource, isAsset: boolean): string {
    if (!value || isStandaloneUrl(value) || value.startsWith('#')) return value;

    const repoPath = resolveRepositoryPath(value, source.sourcePath);
    if (!repoPath) return value;

    const { path, search, hash } = repoPath;

    if (!isAsset && path.startsWith('docs/lore/') && path.endsWith('.md')) {
      const slug = path.split('/').pop()?.replace(/\.md$/, '');

      if (slug && isKnownLoreSlug(slug)) {
        return `/lore/${slug}${search}${hash}`;
      }
    }

    const baseUrl = isAsset ? source.sourceRawRootUrl : source.sourceWebRootUrl;
    return `${baseUrl}${path}${search}${hash}`;
  }

  function isStandaloneUrl(value: string): boolean {
    return /^[a-z][a-z0-9+.-]*:/i.test(value) || value.startsWith('//');
  }

  function resolveRepositoryPath(
    value: string,
    sourcePath: string
  ): { path: string; search: string; hash: string } | null {
    try {
      const base = `https://jamal-arcana.local/${sourcePath}`;
      const resolved = new URL(value, base);

      if (resolved.origin !== 'https://jamal-arcana.local') {
        return null;
      }

      const path = decodeURIComponent(resolved.pathname.replace(/^\/+/, ''));

      if (!path) {
        return null;
      }

      if (value.startsWith('/') && !/^(assets|docs|img)\//.test(path)) {
        return null;
      }

      return { path, search: resolved.search, hash: resolved.hash };
    } catch {
      return null;
    }
  }
</script>

<svelte:head>
  <title>{data.source.title} | Lore</title>
</svelte:head>

<main class="lore">
  <nav class="lore-actions" aria-label="Lore navigation">
    <a class="lore-back" href={`/projects?project=${data.source.slug}`}>← Back to projects</a>
  </nav>

  <article class="lore-article">
    {#if loading}
      <p class="lore-muted">Loading lore from Jamal Arcana...</p>
    {:else if loadError}
      <div class="lore-error">
        <p>{loadError}</p>
        <a href={data.source.sourceWebUrl} target="_blank" rel="noreferrer">Open the source doc</a>
      </div>
    {:else}
      <div class="lore-body">
        {@html html}
      </div>
    {/if}

    <p class="lore-source">
      Source:
      <a href={data.source.sourceWebUrl} target="_blank" rel="noreferrer">
        Noswad123/jamal-arcana docs/lore/{data.source.slug}.md
      </a>
    </p>
  </article>
</main>

<style>
  .lore {
    max-width: 60rem;
    margin: 0 auto;
    padding: 2rem 1.5rem 4rem;
  }

  .lore-actions {
    margin-bottom: 1.5rem;
  }

  .lore-back {
    display: inline-flex;
    align-items: center;
    width: fit-content;
    padding: 0.55rem 0.85rem;
    border: 1px solid var(--border-dim);
    border-radius: var(--radius-pill);
    background: var(--bg-overlay);
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: var(--fs-body-small);
    text-decoration: none;
  }

  .lore-back:hover,
  .lore-back:focus-visible {
    border-color: var(--border-hot);
    box-shadow: var(--glow-hot);
    outline: none;
  }

  .lore-muted,
  .lore-error,
  .lore-source {
    color: var(--text-muted);
  }

  .lore-source {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-dim);
    font-size: var(--fs-body-small);
  }

  .lore-body :global(p) {
    margin-bottom: 1rem;
    line-height: 1.7;
  }

  .lore-body :global(a) {
    text-decoration: underline;
    text-decoration-style: dotted;
  }

  .lore-body :global(a:hover) {
    text-decoration-style: solid;
  }

  .lore-body :global(img) {
    max-width: 100%;
    height: auto;
    border-radius: var(--radius-sm);
  }

  .lore-body :global(pre) {
    overflow: auto;
    padding: 1rem;
    border-radius: var(--radius-sm);
    background: var(--bg-body);
  }
</style>
