export default {
  handCartData(state, res) {
    console.log(res)
    state.cartData = res.data.data
  }
}
