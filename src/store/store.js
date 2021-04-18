import { createStore } from "vuex"
import Pusher from "pusher-js";
import chat from "./modules/chat";


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

    },
    actions:{

    },
    mutations:{

    },
    modules:{
        chat,

    }

})

export default store