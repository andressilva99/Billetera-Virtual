<template>
  <div class="home">
    <NavBar />
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'HelloView',
  components: {
    NavBar,
    HelloWorld,
  }
}
</script>