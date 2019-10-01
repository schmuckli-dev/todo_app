<template>
    <div>
        <h2>Login</h2>
        <v-form @submit="onLogin">
            <v-text-field label="Email" v-model="email"></v-text-field>
            <v-text-field type="password" label="Password" v-model="password"></v-text-field>
            <v-btn type="submit">Login</v-btn>
        </v-form>
    </div>
</template>

<script>
import { auth } from "../schmucklicloud";
import { Notifications } from "../notification";

export default {
    name: "Login",
    data(){
        return {
            email: "",
            password: ""
        };
    },
    methods: {
        onLogin(e){
            e.preventDefault();
            auth.authorizeEmailPassword(this.email, this.password).then(function(response){
                if(response.isOK){
                    localStorage.setItem("_session", response.body.session_token);
                    Notifications.show(response.message);
                } else {
                    Notifications.show(response.message);
                }
            });
        }
    }
}
</script>

<style>

</style>