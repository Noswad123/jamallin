<script lang="ts">
  import ProjectCard from '$lib/ProjectCard.svelte';
  import projects from '$lib/projects.json'
  type Project = {
    title: string;
    description: string;
    status: string;
    statusType: string;
    techStack: string[];
  }
  export let data: {projects: Project[]};
</script>

<h1>Here's what I've been hacking on.</h1>

<div class="grid">
  {#each data.projects as project}
  <ProjectCard 
    title={project.title}
    description={project.description}
    link={project.link}
    status={project.status}
    statusType={project.statusType}
    techStack={project.techStack}
  />
{/each}
</div>
