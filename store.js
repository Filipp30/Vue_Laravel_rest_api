import { createStore } from "vuex"
import Pusher from "pusher-js";

const store = createStore({
    state:{
        axios_request_url: "http://127.0.0.1:8000",

        my_channel:     new Pusher('8a34625906a44e573ba7',{
                        appId: "1169667",
                        secret: "f47f12dccf48e6e0286a",
                        useTLS: true,
                        cluster: "eu",
                        }).subscribe('my-channel'),

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