import {
  UNISAT_HOST,
  UNISAT_TESTNET_HOST,
  MEMPOOL_HOST,
  MEMPOOL_TESTNET_HOST,
} from './hosts'

export type Network = 'mainnet' | 'testnet'

type OptionParams = Record<string, string | number | undefined>

interface OptionData {
  [key: string]: unknown
}

interface RequestOption {
  method: 'GET' | 'POST'
  data?: OptionData | string
  params?: OptionParams
  headers?: Headers
  mode?: RequestMode
  withCredential?: boolean
  message?: string
  body?: string | URLSearchParams
}

async function request<T = any>(
  url: string,
  options: RequestOption,
): Promise<T> {
  if (!options?.headers) {
    options.headers = new Headers()
  }
  if (options?.params) {
    let cleanedParams = Object.entries(options.params ?? {})
      .filter(([, value]) => value !== undefined)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value!.toString() }), {})
    if (options.method === 'GET') {
      const params = new URLSearchParams(cleanedParams)
      url = `${url}?${params.toString()}`
    } else {
      // UNUSED: Params will not be processed in POST request
      options.body = new URLSearchParams(cleanedParams)
    }
    delete options.params
    options.headers.set('Content-Type', 'application/x-www-form-urlencoded')
  }

  if (options?.data) {
    if (options.headers.get('Content-Type') === 'text/plain') {
      options.body = options.data as string
    } else {
      options.body = JSON.stringify(options.data)
      if (!options.headers.has('Content-Type')) {
        options.headers.set('Content-Type', 'application/json')
      }
    }
    delete options.data
  }

  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const data = await response.text()
  try {
    return JSON.parse(data)
  } catch (error) {
    return data as T
  }
}

enum API_STATUS {
  FAILED = -1,
  SUCCESS = '1',
}

interface UnisatResult<T> {
  status: API_STATUS
  code: API_STATUS
  message: string
  msg: string
  data: T
}

const unisatRequest = <T>(url: string, options: RequestOption): Promise<T> =>
  request<UnisatResult<T>>(url, options).then((data) => {
    if (data.code === API_STATUS.FAILED) {
      throw new Error(data.msg)
    }
    return data.data
  })

export const unisatApi = <T>(path: string, network: Network) => {
  const unisatHost = network === 'mainnet' ? UNISAT_HOST : UNISAT_TESTNET_HOST

  const headers = new Headers()
  headers.append('X-Client', 'UniSat Wallet')
  headers.append('Content-Type', 'application/json;charset=utf-8')
  headers.append(
    'User-Agent',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
  )

  return {
    get: (params?: any) =>
      unisatRequest<T>(`${unisatHost}${path}`, {
        method: 'GET',
        headers,
        params,
        mode: 'cors',
      }),
    post: (data?: any) =>
      unisatRequest<T>(`${unisatHost}${path}`, {
        method: 'POST',
        headers,
        data,
        mode: 'cors',
      }),
  }
}

export const mempoolApi = <T>(path: string, network: Network) => {
  const mempoolHost =
    network === 'mainnet' ? MEMPOOL_HOST : MEMPOOL_TESTNET_HOST

  const headers = new Headers()
  headers.append('Content-Type', 'application/json;charset=utf-8')
  headers.append(
    'User-Agent',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
  )

  return {
    get: (params?: any) =>
      request<T>(`${mempoolHost}${path}`, {
        method: 'GET',
        headers,
        params,
        mode: 'cors',
      }),
    post: (data?: any) =>
      request<T>(`${mempoolHost}${path}`, {
        method: 'POST',
        headers,
        data,
        mode: 'cors',
      }),
  }
}
