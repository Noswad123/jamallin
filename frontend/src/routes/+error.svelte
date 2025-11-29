<script lang="ts">
  import { onMount } from 'svelte';

  const HEADERS = [
    "Well… this is awkward.",
    "You weren’t supposed to see this.",
    "This page doesn’t exist, but you do. That's all that matters",
    "Let’s pretend this didn’t happen."
  ];

  const SUBTEXTS = [
    "Whatever you were looking for isn’t here anymore — or maybe it never was.",
    "Not everything needs to exist, but this page definitely doesn’t.",
    "The URL may be wrong, but you’re in the right place to start over.",
    "Good news: the rest of the site works a lot better than this.",
    "This page is missing, but you’re still invited to look around."
  ];

  let header = HEADERS[0];
  let subtext = SUBTEXTS[0];

  onMount(() => {
    // Pick a random header + subtext on each visit
    const headerIndex = Math.floor(Math.random() * HEADERS.length);
    const subtextIndex = Math.floor(Math.random() * SUBTEXTS.length);

    header = HEADERS[headerIndex];
    subtext = SUBTEXTS[subtextIndex];
  });
</script>

<main class="error-page main-content">
  <section class="error-card">
    <p class="error-code">404</p>
    <h1 class="error-heading">{header}</h1>
    <p class="error-subtext">{subtext}</p>

    <nav class="error-links" aria-label="Main sections">
      <a href="/" class="error-link">Go home</a>
      <a href="/about" class="error-link">Nice to meet you</a>
      <a href="/projects" class="error-link">Here’s what I’m hacking on</a>
      <a href="/lists" class="error-link">I have some strong opinions</a>
      <a href="/tribute" class="error-link">Thank you</a>
    </nav>
  </section>
</main>

<style>
  .error-page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }

  .error-card {
    max-width: 60ch;
    padding: var(--space-card-padding);
    border-radius: var(--radius-md);
    background: var(--bg-surface);
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.35);
    display: flex;
    flex-direction: column;
    gap: var(--space-stack-md);
  }

  .error-code {
    margin: 0;
    font-size: var(--fs-tag);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .error-heading {
    margin: 0;
    font-size: var(--fs-h1);
    line-height: var(--lh-heading);
    color: var(--accent);
  }

  .error-subtext {
    margin: 0;
    font-size: var(--fs-body);
    color: var(--text-muted);
    line-height: var(--lh-relaxed);
  }

  .error-links {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-inline-gap-md);
    margin: 0;
    padding: 0;
  }

  .error-link {
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-pill);
    border: 1px solid var(--border-dim);
    background: var(--bg-overlay);
    font-size: var(--fs-button);
  }

  .error-link:hover {
    border-color: var(--accent);
    background: var(--bg-surface);
    text-decoration: none;
  }

  @media (max-width: 600px) {
    .error-card {
      box-shadow: none;
      padding-inline: 0;
      background: transparent;
    }

    .error-heading {
      font-size: var(--fs-h2);
    }

    .error-subtext {
      font-size: var(--fs-body-small);
    }

    .error-links {
      flex-direction: column;
      align-items: flex-start;
    }

    .error-link {
      width: 100%;
      text-align: center;
      justify-content: center;
    }
  }
</style>
