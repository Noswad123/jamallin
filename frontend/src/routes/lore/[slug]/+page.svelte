<script lang="ts">
  import { onMount } from 'svelte';
  import { marked } from 'marked';
  import type { PageData } from './$types';

  export let data: PageData;

  let loading = true;
  let html = '';
  let loadError: string | null = null;

  onMount(async () => {
    try {
      const res = await fetch(data.source.sourceMarkdownUrl);
      if (!res.ok) throw new Error(`Failed to load Jamal Arcana lore: ${res.status}`);

      const markdown = await res.text();
      const selectedMarkdown = markdown.replace(/^\s*#\s+.*\n/, '').trim();

      if (!selectedMarkdown.trim()) {
        throw new Error(`No lore file found for ${data.source.title}.`);
      }

      html = rewriteDocLinks(marked.parse(selectedMarkdown) as string, data.source.sourceWebBaseUrl);
    } catch (err) {
      loadError = err instanceof Error ? err.message : 'Failed to load lore.';
    } finally {
      loading = false;
    }
  });

  function rewriteDocLinks(renderedHtml: string, sourceWebBaseUrl: string): string {
    return renderedHtml.replace(/href="([^"]+)"/g, (match, href) => {
      if (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('/') ||
        href.startsWith('#')
      ) {
        return match;
      }

      return `href="${sourceWebBaseUrl}${href}"`;
    });
  }
</script>

<svelte:head>
  <title>{data.source.title} | Lore</title>
</svelte:head>

<main class="lore">
  <article class="lore-article">
    <p class="lore-source-label">Pulled from Jamal Arcana</p>
    <h1 class="lore-title">{data.source.title}</h1>

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

  .lore-source-label {
    margin: 0 0 var(--space-xs);
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: var(--fs-tag);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .lore-title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
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

  .lore-body :global(pre) {
    overflow: auto;
    padding: 1rem;
    border-radius: var(--radius-sm);
    background: var(--bg-body);
  }
</style>
