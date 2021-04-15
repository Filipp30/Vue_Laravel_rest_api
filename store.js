import { createStore } from "vuex"
import Pusher from "pusher-js";


const store = createStore({
    state:{
        axios_request_url: "http://127.0.0.1:8000",
        contact_chat_channel:new Pusher('8a34625906a44e573ba7',{
            useTLS: true,
            forceTLS: true,
            encrypted: true,
            cluster: "eu",
            authEndpoint: 'http://127.0.0.1:8000/api/pusher/auth',
            auth:{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('jwt_token')}`
                }
            }
        }).subscribe('private-my-channel'),




    },
    mutations:{

    },
    actions:{

    },
    getters:{

    },
    modules:{

    }
})

export default store