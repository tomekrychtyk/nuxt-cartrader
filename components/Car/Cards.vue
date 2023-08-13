<template>
  <div class="w-full">
    <CarCard
      @favor="handleFavorite"
      v-for="car in cars"
      :key="car.id"
      :car="car"
      :favored="car.id in favorite"
    />
  </div>
</template>

<script setup lang="ts">
const { cars } = useCars();
const favorite = useLocalStorage<Record<number, boolean>>('favorite', {});
const handleFavorite = (id: number) => {
  console.log(id);
  if (id in favorite.value) {
    delete favorite.value[id];
  } else {
    favorite.value = {
      ...favorite.value,
      [id]: true,
    };
  }
};
</script>
