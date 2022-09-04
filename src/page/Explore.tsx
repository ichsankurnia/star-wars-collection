import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../api';
import { Select } from '../component/Select';
import useCollection from '../hooks/useCollection';
import { isValidURL } from '../utils/helper';

type Props = {};

const Explore: React.FC<Props> = () => {
    const [isFetching, setIsFetching] = useState(false)
    const [isError, setError] = useState('')
    const [data, setData] = useState<any[]>([])
    const [selected, setSelected] = useState(null)

    const { collection } = useCollection()

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsFetching(true)
        
        try {
            const { title } = e.target as any
            console.log(e.target['collection_name[collection_name]'].value, title.value)

            // const searchField = e.target['collection_name[collection_name]'].value === 'films'? 'title': 'name'
            const req = await fetch(e.target['collection_name[url]'].value + '?search=' + title.value)
            const res = await req.json()

            console.log("Explore ==>", res)

            if(req.status === 200 && res?.results?.length > 0){
                setData(res.results)
                setError('')
            }else{
                setError('No result found')
                setData([])
            }
            setIsFetching(false)
        } catch (error: any) {
            setError(error.message)
            setIsFetching(false)
            setData([])
        }
    }

    return (
        <>
            <div className='px-5 flex flex-col pb-10'>
                <h1 className='font-bold text-lg'>Explore</h1>
                <div className='border p-5 rounded-2xl mt-5'>
                    <form className='flex flex-col md:flex-row items-center font-medium' onSubmit={handleSubmit}>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 w-full md:mr-5'>
                            <div className='relative w-full'>
                                <i className="fa-solid fa-magnifying-glass absolute top-2 left-3 text-base text-gray-500"></i>
                                <input type='search' name='title' placeholder='Search name, title or model' autoComplete='off' required
                                    className='w-full pl-9 pr-4 py-2.5 border outline-none rounded-lg focus:ring-2 transition ease-in-out duration-500' 
                                />
                            </div>
                            <Select placeholder='- Select collection -' name='collection_name' className='font-medium' zIndex='0' 
                                listData={collection} required disabled='unavailable'
                                selected={selected} setSelected={setSelected}
                                displayValue={(data: any) => data ? data?.collection_name : ''}
                            />
                        </div>
                        <button type='submit' className='w-full mt-5 md:mt-0 md:w-40 bg-yellow-500 rounded-lg py-2.5 text-white font-medium flex justify-center items-center hover:opacity-70 transition ease-in-out duration-500'>
                            <div>Search</div>
                            {isFetching &&
                            <svg className="animate-spin ml-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            }
                        </button>
                    </form>

                    {isError || data.length > 0?
                    <>
                    <div className='font-semibold text-base mt-7 mb-4'>Result : {data.length} data found</div>
                    {isError?
                        <div>{isError}</div>
                        :
                        <div>
                            {data.map((items, key) =>
                                <div key={key} className='mb-10'>
                                    {Object.entries(items).map((item, index) => 
                                        <div className='grid grid-cols-2 md:grid-cols-3 md:text-base capitalize mb-1' key={index}>
                                            <div className='text-gray-500 italic'>{item[0].replaceAll('_', ' ')}</div>
                                            <div className='md:col-span-2'>
                                                {typeof item[1] === 'object' ?
                                                    <ul className='flex flex-col'>
                                                        {(item[1] as string[])?.map((url, i) =>
                                                            <li key={i}>
                                                                <Link to={url?.split(BASE_URL)[1]} className='font-medium text-blue-500 hover:underline text-sm'>
                                                                    {url?.split('/')[url?.split('/').length - 3]} {url?.split('/')[url?.split('/').length - 2]}
                                                                </Link>
                                                            </li>
                                                        )}
                                                    </ul>
                                                :
                                                    isValidURL(item[1] as string)?
                                                    <Link to={(item[1] as string)?.split(BASE_URL)[1]} className='font-medium text-blue-500 hover:underline'>
                                                        {(item[1] as string)?.split('/')[(item[1] as string)?.split('/').length - 3]} {(item[1] as string)?.split('/')[(item[1] as string)?.split('/').length - 2]}
                                                    </Link>
                                                    :
                                                    item[1] as string
                                                }
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    }
                    </>
                    : null
                    }
                </div>
            </div>
        </>
    );
}

export default Explore;