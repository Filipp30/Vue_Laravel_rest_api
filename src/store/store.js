import { createStore } from "vuex"
import chat from "./modules/chat";
import Pusher from "pusher-js";

const store = createStore({
    state:{
        axios_request_url: "http://127.0.0.1:8000",

        contact_chat_channel:new Pusher('8a34625906a44e573ba7',{
            useTLS: true,
            forceTLS: true,
            encrypted: true,
            cluster: "eu",
            // authorizer: ()=>{return response.data}
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