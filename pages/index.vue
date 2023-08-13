<template>
  <div>
    <CarHero />
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: 'Cartrader',
});

const route = useRoute();
const token = route.fullPath
  .replace('/#access_token=', '')
  .replace('&refresh_token=53qMJ9dQwGXyBxf8GxLgYQ&token_type=bearer', '')
  .replace(
    '&expires_in=3600&provider_token=ya29.a0AfB_byBPBQ7f7fAyU7PhrL1OKEvbxT5aVYHLiUjk934VPVPxbD_F68GR9Oj_eO3JXGMEy2K6Lp7BWTqWWXONsI30SR0sF76nOxTsc-iSzkzR7v2-vD6jg0QHwtBm4p212kmbbWpTDJwQgVx1_NDE7cRepl_9aCgYKAXoSARASFQHsvYlsRun_P3mjXHZXKirujavtmQ0163',
    ''
  );

if (token !== '/') {
  useLocalStorage('access_token', token);
}
</script>
