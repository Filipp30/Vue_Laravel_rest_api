<template>
    <div class="chat_template">
        <header class="header">
            <h1>Chat</h1>
            <p> typing...</p>
            <button v-on:click="remove_chat_session">Close</button>
        </header>
        <Spinner v-if="spinner"/>
        <section  class="messages" id="mess">
            <div>
                <p>time</p>
                <p>message</p>
                <hr>
            </div>
        </section>
        <form @submit.prevent="post_message" class="inp_form">
            <input v-model="form.input_message" type="text" class="input" placeholder="Enter your message...">
            <button type="submit" class="btn">Send</button>
        </form>
        <p v-if="errors.info" class="info_bottom">{{errors.info}}</p>
    </div>
</template>

<script>
import {debounce} from "lodash";
import Spinner from "../Spinner";



export default {
    name: "ChatTemplate",
    props:['user'],
    components:{Spinner},
    data(){
        return{
            messages:[],
            name_typing:'',
            reset_typing:debounce(function () {this.name_typing =''}, 1000),
            form:{
                input_message:'',
                name: this.user.name,
            },
            spinner:false,
            errors:{
                info:''
            }
        }
    },
    mounted() {


    },
    methods:{

        post_message:function(){

        },
        add_message_to_local_data(){

        },
        remove_chat_session:function(){

        }
    },
    watch:{
        'form.input_message': function(){

        },
    },

}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/_app.sass";
.chat_template{
    box-shadow: 0px 1px 18px -3px rgba(0,0,0,0.75);
    height: 470px;
    max-width: 450px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .header{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding:0 10px 0 10px;
        border-bottom: 1px solid #1a202c;
        button{
            outline: none;
            border: 1px solid white;
            border-radius: 2px;
            background-color:gray;
            color:white;
            font-size: 20px;
        }
        button:hover{
            cursor: pointer;
            background-color: transparent;
            border-radius: 2px;
            border: 1px solid black;
            color: black;
        }
    }
    .messages{
        height: 400px;
        overflow-y: auto;
        padding: 1px 10px;
    }
    .messages::-webkit-scrollbar {
        width: 6px;
    }
    .messages::-webkit-scrollbar-track {
        background: #ddd;
    }
    .messages::-webkit-scrollbar-thumb {
        background: #bdbdbd;
    }

    .inp_form {
        border-top: 1px solid #1a202c;
        margin-bottom: 0;
        flex: 1;
        display: flex;
        padding: 10px;

        .input {
            border-radius: 3px;
            font-size: 17px;
            flex:8;
            background: #ddd;
            height: 40px;
        }
        .btn {
            border-radius: 3px;
            flex:1;
            margin-left: 10px;
            background: $btn_under_line_color;
            color: #fff;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.23s;
        }
        .btn:hover {
            background: $btn_under_line_color;
        }
    }
    .info_bottom{
        margin:0 110px;
        font-size: 15px;
        height: 0px;
    }




}
</style>
