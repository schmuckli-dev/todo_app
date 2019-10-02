<template>
    <div>
        <h1>Your todos</h1>
        <div id="lists">
            <v-list-item v-for="item in list" :key="item.id">
                <v-list-item-content>
                    <v-list-item-title>{{ item.data.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ item.data.description }}<br><i>{{ getFullDate(item.data.date) }}</i></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                    <v-btn icon>
                        <v-icon :color="item.data.done == 'true' ? 'green' : 'grey'" @click="checkItem(item.id, item.data.done)">mdi-check</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon color="black lighten-1" @click="deleteItem(item.id)">mdi-delete</v-icon>
                    </v-btn>
                </v-list-item-action>
            </v-list-item>
        </div>
        <v-btn fab color="primary" @click="dialogAddTodoItem = true" fixed right bottom>
            <v-icon dark>mdi-plus</v-icon>
        </v-btn>
        <v-dialog v-model="dialogAddTodoItem" persistent max-width="600px">
            <v-form @submit="addTodoItem">
                <v-card>
                    <v-card-title>
                        <span class="headline">New todo item</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-text-field type="text" v-model="dialogAddTodoItem_Name" placeholder="Name"></v-text-field>
                            <v-textarea v-model="dialogAddTodoItem_Description" placeholder="Description"></v-textarea>
                            <!-- Date picker --->
                            <v-dialog
                                ref="dialogAddTodoItem_ModalDate"
                                v-model="dialogAddTodoItem_ModalDate"
                                :return-value.sync="dialogAddTodoItem_Date"
                                persistent
                                width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model="dialogAddTodoItem_Date"
                                    label="Picker in dialog"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-on="on"
                                ></v-text-field>
                                </template>
                                <v-date-picker v-model="dialogAddTodoItem_Date" scrollable>
                                <div class="flex-grow-1"></div>
                                <v-btn text color="primary" @click="dialogAddTodoItem_ModalDate = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.dialogAddTodoItem_ModalDate.save(dialogAddTodoItem_Date)">OK</v-btn>
                                </v-date-picker>
                            </v-dialog>
                            <!-- Time picker -->
                            <v-dialog
                                ref="dialogAddTodoItem_ModalTime"
                                v-model="dialogAddTodoItem_ModalTime"
                                :return-value.sync="dialogAddTodoItem_Time"
                                persistent
                                width="290px"
                            >
                                <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model="dialogAddTodoItem_Time"
                                    label="Picker in dialog"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-on="on"
                                ></v-text-field>
                                </template>
                                <v-time-picker v-model="dialogAddTodoItem_Time" format="24hr" scrollable>
                                <div class="flex-grow-1"></div>
                                <v-btn text color="primary" @click="dialogAddTodoItem_ModalTime = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.dialogAddTodoItem_ModalTime.save(dialogAddTodoItem_Time)">OK</v-btn>
                                </v-time-picker>
                            </v-dialog>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn color="grey darken-1" text @click="dialogAddTodoItem = false">Close</v-btn>
                        <v-btn color="blue darken-1" text type="submit">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
    </div>
</template>

<script>
import { storage } from "../schmucklicloud";
import { Notifications } from "../notification";
import * as DateFormatter from "../formatter/date";

export default {
    data(){
        return {
            list: [],
            
            //Dialogs
            dialogAddTodoItem: false,
            dialogAddTodoItem_ModalDate: false,
            dialogAddTodoItem_ModalTime: false,

            //Form data
            dialogAddTodoItem_Name: "",
            dialogAddTodoItem_Description: "",
            dialogAddTodoItem_Date: undefined,
            dialogAddTodoItem_Time: undefined
        }
    },
    mounted(){
        this.dialogAddTodoItem_Date = DateFormatter.getDate(new Date());
        this.dialogAddTodoItem_Time = DateFormatter.getTime(new Date());

        storage.setBucket(16);

        var token = localStorage.getItem("_session");
        storage.setAuthToken(token);

        this.loadList();
    },
    methods: {
        addTodoItem(e){
            e.preventDefault();

            storage.insert("items", {
                name: this.dialogAddTodoItem_Name,
                description: this.dialogAddTodoItem_Description,
                date: Date.parse(this.dialogAddTodoItem_Date + " " + this.dialogAddTodoItem_Time),
                done: "false"
            }).then(function(response){
                if(response.isOK){
                    Notifications.show("The todo item has been added.");
                    this.loadList(); //Refresh the list with the new item
                    this.dialogAddTodoItem = false; //Close the modal
                } else {
                    Notifications.show(response.message);
                }
            }.bind(this));
        },
        checkItem(id, status){
            var message;

            //Turn the status
            if(status == 'true'){
                status = 'false';
                message = "The todo item has been marked as undone.";
            } else {
                status = 'true';
                message = "The todo item has been marked as done.";
            }
            storage.update("items", id, {
                done: status
            }).then(function(response){
                if(response.isOK){
                    Notifications.show(message);
                    this.loadList();
                } else {
                    Notifications.show(response.message);
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
        },
        getFullDate(timestamp) {
            var int_timestamp = parseInt(timestamp);
            return DateFormatter.getDate(new Date(int_timestamp)) + " " + DateFormatter.getTime(new Date(int_timestamp));
        }
    }
}
</script>

<style>

</style>