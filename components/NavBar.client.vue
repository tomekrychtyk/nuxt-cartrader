<template>
  <header
    class="sticky top-0 z-50 flex justify-between items-center space-x-1 border-b bg-white p-4 shadow-md"
  >
    <NuxtLink class="text-3xl font-mono" to="/">cartrader</NuxtLink>
    <div v-if="token">
      <NuxtLink to="/profile/listings" class="mr-5">Profile</NuxtLink>
      <p class="cursor-pointer" @click="logout">Logout</p>
    </div>
    <NuxtLink v-else to="login">Login</NuxtLink>
  </header>
</template>

<script setup>
const token = ref('');

if (process.client) {
  token.value = localStorage.getItem('access_token');
}

const logout = () => {
  console.log('dffdd');

  if (process.client) {
    localStorage.setItem('access_token', '');
    navigateTo('/');
  }
};
</script>
