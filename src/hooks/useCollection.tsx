import { useEffect, useState } from "react"
import { BASE_URL } from "../api"

export default function useCollection() {
    const [collection, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const req = await fetch(BASE_URL)
                const res = await req.json()
    
                console.log("USE COLLECTION ==>", res)
    
                if(req.status === 200){
                    // setData(res)
                    setData(Object.keys(res).map((key) => {return {collection_name: key, url: res[key]} }))
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
    }, [])

    return {collection, error, loading}
}