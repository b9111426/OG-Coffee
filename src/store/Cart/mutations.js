export default {
  handCartData(state, res) {
    state.cartData = res.data.data.carts
  },
  handJello(state) {
    state.jello = true
    setTimeout(() => {
      state.jello = false
    }, 200)
  }
}
