<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<svelte:head>
  <title>{data.title} | Lore</title>
</svelte:head>

<main class="lore">
  <article class="lore-article">
    <h1 class="lore-title">{data.title}</h1>
    <div class="lore-body">
      {@html data.html}
    </div>
  </article>
</main>

<style>
  .lore {
    max-width: 60rem;
    margin: 0 auto;
    padding: 2rem 1.5rem 4rem;
  }

  .lore-title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
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
</style>
