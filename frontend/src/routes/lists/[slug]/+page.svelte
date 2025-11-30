<script lang="ts">
  import type { SimpleList } from '$lib/data/listsData';
  export let data: { list: SimpleList };
  const { list } = data;

  const getLetter = (item: string) => item.trim().charAt(0).toUpperCase();
</script>

<main class="list-detail main-content">
  <header class="list-detail-header">
    <h1>{list.title}</h1>
    {#if list.description}
      <p class="list-detail-subtitle">{list.description}</p>
    {/if}
  </header>

  <section class="list-detail-items">
    {#if list.layout === 'az'}
      <ul class="list-items">
        {#each list.items as item}
          <li class="list-item">
            <span class="list-letter">{getLetter(item)}</span>
            <span class="list-text">{item}</span>
          </li>
        {/each}
      </ul>
    {:else}
      <ul class="list-items">
        {#each list.items as item}
          <li class="list-item">
            <span class="list-text">{item}</span>
          </li>
        {/each}
      </ul>
    {/if}
  </section>

  {#if list.justification}
    <section class="list-justification">
      <h2>More justification.</h2>
      <p class="list-justification-body">
        {@html list.justification.replace(/\n/g, '<br />')}
      </p>
    </section>
  {/if}
</main>

<style>
  .list-detail {
    display: flex;
    flex-direction: column;
    gap: var(--space-section-y);
  }

  .list-detail-header {
    max-width: 60ch;
    display: flex;
    flex-direction: column;
    gap: var(--space-stack-md);
  }

  .list-detail-subtitle {
    margin: 0;
    color: var(--text-muted);
    font-size: var(--fs-body);
    line-height: var(--lh-relaxed);
  }

  /* reuse list styles from lists page or extract into a shared class */
  .list-items {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .list-item {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    font-size: var(--fs-body);
  }

  .list-letter {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.8rem;
    height: 1.8rem;
    border-radius: var(--radius-pill);
    border: 1px solid var(--border-dim);
    background: var(--bg-overlay);
    font-family: var(--font-mono);
    font-size: var(--fs-tag);
    color: var(--text-muted);
    flex-shrink: 0;
  }

  .list-text {
    flex: 1;
  }

  .list-justification {
    max-width: 60ch;
    display: flex;
    flex-direction: column;
    gap: var(--space-stack-sm);
  }

  .list-justification-body {
    margin: 0;
    color: var(--text-muted);
    font-size: var(--fs-body);
    line-height: var(--lh-relaxed);
    white-space: pre-wrap;
  }
</style>
