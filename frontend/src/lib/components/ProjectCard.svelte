<script lang="ts">
  import { marked } from 'marked';
  type ProjectCard = {
    title: string;
    description: string;
    loreSlug?: string;
    githubUrl: string;
    techStack?: string[];
    status?: string;
    statusType?: string;
  }

  const StatusType = {
    Done: 'done',
    InProgress: 'in-progress',
    Todo: 'todo',
    Blocked: 'blocked',
    Urgent: 'urgent'
  } as const;

  type StatusType = (typeof StatusType)[keyof typeof StatusType];

  let { 
    title, 
    description, 
    githubUrl, 
    loreSlug,
    techStack = [], 
    status = "unfinished", 
    statusType = 'todo'
  } = $props<ProjectCard>();

  /** Map enum values -> CSS class names */
  const statusClassMap: Record<string, string> = {
    ['done']: "status--done",
    ['in-progress']: "status--inprogress",
    ['todo']: "status--todo",
    ['blocked']: "status--blocked",
    ['urgent']: "status--urgent"
  };

  const statusClass = $derived(statusClassMap[statusType]);

  let expanded = $state(false);
  let loadingReadme = $state(false);
  let readmeHtml = $state<string | null>(null);
  let readmeError = $state<string | null>(null);

  const rawReadmeUrl = (() => {
    try {
      const url = new URL(githubUrl);
      const [_, user, repo] = url.pathname.split('/');
      if (!user || !repo) return null;
      return `https://raw.githubusercontent.com/${user}/${repo}/HEAD/README.md`;
    } catch {
      return null;
    }
  })();

  const rawBaseUrl = rawReadmeUrl ? rawReadmeUrl.replace(/[^/]+$/, '') : null;

function rewriteImageSrc(html: string, baseUrl: string | null): string {
  if (!baseUrl) return html;

  return html.replace(
    /<img([^>]+)src="([^"]+)"([^>]*)>/g,
    (match, before, src, after) => {
      // Skip absolute URLs, root-relative, and data URLs
      if (
        src.startsWith('http://') ||
        src.startsWith('https://') ||
        src.startsWith('/') ||
        src.startsWith('data:')
      ) {
        return match;
      }

      // Treat as repo-relative
      const normalized = src.replace(/^.\//, ''); // remove leading ./ if present
      const full = baseUrl + normalized;

      return `<img${before}src="${full}"${after}>`;
    })
  }
  async function toggleExpanded() {
    expanded = !expanded;
    if (expanded && !readmeHtml && !readmeError && rawReadmeUrl) {
      loadingReadme = true;
      try {
        const res = await fetch(rawReadmeUrl);
        if (!res.ok) throw new Error(`Failed to load README: ${res.status}`);
        const markdown = await res.text();
        // safely remove first header of readme
        const stripped = markdown.replace(/^\s*#{1,6}\s+.*\n/, '');
        let html  = marked.parse(stripped) as string;
        html = rewriteImageSrc(html, rawBaseUrl);
        readmeHtml = html;
      } catch(err) {
        readmeError = err instanceof Error ? err.message : 'Failed to load README';
      } finally {
        loadingReadme = false;
      }
    }
  }
  function handleCardClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.closest('a, button')) return;
    toggleExpanded();
  }
</script>

<article class="card" onclick={handleCardClick}>
  <header class="card__header">
    <h3 class="card__title">
      <a 
        href={githubUrl}
        target="_blank"
        rel="noreferrer"
        onclick={(event) => event.stopPropagation()}
      >
        {title}
      </a>
    </h3>

    <span class={"status-pill " + statusClass}>
      {status}
    </span>
  </header>

  <p class="card__description">{description}</p>

  {#if techStack.length}
    <div class="tags">
      {#each techStack as tech}
        <span class="tag">{tech}</span>
      {/each}
    </div>
  {/if}

  {#if expanded}
    <div class="card__expanded">
      {#if loadingReadme}
        <p class="card__loading"> Loading README...</p>
      {:else if readmeError}
        <p class="card__error">Could not load README: {readmeError}</p>
      {:else if readmeHtml}
        <div class="card__readme">
          {@html readmeHtml}
        </div>
      {:else}
        <p class="card__empty">No README available.</p>
      {/if}
      <div class="card__footer">
        {#if loreSlug}
          <a
            href={`/lore/${loreSlug}`}
            class="card__lore-link"
            onclick={(event) => event.stopPropagation()}
          >
            lore?
          </a>
        {/if}
      </div>
    </div>
  {/if}
</article>

<style>
  .card {
    width: 100%;
    background-color: var(--bg-surface);
    border: 1px solid var(--border-dim);
    border-radius: var(--radius);
    padding: var(--space-card-padding);
    margin-bottom: var(--space-card-gap);
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;
  }

  .card:hover {
    transform: translateY(-4px);
    border-color: var(--accent);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
  }

  .card__expanded {
    border-color: var(--accent);
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-dim);
  }

  .card__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-inline-gap-md);
    margin-bottom: var(--space-stack-sm);
  }

  .card__title {
    margin: 0;
    font-size: var(--fs-card-title);
  }

  .card__description {
    color: var(--text-muted);
    margin: 0 0 var(--space-stack-md) 0;
  }

  .card__loading,
  .card__error,
  .card__empty {
    font-size: .9rem;
    color: var(--text-muted);
  }

  .card__readme {
    margin-bottom: .75rem;
    max-height: 400px;
    overflow: auto;
  }

  .card__footer {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .card__lore-link {
    font-size: .85rem;
    font-family: var(--font-mono);
    text-transform: lowercase;
    color: var(--accent);
    text-decoration: underline;
    text-decoration-style: dotted;
  }

  .card__lore-link:hover {
    text-decoration-style: solid;
  }

  .tags {
    display: flex;
    gap: var(--space-inline-gap-sm);
    flex-wrap: wrap;
  }

  .tag {
    font-size: var(--fs-tag);
    font-family: var(--font-mono);
    background-color: var(--bg-overlay);
    color: var(--accent);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-sm);
  }

  /* --- STATUS PILL --- */
  .status-pill {
    font-size: var(--fs-tag);
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    border-radius: var(--radius-pill);
    padding: 0.25rem 0.75rem;
    white-space: nowrap;
  }

  .status--done {
    background-color: var(--green);
    color: var(--near-black);
  }

  .status--inprogress {
    background-color: var(--yellow);
    color: var(--near-black);
  }

  .status--todo {
    background-color: var(--purple);
    color: var(--near-black);
  }

  .status--blocked {
    background-color: var(--pink);
    color: var(--near-black);
  }

  .status--urgent {
    background-color: var(--red);
    color: var(--near-black);
  }

  @media (max-width: 600px) {
    .card__header {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
