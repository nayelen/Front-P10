export const optionsFetch = async (url, method, body, headers) => {
  try {
    const requestOptions = {
      method: method,
      headers: {
        ...headers
      }
    }
    if (body && !(method === 'GET' || method === 'HEAD')) {
      if (!(body instanceof FormData)) {
        requestOptions.headers['Content-Type'] = 'application/json'
        requestOptions.body = JSON.stringify(body)
      } else {
        requestOptions.body = body
      }
    }

    const response = await fetch(url, requestOptions)

    if (!response.ok) {
      console.error('Error en la solicitud fetch')
    }
    if (response.status === 204) {
      return
    }

    return response.json()
  } catch (error) {
    throw new Error('Error en la solicitud fetch: ' + error.message)
  }
}
