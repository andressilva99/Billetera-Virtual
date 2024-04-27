<template>
  <div class="home">
    <NavBar />
    <MovementsInfo />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import MovementsInfo from '@/components/MovementsInfo.vue';

export default {
  name: 'MovementsView',
  components: {
    NavBar,
    MovementsInfo,
  }
}
</script>