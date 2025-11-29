<script lang="ts">
  type ProjectCard = {
    title: string;
    description: string;
    link: string;
    techStack?: string[];
    status?: string;
    statusType?: StatusType;
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
    link, 
    techStack = [], 
    status = "unfinished", 
    statusType = StatusType.Todo
  } = $props<ProjectCard>();

  /** Map enum values -> CSS class names */
  const statusClassMap: Record<StatusType, string> = {
    [StatusType.Done]: "status--done",
    [StatusType.InProgress]: "status--inprogress",
    [StatusType.Todo]: "status--todo",
    [StatusType.Blocked]: "status--blocked",
    [StatusType.Urgent]: "status--urgent"
  };

  let statusClass = $state(statusClassMap[statusType]);
</script>

<article class="card">
  <header class="card__header">
    <h3 class="card__title">
      <a href={link} target="_blank" rel="noreferrer">{title}</a>
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
</article>

<style>
  .card {
    background-color: var(--bg-surface);
    border: 1px solid var(--border-dim);
    border-radius: var(--radius);
    padding: var(--space-card-padding);
    margin-bottom: var(--space-card-gap);
    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .card:hover {
    transform: translateY(-4px);
    border-color: var(--accent);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
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
    background-color: var(--status-done);
    color: var(--status-text-dark);
  }

  .status--inprogress {
    background-color: var(--status-inprogress);
    color: var(--status-text-dark);
  }

  .status--todo {
    background-color: var(--status-todo);
    color: var(--status-text-dark);
  }

  .status--blocked {
    background-color: var(--status-blocked);
    color: var(--status-text-dark);
  }

  .status--urgent {
    background-color: var(--status-urgent);
    color: var(--status-text-dark);
  }

  @media (max-width: 600px) {
    .card__header {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
