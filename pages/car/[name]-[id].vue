<template>
  <div v-if="car">
    <CarDetailHero :car="car" />
    <CarDetailAttributes :features="car.features" />
    <CarDetailDescription :description="car.description" />
    <CarDetailContact />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { cars } = useCars();
const { toTitleCase } = useUtilities();

useHead({
  title: `${toTitleCase(route.params.name as string)}`,
});

const car = computed(() => {
  return cars.find((c) => {
    return c.id === parseInt(route.params.id as string);
  });
});

if (!car.value) {
  throw createError({
    statusCode: 404,
    message: `Car with id of ${route.params.id} does not exist`,
  });
}

definePageMeta({
  layout: 'custom',
});
</script>
