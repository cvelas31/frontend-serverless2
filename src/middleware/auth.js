export default function(next, store) {
  if (store.state.auth.status.loggedIn === false) {
    console.log(store)
    next('/login')
  } else {
    next()
  }
}
