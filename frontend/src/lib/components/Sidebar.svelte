<script lang="ts">
  import { page } from '$app/stores';
  import LogoMark from '$lib/components/LogoMark.svelte';

  export let sections: { path: string; label: string }[] = [];
  let sidebarOpen = true;
</script>

<aside class={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
  <button
    class="toggle"
    aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
    title={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
    on:click={() => (sidebarOpen = !sidebarOpen)}
  >
    <LogoMark />
  </button>

  <a
    class="mobile-home-link"
    class:home-active={$page.url.pathname === '/'}
    href="/"
    aria-label="Home"
    title="Home"
  >
    <LogoMark />
  </a>

  <nav class="nav" aria-hidden={!sidebarOpen}>
    <ul>
      {#each sections as section}
        <li class:mobile-hidden={section.path === '/'}>
          <a class="nav-link" href={section.path}>{section.label}</a>
        </li>
      {/each}
    </ul>
  </nav>
</aside>

<style>
  .sidebar {
    --sidebar-width: 230px;
    --sidebar-padding: 0.5rem;
    --sidebar-inline-padding: 1rem;
    --sidebar-collapsed-width: 72px;
    --toggle-width: 3.7rem;
    --toggle-height: 2.75rem;
    position: fixed;      /* stick to viewport */
    top: 0;
    right: 0;             /* hug the right edge */
    height: 100vh;        /* full viewport height */
    background:
      radial-gradient(circle at 0% 10%, rgba(255, 138, 61, 0.12), transparent 38%),
      var(--surface-panel-cold);
    border-left: 1px solid var(--border-dim);
    padding: var(--sidebar-padding);
    width: var(--sidebar-width);
    transition: transform 0.24s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    z-index: 10;
    box-shadow: var(--panel-shadow), -10px 0 32px rgba(0, 0, 0, 0.28);
  }

  /* slide it horizontally when “closed” */
  .sidebar.closed {
    transform: translateX(calc(var(--sidebar-width) - var(--sidebar-collapsed-width)));
  }

  .toggle {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at 50% 100%, rgba(255, 138, 61, 0.22), transparent 55%), rgba(5, 8, 18, 0.72);
    border: 1px solid var(--border-hot);
    color: var(--sidebar-toggle-color);
    border-radius: 999px;
    width: var(--toggle-width);
    height: var(--toggle-height);
    padding: 0.42rem 0.5rem;
    cursor: pointer;
    margin-bottom: 1rem;
    box-shadow: inset 0 0 14px rgba(255, 138, 61, 0.1), var(--glow-hot);
    transition:
      border-color 0.2s ease,
      color 0.2s ease,
      background 0.2s ease,
      box-shadow 0.2s ease,
      transform 0.24s ease-in-out;
  }

  .sidebar.open {
    --sidebar-toggle-color: var(--ember-hot);
  }

  .sidebar.open .toggle {
    transform: translateX(
      calc((var(--sidebar-width) - var(--sidebar-inline-padding) - var(--toggle-width)) / 2)
    );
  }

  .sidebar.closed {
    --sidebar-toggle-color: var(--frost-soft);
  }

  .toggle:hover {
    border-color: var(--frost-soft);
    color: var(--frost-soft);
    background: radial-gradient(circle at 50% 100%, rgba(39, 168, 255, 0.2), transparent 55%), rgba(5, 8, 18, 0.72);
  }

  .mobile-home-link {
    display: none;
  }

  .nav {
    align-self: stretch;
    opacity: 1;
    visibility: visible;
    transition:
      opacity 1s ease 0.24s,
      visibility 0s linear 0s;
  }

  .sidebar.closed .nav {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition:
      opacity 0.14s ease 0.08s,
      visibility 0s linear 0.22s;
  }

  .nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: center;
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
    border-inline: 2px solid transparent;
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
    border-inline-color: var(--ember-hot);
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
      justify-content: center;
      transform: none;
    }

    .sidebar.closed {
      transform: none;
    }

    .sidebar.open .toggle {
      transform: none;
    }

    .toggle {
      display: none;
    }

    .mobile-home-link {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--toggle-width);
      height: var(--toggle-height);
      padding: 0.42rem 0.5rem;
      color: var(--frost-soft);
      text-decoration: none;
      flex: 0 0 auto;
    }

    .mobile-home-link.home-active {
      color: var(--ember-hot);
    }

    .nav {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      width: 100%;
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      transition: none;
    }

    .sidebar.closed .nav {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      transition: none;
    }

    .mobile-hidden {
      display: none;
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
