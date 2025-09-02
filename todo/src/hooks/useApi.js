import { useCallback, useState} from 'react'

export const useApi = (apiFunc) => {
    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const request = useCallback(
    async (params = {}) =>
    {
        setIsLoading(true)
        try {
            const response = await apiFunc(params)
            setData(response.data)
            return response.data
        }
        catch(error) {
            setError(error)
            console.log('API Hook is failing')
            throw error
        }
        finally {
            setIsLoading(false)
        }

    }, [apiFunc])

    return {
        data,
        isLoading,
        error,
        request
    }
}