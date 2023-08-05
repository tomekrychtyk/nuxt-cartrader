<template>
  <div>
    <div class="mt-32 flex">
      <CarSideBar />
      <NuxtPage />
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { toTitleCase } = useUtilities();

useHead({
  title: `${
    route.params.make && typeof route.params.make === 'string'
      ? toTitleCase(route.params.make)
      : 'Cars'
  } in ${toTitleCase(route.params.city as string)}`,
});

definePageMeta({
  layout: 'custom',
});
</script>
