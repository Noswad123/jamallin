
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
    background: var(--bg-surface);
    color: var(--text-main);
    font-size: var(--fs-button);
    line-height: 1.3;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15);
    transition:
      background-color 0.18s ease-out,
      border-color 0.18s ease-out,
      transform 0.12s ease-out,
      box-shadow 0.18s ease-out;
  }

  .social__chip:hover {
    background-color: var(--bg-overlay);
    border-color: var(--accent);
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
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
