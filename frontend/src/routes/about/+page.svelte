<script lang="ts">
  import SocialLinks from '$lib/SocialLinks.svelte';
</script>

<main class="about-page main-content">
  <section class="about-header">
    <h1 class="about-heading">Nice to meet you.</h1>
    <p class="about-subheading">I'm Jamal.</p>

    <p class="about-subtitle">
      At my core, I'm a curious problem solver who enjoys connecting with people. I love learning,
      experimenting, and finding meaning in the small intersections of life. I explore, I adapt, and I grow —
      especially when I’m surrounded by people who bring out the best in me.
    </p>
  </section>

  <section class="about-social">
    <p class="about-subheading">Find me around the web</p>
    <SocialLinks />
  </section>
</main>

<style>
  .about-page {
    display: flex;
    flex-direction: column;
    gap: var(--space-section-y);
  }

  .about-header {
    display: flex;
    flex-direction: column;
    gap: var(--space-stack-md);
    max-width: 60ch;
  }

  .about-eyebrow {
    margin: 0;
    font-size: var(--fs-tag);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .about-heading {
    margin: 0;
    font-size: var(--fs-h1);
    line-height: var(--lh-heading);
  }

  .about-subtitle {
    margin: 0;
    color: var(--text-muted);
    font-size: var(--fs-body);
    line-height: var(--lh-relaxed);
  }

  .about-social {
    display: flex;
    flex-direction: column;
    gap: var(--space-stack-sm);
  }

  .about-subheading {
    margin: 0;
    font-size: var(--fs-h3);
    font-weight: 500;
    color: var(--text-main);
  }

  @media (max-width: 600px) {
    .about-heading {
      font-size: var(--fs-h3);
    }

    .about-subtitle {
      font-size: var(--fs-body-small);
    }
  }
</style>
