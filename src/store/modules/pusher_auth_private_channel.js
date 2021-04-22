import axios from "axios";
import Pusher from "pusher-js";



export default {

    state:{

        app_key:'8a34625906a44e573ba7',
        response_string: localStorage.getItem('pusher_auth_string'),
        private_channel: new Pusher('8a34625906a44e573ba7').
                subscribe('private-my-channel')

    },

    actions: {
        get_pusher_auth(){
            axios.post('http://127.0.0.1:8000/api/pusher/auth', {
                data:{socket_id:new Pusher('8a34625906a44e573ba7').sessionID, channel_name: 'private-my-channel'},
                headers:{"Authorization" : `Bearer ${localStorage.getItem('jwt_token')}`}
            }).then((response)=>{

                sessionStorage.setItem('pusher_auth_string',response.data.auth)
                console.log('auth string Session ok')
            }).catch((error)=>{
                console.log(error)
                return error;
            })
        },
    },


}