<template>
  <div class="mt-10">
    <h1 class="text-5xl font-bold mb-7">Log in</h1>
    <button @click="login" class="bg-red-400 p-3 rounded text-white font-bold">
      Login with google
    </button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'custom',
});

const supabase = useSupabaseClient();

const login = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
};
</script>
