<script lang="ts">
  export let id: string;
  export let title: string;
</script>

<section id={id} class="section">
  <h2>{title}</h2>
  <slot />
</section>

<style>
  .section {
    margin-top: 2.5rem;
  }

  .section h2 {
    margin-bottom: 0.5rem;
  }

  .section p {
    color: #d1d5db;
  }
</style>
