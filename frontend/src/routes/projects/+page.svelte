<script lang="ts">
  import { onMount } from 'svelte';
  import { marked } from 'marked';
  import { getLoreSource, getProjectLoreSlug, loreFileExists, type LoreSource } from '$lib/data/loreSources';

  type Project = {
    title: string;
    description: string;
    status: string;
    statusType: string;
    techStack: string[];
    githubUrl: string;
  };

  export let data: { projects: Project[] };

  const statusClassMap: Record<string, string> = {
    done: 'status--done',
    'in-progress': 'status--inprogress',
    todo: 'status--todo',
    blocked: 'status--blocked',
    urgent: 'status--urgent'
  };

  const defaultProject = data.projects.find((project) => project.title === 'Personal Site') ?? data.projects[0] ?? null;

  let selectedProject: Project | null = defaultProject;
  let loadingReadme = false;
  let readmeHtml: string | null = null;
  let readmeError: string | null = null;
  let readmeRequestId = 0;
  let selectedLoreSource: LoreSource | null = null;
  let loreRequestId = 0;
  let projectListOpen = true;

  onMount(() => {
    if (defaultProject) void selectProject(defaultProject, { collapseList: false });
  });

  function getRawReadmeUrl(githubUrl: string): string | null {
    try {
      const url = new URL(githubUrl);
      const [_, user, repo] = url.pathname.split('/');
      if (!user || !repo) return null;

      return `https://raw.githubusercontent.com/${user}/${repo}/HEAD/README.md`;
    } catch {
      return null;
    }
  }

  function rewriteImageSrc(html: string, baseUrl: string | null): string {
    if (!baseUrl) return html;

    return html.replace(/<img([^>]+)src="([^"]+)"([^>]*)>/g, (match, before, src, after) => {
      if (
        src.startsWith('http://') ||
        src.startsWith('https://') ||
        src.startsWith('/') ||
        src.startsWith('data:')
      ) {
        return match;
      }

      const normalized = src.replace(/^\.\//, '');
      return `<img${before}src="${baseUrl + normalized}"${after}>`;
    });
  }

  async function selectProject(project: Project, options: { collapseList?: boolean } = {}) {
    const requestId = ++readmeRequestId;

    selectedProject = project;
    if (options.collapseList ?? true) projectListOpen = false;
    readmeHtml = null;
    readmeError = null;
    void loadProjectLoreSource(project);

    const rawReadmeUrl = getRawReadmeUrl(project.githubUrl);
    if (!rawReadmeUrl) {
      readmeError = 'No GitHub README URL could be generated for this project.';
      return;
    }

    const rawBaseUrl = rawReadmeUrl.replace(/[^/]+$/, '');
    loadingReadme = true;

    try {
      const res = await fetch(rawReadmeUrl);
      if (!res.ok) throw new Error(`Failed to load README: ${res.status}`);

      const markdown = await res.text();
      const stripped = markdown.replace(/^\s*#{1,6}\s+.*\n/, '');
      const parsed = marked.parse(stripped) as string;
      if (requestId !== readmeRequestId) return;

      readmeHtml = rewriteImageSrc(parsed, rawBaseUrl);
    } catch (err) {
      if (requestId !== readmeRequestId) return;

      readmeError = err instanceof Error ? err.message : 'Failed to load README';
    } finally {
      if (requestId === readmeRequestId) loadingReadme = false;
    }
  }

  async function loadProjectLoreSource(project: Project) {
    const requestId = ++loreRequestId;
    selectedLoreSource = null;

    const slug = getProjectLoreSlug(project);
    if (!slug) return;

    try {
      const exists = await loreFileExists(slug);
      if (requestId === loreRequestId && exists) {
        selectedLoreSource = getLoreSource(slug);
      }
    } catch {
      if (requestId === loreRequestId) selectedLoreSource = null;
    }
  }

  function showProjectList() {
    projectListOpen = true;
  }
</script>

<main class="projects-page">
  <h1 class="projects-title">Here's what I've been hacking on.</h1>

  <div class="projects-shell">
    {#if !projectListOpen}
      <button
        type="button"
        class="projects-list-tab"
        aria-controls="projects-list"
        aria-expanded={projectListOpen}
        onclick={showProjectList}
      >
        Browse projects
      </button>
    {/if}

    <aside id="projects-list" class:projects-list--closed={!projectListOpen} class="projects-list" aria-label="Projects">
      {#each data.projects as project}
        <button
          type="button"
          class:active={selectedProject?.title === project.title}
          class="project-list-item"
          onclick={() => selectProject(project)}
        >
          <span class="project-list-item__topline">
            <span class="project-list-item__title">{project.title}</span>
            <span class={"status-pill " + (statusClassMap[project.statusType] ?? 'status--todo')}>
              {project.status}
            </span>
          </span>
          <span class="project-list-item__description">{project.description}</span>
        </button>
      {/each}
    </aside>

    <section class="project-detail" aria-live="polite">
      {#if selectedProject}
        <header class="project-detail__header">
          <div>
            <p class="project-detail__eyebrow">Selected project</p>
            <h2>{selectedProject.title}</h2>
          </div>
          <span class={"status-pill " + (statusClassMap[selectedProject.statusType] ?? 'status--todo')}>
            {selectedProject.status}
          </span>
        </header>

        <p class="project-detail__description">{selectedProject.description}</p>

        {#if selectedProject.techStack.length}
          <div class="tags" aria-label="Tech stack">
            {#each selectedProject.techStack as tech}
              <span class="tag">{tech}</span>
            {/each}
          </div>
        {/if}

        <div class="project-detail__links">
          <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer">GitHub repo</a>
          {#if selectedLoreSource}
            <a class="project-detail__lore-link" href={`/lore/${selectedLoreSource.slug}`}>lore?</a>
          {/if}
        </div>

        <div class="project-readme">
          {#if loadingReadme}
            <p class="project-readme__loading">Loading README...</p>
          {:else if readmeError}
            <p class="project-readme__error">Could not load README: {readmeError}</p>
          {:else if readmeHtml}
            <div class="project-readme__content">
              {@html readmeHtml}
            </div>
          {:else}
            <p class="project-readme__empty">No README available.</p>
          {/if}
        </div>
      {:else}
        <div class="project-detail__placeholder">
          <p class="project-detail__eyebrow">Projects</p>
          <h2>A small catalogue of experiments, tools, and ideas.</h2>
          <p>
            This space will eventually include more context about what I am building, why each
            project exists, and where it is headed next. For now, choose a project from the list to
            read its README here.
          </p>
        </div>
      {/if}
    </section>
  </div>
</main>

<style>
  :global(.page:has(.projects-page)) {
    padding: 20px;
    justify-content: flex-start;
  }

  :global(.page-inner:has(.projects-page)) {
    max-width: none;
    gap: 20px;
  }

  :global(.content:has(.projects-page)) {
    max-width: none;
    min-width: 0;
    width: 100%;
  }

  .projects-page {
    width: 100%;
    max-width: 100%;
    min-height: 100vh;
    padding: 0 0 4rem;
    overflow-x: clip;
  }

  .projects-title {
    width: 100%;
    margin: 0 0 1.5rem;
    font-size: 2rem;
  }

  .projects-shell {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    margin: 0;
    display: grid;
    grid-template-columns: minmax(22rem, 30rem) minmax(0, 1fr);
    align-items: start;
    gap: 20px;
  }

  .projects-list {
    position: sticky;
    top: 1rem;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-height: calc(100vh - 2rem);
    overflow: auto;
  }

  .projects-list-tab {
    display: none;
  }

  .project-list-item {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    padding: 18px 20px;
    border: 1px solid var(--border-dim);
    border-radius: var(--radius);
    background: var(--surface-panel-cold);
    color: var(--text-main);
    font: inherit;
    text-align: left;
    cursor: pointer;
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .project-list-item:hover,
  .project-list-item:focus-visible,
  .project-list-item.active {
    transform: translateX(3px);
    border-color: var(--border-hot);
    background: var(--surface-panel-warm);
    box-shadow: var(--panel-shadow), var(--glow-hot);
    outline: none;
  }

  .project-list-item__title {
    font-weight: 700;
  }

  .project-list-item__topline {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-inline-gap-md);
  }

  .project-list-item__description {
    display: block;
    width: 100%;
    overflow: hidden;
    color: var(--text-muted);
    font-size: var(--fs-body-small);
    line-height: var(--lh-tight);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .project-detail {
    min-width: 0;
    max-width: 100%;
    min-height: 70vh;
    padding: clamp(1rem, 3vw, 2rem);
    border: 1px solid var(--border-dim);
    border-radius: var(--radius);
    background: var(--surface-panel-cold);
    clip-path: var(--panel-cut);
    box-shadow: var(--panel-shadow);
  }

  .project-detail__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-inline-gap-md);
    margin-bottom: var(--space-stack-md);
  }

  .project-detail__header > div {
    min-width: 0;
  }

  .project-detail__eyebrow {
    margin: 0 0 var(--space-xs);
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: var(--fs-tag);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .project-detail__description,
  .project-detail__placeholder p {
    overflow-wrap: anywhere;
    color: var(--text-muted);
    margin: 0 0 var(--space-stack-md);
  }

  .project-detail__links {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin: 1rem 0 1.5rem;
  }

  .project-detail__links a {
    overflow-wrap: anywhere;
  }

  .project-detail__lore-link {
    color: var(--accent);
    font-family: var(--font-mono);
    text-decoration: underline;
    text-decoration-style: dotted;
  }

  .project-detail__lore-link:hover {
    text-decoration-style: solid;
  }

  .project-readme {
    min-width: 0;
    max-width: 100%;
    overflow-x: clip;
    border-top: 1px solid var(--border-dim);
    padding-top: 1.5rem;
  }

  .project-readme__content {
    max-width: 75ch;
    min-width: 0;
    overflow-wrap: anywhere;
  }

  .project-readme__content :global(*) {
    max-width: 100%;
  }

  .project-readme__content :global(img) {
    max-width: 100%;
    height: auto;
    border-radius: var(--radius-sm);
  }

  .project-readme__content :global(pre) {
    max-width: 100%;
    overflow: auto;
    padding: 1rem;
    border-radius: var(--radius-sm);
    border: 1px solid rgba(111, 199, 255, 0.24);
    background: rgba(3, 8, 14, 0.78);
    box-shadow: inset 0 0 24px rgba(39, 168, 255, 0.06);
  }

  .project-readme__content :global(code) {
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }

  .project-readme__content :global(table) {
    display: block;
    overflow-x: auto;
  }

  .project-readme__loading,
  .project-readme__error,
  .project-readme__empty {
    color: var(--text-muted);
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
    color: var(--grey-900);
  }

  .status--inprogress {
    background-color: var(--yellow);
    color: var(--grey-900);
  }

  .status--todo {
    background-color: var(--purple);
    color: var(--grey-900);
  }

  .status--blocked {
    background-color: var(--pink);
    color: var(--grey-900);
  }

  .status--urgent {
    background-color: var(--red);
    color: var(--grey-900);
  }

  @media (max-width: 800px) {
    :global(.page:has(.projects-page)) {
      overflow-x: clip;
      padding: 16px;
    }

    :global(.page-inner:has(.projects-page)),
    :global(.content:has(.projects-page)) {
      min-width: 0;
      max-width: 100%;
      overflow-x: clip;
    }

    .projects-title {
      font-size: clamp(1.55rem, 8vw, 2rem);
    }

    .projects-shell {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .projects-list-tab {
      position: sticky;
      top: 0.75rem;
      z-index: 2;
      display: inline-flex;
      width: fit-content;
      align-items: center;
      justify-content: center;
      padding: 0.65rem 0.9rem;
      border: 1px solid var(--accent);
      border-radius: var(--radius-pill);
      background: var(--bg-overlay);
      color: var(--accent);
      font: inherit;
      font-family: var(--font-mono);
      font-size: var(--fs-body-small);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }

    .projects-list {
      position: static;
      max-height: none;
    }

    .projects-list--closed {
      display: none;
    }

    .project-detail {
      padding: 1rem;
    }

    .project-detail__header {
      flex-direction: column;
      gap: 0.5rem;
    }

    .project-list-item:hover,
    .project-list-item:focus-visible,
    .project-list-item.active {
      transform: translateY(-2px);
    }
  }
</style>
