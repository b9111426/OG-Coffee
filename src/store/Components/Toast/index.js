export default {
  state: {
    message: []
  },
  actions: {
    fireToast({ commit }, data) {
      commit('handToastState', data)
    },
    spliceToast({ commit }, idx) {
      commit('handSplice', idx)
    }
  },
  mutations: {
    handToastState(state, data) {
      const obj = {}
      const { res, title, style } = data

      if (res?.data?.success) {
        obj.style = 'success'
        obj.title = `${res?.data?.message || '更新成功'}`
      } else {
        style ? (obj.style = style) : (obj.style = 'danger')
        // 有些訊息是字串，有些則是陣列，在此統一格式
        const message =
          typeof res?.data?.message === 'string'
            ? [res?.data?.message]
            : res?.data?.message

        if (message !== undefined) {
          obj.content = message.join('、')
        }
        obj.title = title || '發生錯誤'
      }
      obj.id = Math.floor(Math.random() * 100)
      state.message.push(obj)

      setTimeout(() => {
        state.message.shift()
      }, 3000)
    },
    handSplice(state, idx) {
      state.message.splice(idx, 1)
    }
  },
  getters: {
    toastState(state) {
      return state.message
    }
  }
}
