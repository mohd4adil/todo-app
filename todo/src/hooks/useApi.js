import  {useState, useEffect, useHook} from 'react'


export const useApi = () => {

    const [isLoading, setIsLoading] = useState('')
    const [error, setError] = useState('')
    const [data, setData] = useState(null)
    const [refresh, setRefresh] = useState(0)

    

}
