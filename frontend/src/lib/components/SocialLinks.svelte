
<script lang="ts">
  const links = [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/jamal-dawson/',
      hint: 'Professional profile'
    },
    {
      label: 'GitHub',
      href: 'https://github.com/Noswad123',
      hint: 'Code & projects'
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/noswadian/?utm_source=ig_embed&utm_campaign=loading',
      hint: 'Life & visuals'
    },
    {
      label: 'TikTok',
      href: 'https://www.tiktok.com/@noswadian',
      hint: "Influencer?"
    },
    {
      label: 'Goodreads',
      href: 'https://www.goodreads.com/user/show/95484312-jamal-dawson',
      hint: 'I can read'
    }
  ];
</script>

<section class="social">
  <nav class="social__links" aria-label="Social media">
    {#each links as link}
      <a
        class="social__chip"
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="social__label">{link.label}</span>
        <span class="social__hint">{link.hint}</span>
      </a>
    {/each}
  </nav>
</section>

<style>
  .social {
    display: flex;
    flex-direction: column;
    gap: var(--space-stack-sm);
    margin-top: var(--space-section-y);
  }

  .social__links {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-inline-gap-md);
    margin-top: var(--space-stack-sm);
  }

  .social__chip {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    padding: var(--space-xs) var(--space-md);
    border-radius: var(--radius-pill);
    border: 1px solid var(--border-dim);
    background: radial-gradient(circle at 50% 100%, rgba(39, 168, 255, 0.14), transparent 58%), var(--bg-surface);
    color: var(--frost-soft);
    font-size: var(--fs-button);
    font-family: var(--font-mono);
    font-weight: 700;
    letter-spacing: 0.06em;
    line-height: 1.3;
    box-shadow: inset 0 0 14px rgba(39, 168, 255, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.15);
    transition:
      background-color 0.18s ease-out,
      border-color 0.18s ease-out,
      transform 0.12s ease-out,
      box-shadow 0.18s ease-out;
  }

  .social__chip:hover {
    background: radial-gradient(circle at 50% 100%, rgba(255, 138, 61, 0.22), transparent 58%), var(--bg-overlay);
    border-color: var(--border-hot);
    color: var(--ember-hot);
    transform: translateY(-1px);
    box-shadow: var(--glow-hot);
    text-decoration: none;
  }

  .social__label {
    font-weight: 600;
  }

  .social__hint {
    font-size: var(--fs-tag);
    color: var(--text-muted);
  }

  @media (max-width: 600px) {
    .social__links {
      flex-direction: column;
      align-items: flex-start;
    }

    .social__chip {
      width: 100%;
    }
  }
</style>
