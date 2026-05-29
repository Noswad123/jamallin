<script lang="ts">
  export let sections: { path: string; label: string }[] = [];
  let sidebarOpen = true;
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
    background:
      radial-gradient(circle at 0% 10%, rgba(255, 138, 61, 0.12), transparent 38%),
      var(--surface-panel-cold);
    border-left: 1px solid var(--border-dim);
    padding: .5rem;
    width: 230px;
    transition: transform 0.2s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    z-index: 10;
    box-shadow: var(--panel-shadow), -10px 0 32px rgba(0, 0, 0, 0.28);
  }

  /* slide it horizontally when “closed” */
  .sidebar.closed {
    transform: translateX(180px);
  }

  .toggle {
    background: radial-gradient(circle at 50% 100%, rgba(255, 138, 61, 0.22), transparent 55%), rgba(5, 8, 18, 0.72);
    border: 1px solid var(--border-hot);
    color: var(--ember-hot);
    border-radius: 999px;
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
    font-family: var(--font-mono);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    margin-bottom: 1rem;
    box-shadow: inset 0 0 14px rgba(255, 138, 61, 0.1), var(--glow-hot);
  }

  .toggle:hover {
    border-color: var(--frost-soft);
    color: var(--frost-soft);
    background: radial-gradient(circle at 50% 100%, rgba(39, 168, 255, 0.2), transparent 55%), rgba(5, 8, 18, 0.72);
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
    color: var(--text-main);
    cursor: pointer;
    font-size: 0.95rem;
    padding: 0.2rem 0;
    text-align: left;
  }

  .nav button:hover {
    text-decoration: underline;
  }
  .nav-link {
    display: block;
    padding: 0.35rem 0.45rem;
    border-left: 2px solid transparent;
    color: var(--frost-soft);
    text-decoration: none;
    font-size: 0.95rem;
    font-family: var(--font-mono);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
  }

  .nav-link:hover {
    border-left-color: var(--ember-hot);
    color: var(--ember-hot);
    text-shadow: 0 0 12px var(--ember-glow);
    text-decoration: underline;
  }
  @media (max-width: 768px) {
    .sidebar {
      position: static;
      width: 100%;
      height: auto;
      border-left: none;
      border-top: 1px solid var(--border-dim);
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
