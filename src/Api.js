class Api {
  constructor(baseUrl, { store, token, onAuthorized = () => {} } = {}) {
    this.baseUrl = baseUrl
    this.store = store
    this.defaultHeaders = {
      accept: 'application/json',
    }

    if (token) {
      this.defaultHeaders.authorization = `Barear ${token}`
    }

    this.onAuthorized = onAuthorized
  }

  prepareUrl(resource) {
    return `${this.baseUrl}/${resource}`
  }

  makeRequest(resource, options) {
    const url = this.prepareUrl(resource)
    const requestOptions = {
      method: options.method || 'get',
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      body: JSON.stringify(options.payload),
    }

    console.log('Process request', url, requestOptions)

    return fetch(url, requestOptions).then((response) => {
      console.log(response)
      if (!response.ok && response.status !== 0) {
        throw new Error(`Error requesting ${url}`)
      }

      return options.raw ? Promise.resolve(response) : response.json()
    })
  }

  get(resource, options) {
    return this.makeRequest(resource, {
      method: 'get',
      ...options,
    })
  }

  post(resource, options) {
    return this.makeRequest(resource, {
      method: 'post',
      ...options,
    })
  }

  logout() {
    delete this.defaultHeaders.authorization
  }

  login(username, password) {
    return this.post('user/login', {
      payload: {
        username,
        password,
      },
    }).then((result) => {
      if (!result.success) throw new Error(result.error)

      this.defaultHeaders.authorization = `Barear ${result.token}`
      this.onAuthorized(result.token)
      return Promise.resolve(true)
    })
  }

  register(username, email, password) {
    const registrationObject = {
      username,
      email,
      password,
      password_repeat: password,
      store_id: this.store.id,
      store_password: this.store.password,
    }

    return this.post('user/create', {
      payload: registrationObject,
    })
  }

  get isAuthorized() {
    return !!this.defaultHeaders.authorization
  }
}

export default Api
