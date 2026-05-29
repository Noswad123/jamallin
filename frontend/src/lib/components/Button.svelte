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
    font-family: var(--font-mono);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease;

    /* Theme Application */
    /* Note: Use dark text on light blue for readability */
    background: radial-gradient(circle at 50% 100%, rgba(255, 138, 61, 0.32), transparent 55%), linear-gradient(180deg, rgba(30, 18, 12, 0.96), rgba(8, 9, 12, 0.98));
    color: var(--ember-hot);
    border: 1px solid var(--border-hot);
    box-shadow: inset 0 0 14px rgba(255, 138, 61, 0.1), var(--glow-hot);
  }

  .powder-btn:hover {
    background: radial-gradient(circle at 50% 100%, rgba(39, 168, 255, 0.22), transparent 55%), linear-gradient(180deg, rgba(13, 24, 36, 0.96), rgba(6, 10, 17, 0.98));
    color: var(--frost-soft);
    border-color: var(--frost-soft);
    transform: translateY(-2px); /* Subtle lift effect */
  }

  .powder-btn:active {
    transform: translateY(0);
  }
</style>
