<script lang="ts">
  export let sections: { id: string; label: string }[] = [];
  let sidebarOpen = true;

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
</script>

<aside class={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
  <button class="toggle" on:click={() => (sidebarOpen = !sidebarOpen)}>
    {#if sidebarOpen}
      Hide
    {:else}
      ←
    {/if}
  </button>

  {#if sidebarOpen}
    <nav class="nav">
      <h3>Sections</h3>
      <ul>
        {#each sections as section}
          <li>
            <a class="nav-link" href={section.path}>{section.label}</a>
          </li>
        {/each}
      </ul>
    </nav>
  {/if}
</aside>

<style>
  .sidebar {
    position: fixed;      /* stick to viewport */
    top: 0;
    right: 0;             /* hug the right edge */
    height: 100vh;        /* full viewport height */
    background: #020617;
    border-left: 1px solid rgba(148, 163, 184, 0.4);
    padding: .5rem;
    width: 230px;
    transition: transform 0.2s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    z-index: 10;
  }

  /* slide it horizontally when “closed” */
  .sidebar.closed {
    transform: translateX(180px);
  }

  .toggle {
    background: transparent;
    border: 1px solid rgba(148, 163, 184, 0.7);
    color: #e5e7eb;
    border-radius: 999px;
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
    cursor: pointer;
    margin-bottom: 1rem;
  }

  .toggle:hover {
    background: rgba(148, 163, 184, 0.2);
  }

  .nav h3 {
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #9ca3af;
    margin: 0 0 0.75rem;
  }

  .nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .nav li + li {
    margin-top: 0.4rem;
  }

  .nav button {
    background: transparent;
    border: none;
    color: #e5e7eb;
    cursor: pointer;
    font-size: 0.95rem;
    padding: 0.2rem 0;
    text-align: left;
  }

  .nav button:hover {
    text-decoration: underline;
  }
  .nav-link {
    color: #e5e7eb;
    text-decoration: none;
    font-size: 0.95rem;
    cursor: pointer;
  }

  .nav-link:hover {
    text-decoration: underline;
  }
  @media (max-width: 768px) {
    .sidebar {
      position: static;
      width: 100%;
      height: auto;
      border-left: none;
      border-top: 1px solid rgba(148, 163, 184, 0.4);
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      transform: none;
    }

    .sidebar.closed {
      transform: none;
    }

    .nav {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .nav ul {
      display: flex;
      gap: 0.75rem;
    }

    .nav li + li {
      margin-top: 0;
    }
  }
</style>
