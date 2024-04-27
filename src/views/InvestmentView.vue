<template>
  <div class="home">
    <NavBar />
    <InvestmentInfo />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import InvestmentInfo from '@/components/InvestmentInfo.vue';

export default {
  name: 'InvestmentView',
  components: {
    NavBar,
    InvestmentInfo,
  }
}
</script>