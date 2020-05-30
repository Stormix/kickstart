/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

const getCSRFToken = () => {
  const token: HTMLMetaElement | null = document.head.querySelector(
    'meta[name="csrf-token"]'
  )
  return token?.content
}

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.withCredentials = true

const token: string | undefined = getCSRFToken()

if (token) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = token
} else {
  console.error(
    'CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token'
  )
}

// The following code adds an interceptor that renews the CSRF token whenever
// the app recieves a token mismatch error
const refreshCSRFToken = () => {
  return new Promise((resolve, reject): void => {
    axios
      .get('/')
      .then(({ data }) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = data
        return wrapper
          .querySelector('meta[name=csrf-token]')
          ?.getAttribute('content')
      })
      .then((token) => {
        document
          .querySelector('meta[name=csrf-token]')
          ?.setAttribute('content', token || '')
        resolve()
      })
      .catch(() => reject())
  })
}

createAuthRefreshInterceptor(axios, refreshCSRFToken, {
  statusCodes: [419],
})

// Using a second interceptor to inject the newly fetched CSRF token to all requests
axios.interceptors.request.use((request) => {
  request.headers['X-CSRF-TOKEN'] = getCSRFToken()
  return request
})

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');
// window.Echo = new Echo({
//     broadcaster: "pusher",
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     encrypted: true,
//     key: process.env.MIX_PUSHER_APP_KEY,
//     authorizer: (channel, options) => {
//         return {
//             authorize: (socketId, callback) => {
//                 axios.post('/api/broadcasting/auth', {
//                     socket_id: socketId,
//                     channel_name: channel.name
//                 })
//                 .then(response => {
//                     callback(false, response.data);
//                 })
//                 .catch(error => {
//                     callback(true, error);
//                 });
//             }
//         };
//     },
// })
