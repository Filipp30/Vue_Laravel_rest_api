
export default {

    state:{
        exit_chat_click_event:false,
    },

    actions:{
        exit_chat_pressed(ctx){
            ctx.commit('exit_chat_pressed')
            localStorage.removeItem('chat_session');
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