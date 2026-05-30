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
  } = $props() as ProjectCard;

  /** Map enum values -> CSS class names */
  const statusClassMap: Record<string, string> = {
    ['done']: "status--done",
    ['in-progress']: "status--inprogress",
    ['todo']: "status--todo",
    ['blocked']: "status--blocked",
    ['urgent']: "status--urgent",
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
</script>

<article class="card">
  <header class="card__header">
    <h3 class="card__title">
      <a 
        href={githubUrl}
        target="_blank"
        rel="noreferrer"
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

  <button type="button" class="card__toggle" aria-expanded={expanded} onclick={toggleExpanded}>
    {expanded ? 'Hide README' : 'Read README'}
  </button>

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
    background: var(--surface-panel-cold);
    border: 1px solid var(--border-dim);
    border-radius: var(--radius);
    clip-path: var(--panel-cut);
    padding: var(--space-card-padding);
    margin-bottom: var(--space-card-gap);
    box-shadow: var(--panel-shadow);
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .card:hover {
    transform: translateY(-4px);
    border-color: var(--border-hot);
    background: var(--surface-panel-warm);
    box-shadow: var(--panel-shadow), var(--glow-hot);
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

  .card__toggle {
    align-self: flex-start;
    margin-top: var(--space-stack-sm);
    padding: 0.45rem 0.7rem;
    border: 1px solid var(--border-hot);
    border-radius: var(--radius-pill);
    background: radial-gradient(circle at 50% 100%, rgba(255, 138, 61, 0.22), transparent 55%), rgba(5, 8, 18, 0.72);
    color: var(--ember-hot);
    cursor: pointer;
    font-family: var(--font-mono);
    font-size: var(--fs-tag);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .card__toggle:hover {
    border-color: var(--frost-soft);
    color: var(--frost-soft);
    box-shadow: var(--glow-cold);
  }

  .tags {
    display: flex;
    gap: var(--space-inline-gap-sm);
    flex-wrap: wrap;
  }

  .tag {
    font-size: var(--fs-tag);
    font-family: var(--font-mono);
    border: 1px solid rgba(111, 199, 255, 0.24);
    background: radial-gradient(circle at 50% 100%, rgba(39, 168, 255, 0.16), transparent 58%), var(--bg-overlay);
    color: var(--frost-soft);
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
    box-shadow: 0 0 14px rgba(0, 0, 0, 0.18);
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
