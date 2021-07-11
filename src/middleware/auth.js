export default function (next, store) {
  console.log('In Middleware')
  if (!store.state.isLoggedIn) {
    console.log('Is not logged in')
    next('/login')
  } else {
    console.log('In Middleware')
    next()
  }
}
