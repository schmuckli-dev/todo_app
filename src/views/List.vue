<template>
    <div>
        <h1>Your todos</h1>
        <v-btn @click="addItem('Test Task', 'This is a simple description')">Add</v-btn>
        <div id="lists">
            <v-list-item v-for="item in list" :key="item.id">
                <v-list-item-content>
                    <v-list-item-title>{{ item.data.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.data.description }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                    <v-btn icon>
                        <v-icon color="grey lighten-1" @click="deleteItem(item.id)">mdi-delete</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
        </div>
    </div>
</template>

<script>
import { storage } from "../schmucklicloud";
import { Notifications } from "../notification";

export default {
    data(){
        return {
            list: []
        }
    },
    mounted(){
        storage.setBucket(16);

        var token = localStorage.getItem("_session");
        storage.setAuthToken(token);

        this.loadList();
    },
    methods: {
        addItem(name, description){
            storage.insert("items", {
                name: name,
                description: description
            }).then(function(response){
                if(response.isOK){
                    Notifications.show("The todo item has been added.");
                    this.loadList();
                }
            }.bind(this));
        },
        deleteItem(id){
            storage.delete("items", id).then(function(response){
                if(response.isOK){
                    Notifications.show("The todo item has been deleted.");
                    this.loadList();
                }
            }.bind(this));
        },
        loadList(){
            storage.getAll("items").then(function(response){
                this.list = response.data;
            }.bind(this));
        }
    }
}
</script>

<style>

</style>