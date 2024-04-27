<template>
  <div class="home">
    <NavBar />
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'LoginView',
  components: {
    LoginForm,
    NavBar,
  }
}
</script>