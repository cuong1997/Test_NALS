<template>
  <v-app>
    <v-main>
    <app-test />
    </v-main>
  </v-app>
</template>

<script>
import Test from './Views/pages/Test'
export default {
  components:{
    appTest : Test
  },
  data: () => ({
    //
  }),
};
</script>
