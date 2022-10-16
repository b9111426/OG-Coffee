import emitter from '@/libs/emitter'
export default {
  state: {
    style: '',
    title: '',
    content: '',
    id: null
  },
  actions: {
    fireToast({ commit }, data) {
      commit('handToastState', data)
    }
  },
  mutations: {
    handToastState(state, data) {
      const { res, title } = data
      if (res?.data?.success) {
        state.style = 'success'
        state.title = `${title || res?.data?.message || '更新成功'}`
      } else {
        state.style = 'danger'

        // 有些訊息是字串，有些則是陣列，在此統一格式
        const message =
          typeof res?.data?.message === 'string'
            ? [res?.data?.message]
            : res?.data?.message

        if (message == !undefined) {
          state.content = message.join('、')
        }
        state.title = res?.data?.message || title || '發生錯誤'
      }
      state.id = Math.floor(Math.random() * 100)
      emitter.emit('push-message', state)
    }
  },
  getters: {}
}
