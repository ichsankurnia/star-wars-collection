import { useEffect, useState } from "react"
import { BASE_URL } from "../api"

export default function useDetailCollection(endpoint: string) {
    const [result, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const req = await fetch(BASE_URL + endpoint)
                const res = await req.json()
    
                console.log(endpoint, "==>", res)
    
                if(req.status === 200){
                    setData(res)
                    setError('')
                }else{
                    setError(req.status + ' ' + req.statusText)
                }
                setLoading(false)
            } catch (error: any) {
                setData(null)
                setError(error.message)
                setLoading(false)
            }
        }

        fetchData()
    }, [endpoint])

    return {result, error, loading}
}