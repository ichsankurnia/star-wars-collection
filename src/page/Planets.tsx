import { useInfiniteQuery, useQueryClient } from 'react-query';
import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { BASE_URL } from '../api';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Loader from '../component/Loader';
import { SkeletonPost } from '../component/Skeleton';
import { IPlanets } from '../utils/interface';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import thumbnail from '../asset/thumbnail-planet.jpg'
import { convertToInternationalCurrencySystem } from '../utils/helper';
import GlobalContext from '../context/GlobalContext';

type Props = {};

const Planets: React.FC<Props> = () => {
    const [currentPage, setCurrentPage] = useState(1)
    
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const refElement = useRef<any>(null)

    const { bookmarkedItem, dispatchCalBookmark } = useContext(GlobalContext)


    const fetchData = async ({ pageParam }: any) => {
        const req = await fetch(`${BASE_URL}/planets?page=${pageParam || 1}`)
        const data = await req.json()

        setCurrentPage(pageParam || 1)
        return data
    }

    const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
        'planets',
        fetchData,
        {
            getNextPageParam: (lastPage, allPages) => {
                // lastPages is data object {count, next, previous, results} in last page, allpages is all array data
                const pageSize = Math.round(lastPage.count / 10)
                if (allPages.length <= pageSize) {
                    try {
                        const regex = /\d+/g
                        const nextPage = lastPage.next.match(regex)
                        return parseInt(nextPage[0])
                    } catch (error) {
                        return undefined                        
                    }
                }

                return undefined
            },
            keepPreviousData: true
        }
    )

    useEffect(() => {
        if (hasNextPage) {
            const nextPage = currentPage + 1
            queryClient.prefetchInfiniteQuery(['people', nextPage], () => fetchData({ pageParam: nextPage }))
            console.log(currentPage, hasNextPage, nextPage)
        }
        // eslint-disable-next-line
    }, [data])

    const scrollToBottom = () => {
        refElement.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleBookmarkedItem = (e: React.MouseEvent<HTMLElement>, item: any, type: 'push' | 'delete') => {
        e.stopPropagation()

        const payload = {
            url: item.url,
            name: item.name,
            collection: 'planets'
        }

        dispatchCalBookmark({type: type, payload })
    }


    if (isLoading) {
        return <SkeletonPost />
    }

    if (isError) {
        return <div>ups... something error</div>
    }

    // console.log(data)

    return (
        <>
            <div className='px-5 flex flex-col'>
                <h1 className='font-bold text-xl'>Planets Collection</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 my-5'>
                    {data?.pages?.map((page, i) =>
                        <Fragment key={i}>
                            {/* <p className='text-xl font-semibold'>Page {i + 1}</p> */}
                            {page.results?.map((item: IPlanets, key: number) =>
                                <div onClick={()=>navigate(item.url.split(BASE_URL)[1])} className="border p-5 rounded-lg cursor-pointer hover:shadow-lg transition duration-300 ease-in-out" key={key}>
                                    <div className="flex flex-col">
                                        <div className="flex justify-between">
                                            <div className="flex items-center">
                                                <LazyLoadImage effect='blur' alt={`img-${item.name}`} src={thumbnail} className="w-24 h-16 object-cover rounded-2xl" />
                                                <div className="ml-5 space-y-0.5">
                                                    <div className='font-semibold text-base'>{item.name}</div>
                                                    <div>{item.diameter} Km</div>
                                                </div>
                                            </div>
                                            {bookmarkedItem.find(book => book.url === item.url)?
                                            <i className="fa-solid fa-bookmark text-2xl" onClick={(e) => handleBookmarkedItem(e, item, 'delete')}></i>
                                            :
                                            <i className="fa-regular fa-bookmark text-2xl" onClick={(e) => handleBookmarkedItem(e, item, 'push')}></i>
                                            }
                                        </div>
                                        <div className="flex flex-col my-4">
                                            <div>{convertToInternationalCurrencySystem(item.population)} populations</div>
                                            <div>{item.gravity==='1'? '1 standard G' : item.gravity==='2'? '2 standard Gs' : '0.5 standard Gs'}</div>
                                        </div>
                                        <div className="flex space-x-3 font-medium items-center text-xs md:text-sm">
                                            <div>Created at {dayjs(item.created).format('MMM DD, YYYY')}</div>
                                            <span className='h-1.5 w-1.5 bg-slate-500 rounded-full'></span>
                                            <div>Updated {dayjs(item.edited).fromNow()}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Fragment>
                    )}
                </div>
                {isFetchingNextPage && <div ref={refElement}><Loader /></div> }
                {hasNextPage && !isFetchingNextPage &&
                    <div className='flex justify-center mb-5'>
                        <button onClick={() => {fetchNextPage(); scrollToBottom() }} className='bg-yellow-500 w-32 py-2.5 text-white rounded-lg hover:opacity-70 font-medium transition duration-300 ease-in-out'>Load more...</button>
                    </div>
                }
            </div>
        </>
    );
}

export default Planets;