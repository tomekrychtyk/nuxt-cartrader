<template>
  <div class="shadow border w-64 mr-10 z-30 h-[190px]">
    <!-- LOCATION START -->
    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3>Location</h3>
      <h3 @click="updateModal('location')" class="text-blue-400 capitalize">
        {{ route.params.city }}
      </h3>
      <div
        v-if="modal.location"
        class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white"
      >
        <input type="text" class="border p-1 rounded" v-model="city" />
        <button
          class="bg-blue-400 w-full mt-2 rounded text-white p-1"
          @click="onChangeLocation"
        >
          Apply
        </button>
      </div>
    </div>
    <!-- LOCATION END -->

    <!-- MAKES START-->
    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3 @click="modal.make = !modal.make">Make</h3>
      <h3 class="text-blue-400 capitalize">{{ route.params.make || 'Any' }}</h3>
      <div
        v-if="modal.make"
        class="absolute border shadow left-56 p-5 -m-1 w-[600px] flex justify-between flex-wrap bg-white"
      >
        <h4
          v-for="make in makes"
          :key="make"
          class="w-1/3"
          @click="onChangeMake(make)"
        >
          {{ make }}
        </h4>
      </div>
    </div>
    <!-- MAKES END-->

    <!-- PRICE START-->
    <div class="p-5 flex justify-between relative cursor-pointer border-b">
      <h3 @click="modal.price = !modal.price">Price</h3>
      <h3 class="text-blue-400 capitalize">{{ priceRangeText }}</h3>
      <div
        v-if="modal.price"
        class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white"
      >
        <input
          class="border p-1 rounded"
          type="number"
          placeholder="Min"
          v-model="priceRange.min"
        />

        <input
          class="border p-1 rounded"
          type="number"
          placeholder="Max"
          v-model="priceRange.max"
        />

        <button
          @click="onChangePrice"
          class="bg-blue-400 w-full mt-2 rounded text-white p-1"
        >
          Apply
        </button>
      </div>
    </div>
    <!-- PRICE END-->
  </div>
</template>

<script setup lang="ts">
const { makes } = useCars();
const modal = ref<Record<string, boolean>>({
  make: false,
  location: false,
  price: false,
});

const city = ref('');
const priceRange = ref<{ min: null | number; max: null | number }>({
  min: null,
  max: null,
});
const route = useRoute();
const router = useRouter();

const priceRangeText = computed(() => {
  const minPrice = route.query.minPrice;
  const maxPrice = route.query.maxPrice;

  if (!minPrice && !maxPrice) {
    return 'Any';
  } else if (!minPrice && maxPrice) {
    return `< $${maxPrice}`;
  } else if (minPrice && !maxPrice) {
    return `> $${minPrice}`;
  } else if (minPrice && maxPrice) {
    return `$${minPrice}-$${maxPrice}`;
  }
});

const updateModal = (key: string) => {
  modal.value[key] = !modal.value[key];
};

const onChangeLocation = () => {
  if (!city.value) {
    return;
  }

  if (!isNaN(parseInt(city.value))) {
    throw createError({
      statusCode: 400,
      message: 'Invalid city format',
    });
  }

  updateModal('location');
  navigateTo(`/city/${city.value}/car/${route.params.make}`);
};

const onChangeMake = (make: string) => {
  updateModal('make');
  navigateTo(`/city/${route.params.city}/car/${make.toLocaleLowerCase()}`);
};

const onChangePrice = () => {
  if (priceRange.value.max && priceRange.value.min) {
    if (priceRange.value.min > priceRange.value.max) {
      return;
    }
  }

  updateModal('price');
  router.push({
    query: {
      minPrice: priceRange.value.min,
      maxPrice: priceRange.value.max,
    },
  });
};
</script>
