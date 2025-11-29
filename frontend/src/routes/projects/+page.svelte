<script lang="ts">
  import ProjectCard from '$lib/ProjectCard.svelte';
  import projects from '$lib/projects.json';

  type Project = {
    title: string;
    description: string;
    status: string;
    statusType: string;
    techStack: string[];
    githubUrl: string;
    loreSlug?: string;
  };

  export let data: { projects: Project[] };
</script>

<main class="projects-page">
  <h1 class="projects-title">Here's what I've been hacking on.</h1>

  <div class="projects-grid">
    {#each data.projects as project}
      <ProjectCard 
        title={project.title}
        description={project.description}
        githubUrl={project.githubUrl}
        status={project.status}
        statusType={project.statusType}
        techStack={project.techStack}
        loreSlug={project.loreSlug}
      />
    {/each}
  </div>
</main>

<style>
  .projects-page {
    /* give breathing room around the whole page */
    padding: 2rem 1.5rem 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .projects-title {
    width: 100%;
    max-width: 70rem;
    margin: 0 0 1.5rem 0;
    font-size: 2rem;
  }

  .projects-grid {
    /* this line makes the cards wide */
    width: min(90vw, 1100px);

    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
</style>
