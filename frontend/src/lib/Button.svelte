<script>
  export let href = null;
</script>

{#if href}
  <a {href} class="powder-btn">
    <slot />
  </a>
{:else}
  <button class="powder-btn">
    <slot />
  </button>
{/if}

<style>
  .powder-btn {
    /* Layout */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius);
    
    /* Typography */
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease;

    /* Theme Application */
    /* Note: Use dark text on light blue for readability */
    background-color: var(--accent);
    color: var(--bg-base); 
    border: 2px solid var(--accent);
  }

  .powder-btn:hover {
    background-color: var(--accent-hover);
    border-color: var(--accent-hover);
    transform: translateY(-2px); /* Subtle lift effect */
  }

  .powder-btn:active {
    transform: translateY(0);
  }
</style>
