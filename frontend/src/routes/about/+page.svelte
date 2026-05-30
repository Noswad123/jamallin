<script lang="ts">
  import SocialLinks from '$lib/components/SocialLinks.svelte';
</script>

<main class="about-page main-content">
  <section class="about-header">
    <h1 class="about-heading">Nice to meet you.</h1>
    <p class="about-subheading">I'm Jamal.</p>

    <p class="about-subtitle">
    I’m currently a software developer, but I’ve taken a few interesting turns getting here — bartender, server, teacher, tutor, and even non-profit founder. I’ve always been drawn to new experiences, useful work, and the kind of problems that make time disappear.
    </p>
  </section>

  <section class="about-more">
    <p class="about-subheading">I love thinking deeply.</p>
  <p class="about-subtitle">
   I’ve always liked questions that seem simple until you sit with them for a while. Number theory does that for me — tiny rules, strange patterns, and ideas that feel almost playful once they click. I get a similar feeling from wondering why people find things funny: how timing, surprise, language, and shared context can turn a normal thought into a joke. I think that’s part of why I’m drawn to both serious ideas and unserious moments. They’re often closer together than they look.
  </p>
  </section>

  <section class="about-more">
    <p class="about-subheading">I also enjoy a bunch of other things.</p>
  <p class="about-subtitle">
    I’m usually traveling with my wife, goofing around with friends, playing disc golf, or listening to music. I’m also working toward my private pilot’s license, partly to open up new ways to travel and partly because learning to fly sounds like exactly the right amount of thrilling.
  </p>
  </section>

  <section class="about-social">
    <p class="about-subheading">Find me around the web.</p>
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

  .about-more {
    display: flex;
    flex-direction: column;
    gap: var(--space-stack-sm);
    max-width: 60ch;
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
