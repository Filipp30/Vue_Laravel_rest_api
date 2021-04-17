import { createStore } from "vuex"
import Pusher from "pusher-js";


const store = createStore({
    state:{
        axios_request_url: "http://stuworld.space",
        contact_chat_channel:new Pusher('8a34625906a44e573ba7',{
            useTLS: true,
            forceTLS: true,
            encrypted: true,
            cluster: "eu",
            authEndpoint: 'http://stuworld.space/api/pusher/auth',
            auth:{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('jwt_token')}`
                }
            }
        }).subscribe('private-my-channel'),

        show_new_message:false,
        on_exit_chat_pressed:false

    },
    actions:{
        setNewMessageLogoTo_false(ctx){
            ctx.commit('setToFalse');
        },
        setNewMessageLogoTo_true(ctx){
            ctx.commit('setToTrue');
        },
        hidden_sticky_chat_template(ctx){
            ctx.commit('hidden_sticky_template');
        }
    },
    mutations:{
        setToFalse(state){
            state.show_new_message = false;
        },
        setToTrue(state){
            state.show_new_message = true;
        },
        hidden_sticky_template(state){
            state.on_exit_chat_pressed = !state.on_exit_chat_pressed;
        }

    },



})

export default store