<script lang="ts">
  import '../global.css';
  import favicon from '$lib/assets/favicon.svg';
  import Sidebar from '$lib/components/Sidebar.svelte';

  const sections = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/lists', label: 'Lists' },
    { path: '/tribute', label: 'Tribute' }
  ];
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<main class="page">
  <div class="page-inner">
    <div class="content">
      <!-- This is where +page.svelte (and nested routes) render -->
      <slot />
    </div>

    <aside class="sidebar-wrapper">
      <Sidebar {sections} />
    </aside>
  </div>
</main>

<style>
  .page {
    min-height: 100vh;
    display: flex;
    /* center the whole layout on wide screens */
    justify-content: center;
    padding: 2rem 1.5rem;
  }

  .page-inner {
    /* full-width on small screens, capped on large */
    width: 100%;
    max-width: 1200px;

    display: flex;
    flex-direction: row;
    gap: 2rem;
  }

  .content {
    /* content is the main column */
    flex: 1;
    max-width: 800px;
  }

  .sidebar-wrapper {
    /* keep the sidebar nicely sized */
    width: 220px;
    flex-shrink: 0;

    /* make it follow scroll but not overlap header */
    position: sticky;
    top: 2rem;
  }

  @media (max-width: 900px) {
    .page {
      padding: 1.5rem 1rem 3rem;
    }

    .page-inner {
      flex-direction: column-reverse;
      max-width: 100%;
    }

    .content {
      max-width: 100%;
    }

    .sidebar-wrapper {
      width: 100%;
      position: static;
      order: 2;
    }
  }
</style>
