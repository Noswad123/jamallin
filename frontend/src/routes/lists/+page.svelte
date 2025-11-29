<script lang="ts">
  import type { SimpleList, LayoutType } from '$lib/listsData';
  export let data: { lists: SimpleList[] };
  const lists = data.lists;

  const getLetter = (item: string) => item.trim().charAt(0).toUpperCase();

  const FILTERS: Array<{ label: string; value: 'all' | LayoutType }> = [
    { label: 'All', value: 'all' },
    { label: 'A–Z', value: 'az' },
    { label: 'Top 5', value: 'top5' },
    // { label: 'Top 10', value: 'top10' },
    // { label: 'Plain', value: 'plain' }
  ];

  let selectedFilter: 'all' | LayoutType = 'all';

  $: filteredLists =
    selectedFilter === 'all'
      ? lists
      : lists.filter((list) => list.layout === selectedFilter);

  // collapse state — all collapsed by default
  let openIndex: number | null = null;

  const toggle = (index: number) => {
    openIndex = openIndex === index ? null : index;
  };
</script>

<main class="lists-page main-content">
  <header class="lists-header">
    <h1>I have some strong opinions.</h1>
    <p class="lists-subtitle">
      Little collections of things I care about more than I probably should.
    </p>

    <div class="lists-filters" aria-label="Filter lists by layout type">
      {#each FILTERS as filter}
        <button
          type="button"
          class:selected={selectedFilter === filter.value}
          class="filter-chip"
          on:click={() => (selectedFilter = filter.value)}
        >
          {filter.label}
        </button>
      {/each}
    </div>
  </header>

  <section class="lists-grid" aria-label="Opinionated lists">
    {#if filteredLists.length === 0}
      <p class="lists-empty">
        Nothing here yet for this filter. Check back later (or choose “All”).
      </p>
    {:else}
      {#each filteredLists as list, index}
        <article class="list-card">
          <!-- Collapsible header -->
          <button
            type="button"
            class="list-header"
            on:click={() => toggle(index)}
            aria-expanded={openIndex === index}
          >
            <div class="list-header-text">
              <h2 class="list-title">{list.title}</h2>
              {#if list.description}
                <p class="list-description">{list.description}</p>
              {/if}
            </div>
            <span class="list-toggle-indicator">
              {openIndex === index ? 'Hide list' : 'Show list'}
            </span>
          </button>

          <!-- Expanded content -->
          {#if openIndex === index}
            {#if list.layout === 'az'}
              <ul class="list-items">
                {#each list.items as item}
                  <li class="list-item">
                    <span class="list-letter">{getLetter(item)}</span>
                    <span class="list-text">{item}</span>
                  </li>
                {/each}
              </ul>
              {:else if ['top5','top10'].includes(list.layout)}
              <ol class="list-items">
                {#each list.items as item, i}
                  <li class="list-item">
                    <span class="list-rank">{i + 1}.</span>
                    <span class="list-text">{item}</span>
                  </li>
                {/each}
              </ol>
            {:else}
              <ul class="list-items">
                {#each list.items as item}
                  <li class="list-item">
                    <span class="list-text">{item}</span>
                  </li>
                {/each}
              </ul>
            {/if}

            {#if list.note}
              <p class="list-note">{list.note}</p>
            {/if}

            <a class="list-more" href={`/lists/${list.slug}`}>
              More justification →
            </a>
          {/if}
        </article>
      {/each}
    {/if}
  </section>
</main>

<style>
  .lists-page {
    display: flex;
    flex-direction: column;
    gap: var(--space-section-y);
  }

  .lists-header {
    max-width: 60ch;
    display: flex;
    flex-direction: column;
    gap: var(--space-stack-md);
  }

  .lists-subtitle {
    margin: 0;
    color: var(--text-muted);
    font-size: var(--fs-body);
    line-height: var(--lh-relaxed);
  }

  .lists-filters {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-inline-gap-sm);
  }

  .filter-chip {
    padding: var(--space-xxs) var(--space-sm);
    border-radius: var(--radius-pill);
    border: 1px solid var(--border-dim);
    background: var(--bg-surface);
    color: var(--text-main);
    font-size: var(--fs-tag);
    cursor: pointer;
    transition:
      background-color 0.15s ease-out,
      border-color 0.15s ease-out,
      transform 0.08s ease-out;
  }

  .filter-chip.selected {
    background: var(--accent);
    border-color: var(--accent-hover);
    color: var(--status-text-dark);
    transform: translateY(-1px);
  }

  .filter-chip:hover:not(.selected) {
    background: var(--bg-overlay);
  }

  .lists-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: var(--space-card-gap);
    grid-auto-rows: auto;
    align-items: start;
  }

  .lists-empty {
    margin: 0;
    color: var(--text-muted);
    font-style: italic;
  }

  .list-card {
    background: var(--bg-surface);
    border-radius: var(--radius-md);
    padding: var(--space-card-padding);
    border: 1px solid var(--border-dim);
    display: flex;
    flex-direction: column;
    gap: var(--space-stack-sm);
    height: auto;
    overflow: visible;
  }

  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--space-sm);
    width: 100%;
    padding: 0;
    border: none;
    background: none;
    color: inherit;
    text-align: left;
    cursor: pointer;
  }

  .list-header-text {
    display: flex;
    flex-direction: column;
    gap: var(--space-xxs);
  }

  .list-title {
    margin: 0;
    font-size: var(--fs-h3);
  }

  .list-description {
    margin: 0;
    color: var(--text-muted);
    font-size: var(--fs-body-small);
    line-height: var(--lh-relaxed);
  }

  .list-toggle-indicator {
    font-size: var(--fs-tag);
    color: var(--text-muted);
    white-space: nowrap;
  }

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
  .list-rank {
  font-family: var(--font-mono);
  font-size: var(--fs-tag);
  color: var(--text-muted);
  min-width: 2ch;
  text-align: right;
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

  .list-note {
    margin: 0;
    margin-top: var(--space-sm);
    font-size: var(--fs-tag);
    color: var(--text-muted);
    font-style: italic;
  }

  .list-more {
    align-self: flex-start;
    font-size: var(--fs-tag);
    margin-top: var(--space-xs);
  }

  @media (max-width: 600px) {
    .lists-subtitle {
      font-size: var(--fs-body-small);
    }

    .list-card {
      padding: var(--space-md);
    }

    .list-toggle-indicator {
      font-size: var(--fs-tag);
    }
  }
</style>
