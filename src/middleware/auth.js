export default function (next, store) {
  if (!store.state.isLoggedIn) {
    next('/login')
  } else {
    next()
  }
}
