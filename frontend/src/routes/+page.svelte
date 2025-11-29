<main class="home main-content">
  <section class="hero">
    <h1>Hey.</h1>
    <p class="hero-subtitle">Welcome to my corner of the internet.</p>
  </section>

  <section class="home-nav" aria-label="Explore this site">
    <a class="home-nav-item" href="/about">
      <div class="home-nav-text">
        <h2 class="home-nav-heading">Nice to meet you.</h2>
        <p class="home-nav-subtitle">I’m Jamal.</p>
      </div>
      <span class="home-nav-arrow">→</span>
    </a>

    <a class="home-nav-item" href="/projects">
      <div class="home-nav-text">
        <h2 class="home-nav-heading">Here’s what I’m hacking on.</h2>
        <p class="home-nav-subtitle">So many ideas, so little time...</p>
      </div>
      <span class="home-nav-arrow">→</span>
    </a>

    <a class="home-nav-item" href="/lists">
      <div class="home-nav-text">
        <h2 class="home-nav-heading">I have some strong opinions.</h2>
        <p class="home-nav-subtitle">Wanna check them out?</p>
      </div>
      <span class="home-nav-arrow">→</span>
    </a>

    <a class="home-nav-item" href="/tribute">
      <div class="home-nav-text">
        <h2 class="home-nav-heading">Thank you.</h2>
        <p class="home-nav-subtitle">If I have seen further than others, it is only because I was standing on the shoulders of giants.</p>
      </div>
      <span class="home-nav-arrow">→</span>
    </a>
  </section>
</main>

<style>
  .home {
    display: flex;
    flex-direction: column;
    gap: var(--space-section-y);
  }

  .hero {
    max-width: 60ch;
    display: flex;
    flex-direction: column;
    gap: var(--space-stack-sm);
  }

  .hero-subtitle {
    margin: 0;
    font-size: var(--fs-body);
    color: var(--text-muted);
    line-height: var(--lh-relaxed);
  }

  .home-nav {
    display: flex;
    flex-direction: column;
    gap: var(--space-stack-sm);
  }

  .home-nav-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--space-sm);
    padding: var(--space-card-padding);
    border-radius: var(--radius-md);
    background: var(--bg-surface);
    border: 1px solid var(--border-dim);
    text-decoration: none;
    transition:
      background-color 0.15s ease-out,
      border-color 0.15s ease-out,
      transform 0.08s ease-out;
  }

  .home-nav-item:hover {
    border-color: var(--accent-primary);
    background: var(--bg-surface);
    transform: translateY(-1px);
    text-decoration: none;
  }

  .home-nav-text {
    display: flex;
    flex-direction: column;
    gap: var(--space-xxs);
  }

  .home-nav-heading {
    margin: 0;
    font-size: var(--fs-h2);
    line-height: var(--lh-heading);
  }

  .home-nav-subtitle {
    margin: 0;
    font-size: var(--fs-body-small);
    color: var(--text-muted);
    line-height: var(--lh-relaxed);
  }

  .home-nav-arrow {
    font-size: var(--fs-h3);
    line-height: 1;
    align-self: center;
    color: var(--primary);
  }

  @media (max-width: 600px) {
    .home-nav-item {
      padding: var(--space-md);
    }

    .home-nav-heading {
      font-size: var(--fs-h3);
    }

    .hero-subtitle {
      font-size: var(--fs-body-small);
    }
  }
</style>
