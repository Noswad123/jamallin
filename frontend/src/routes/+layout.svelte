<script lang="ts">
  import './layout.css';
  import favicon from '$lib/assets/favicon.svg';
  import Sidebar from '$lib/components/Sidebar.svelte';

  export let data;

  const sections = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' }
  ];
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<main class="page">
  <div class="content">
    <!-- This is where +page.svelte (and nested routes) render -->
    <slot />
  </div>

  <Sidebar {sections} />
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: #0f172a;
    color: #e5e7eb;
  }

  .page {
    min-height: 100vh;
    display: flex;
    flex-direction: row;
  }

  .content {
    flex: 1;
    padding: 2rem 1.5rem;
    max-width: 900px;
    margin-right: 260px; /* space for fixed sidebar */
  }

  @media (max-width: 768px) {
    .page {
      flex-direction: column;
    }

    .content {
      margin-right: 0;
      padding-top: 1rem;
    }
  }
</style>
