<template>
    <div>
        <h2>Register</h2>
        <v-form @submit="onRegister">
            <v-text-field label="Email" v-model="email"></v-text-field>
            <v-text-field type="password" label="Password" v-model="password"></v-text-field>
            <v-text-field type="password" label="Repeat password" v-model="passwordRepeat"></v-text-field>
            <v-btn type="submit">register</v-btn>
        </v-form>
    </div>
</template>

<script>
import { auth } from "../schmucklicloud";
import { Notifications } from "../notification";

export default {
    name: "Register",
    data(){
        return {
            email: "",
            password: "",
            passwordRepeat: ""
        };
    },
    methods: {
        onRegister(e){
            e.preventDefault();
            if(this.password === this.passwordRepeat){
                auth.registerEmailPassword(this.email, this.password, window.navigator.language.split("-")[0]).then(function(response){
                    if(response.isOK){
                        Notifications.show(response.message);
                    } else {
                        Notifications.show(response.message);
                    }
                });
            } else {
                Notifications.show("The passwords do not match.");
            }
        }
    }
}
</script>

<style>

</style>