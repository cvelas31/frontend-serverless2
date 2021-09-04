export default function(next, store) {
  if (store.state.auth.status.loggedIn === false) {
    next('/login')
  } else {
    next()
  }
}
