import { createStore } from "vuex"
import chat from "./modules/chat";
import Pusher from "pusher-js";
const store = createStore({
    state:{
        axios_request_url: "http://stuworld.space",

        contact_chat_channel:'',

        channel_connection_status:'',

        new_message_active:false

    },
    actions:{

        set_channel(txc){
           const channel = new Pusher('8a34625906a44e573ba7',{
               useTLS: true,
               forceTLS: true,
               encrypted: true,
               cluster: "eu",
               authEndpoint: 'http://stuworld.space/api/pusher/auth',
               auth: {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('jwt_token')}`
                    }
               },
           }).subscribe('private-my-channel');
           channel.bind('pusher:subscription_succeeded', ()=>{
               txc.commit('set_channel',channel);
           }).bind('App\\Events\\NewMessage', (data) => {
               if (parseInt(data.session) === parseInt(sessionStorage.getItem('chat_session'))
                   && data.user.name !== sessionStorage.getItem('user_name')){
                    txc.commit('new_message_active_trigger_popup');
               }
           });
        }


    },

    mutations:{
        set_channel(state,channel){
            state.contact_chat_channel = channel;
            state.channel_connection_status = channel.pusher.connection.state;
        },

        new_message_active_trigger_popup(state){
            state.new_message_active = !state.new_message_active;
        }
    },

    getters:{
        get_chat_private_channel(state){
            if (state.contact_chat_channel === ''){
                return false;
            }else{
                return state.contact_chat_channel;
            }
        }
    },

    modules:{
        chat
    }

})


export default store