
export default {

    state:{
        exit_chat_click_event:false,

    },

    actions:{

        exit_chat_pressed(ctx){
            sessionStorage.removeItem('chat_session');
            ctx.commit('exit_chat_pressed');
        }
    },

    mutations:{

        exit_chat_pressed(state){
            state.exit_chat_click_event = !state.exit_chat_click_event;
        }
    },

    getters:{
        exitChat(state){
            return state.exit_chat_click_event
        }
    }

}