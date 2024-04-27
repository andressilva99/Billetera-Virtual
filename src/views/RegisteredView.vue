<template>
  <div class="home">
    <NavBar />
    <RegisteredUsers />
  </div>
</template>

<script>
import RegisteredUsers from '@/components/RegisteredUsers.vue';
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'RegisteredView',
  components: {
    NavBar,
    RegisteredUsers,
  }
}
</script>