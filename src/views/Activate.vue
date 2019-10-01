<template>
  <div class="center">
      <h1>Activation</h1>
      <p>{{ resultMessage }}</p>
      <p><router-link to="login">Sign in now</router-link></p>
  </div>
</template>
<script>
import { auth } from "../schmucklicloud";

export default {
    name: "Activate",
    data(){
        return {
            resultMessage: ""
        }
    },
    mounted(){
        var token = this.$route.query.token;

        if(token !== undefined){
            auth.activateUser(token).then(function(response){
                if(response.isOK){
                    this.resultMessage = response.message;
                } else {
                    this.resultMessage = response.message;
                }
            }.bind(this));
        } else {
            this.resultMessage = "This link has not sent any token.";
        }
    }
}
</script>