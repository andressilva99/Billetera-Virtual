<template>
  <div class="home">
    <NavBar />
    <TransactionForm />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import TransactionForm from '@/components/TransactionForm.vue';

export default {
  name: 'TransationView',
  components: {
    NavBar,
    TransactionForm,
  }
}
</script>