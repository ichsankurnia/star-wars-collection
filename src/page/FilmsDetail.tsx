import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useLocation } from 'react-router-dom';
import { BASE_URL } from '../api';
import { IFilms } from '../utils/interface';
import poster from '../asset/poster-film.jpg'
import dayjs from 'dayjs';
import Loader from '../component/Loader';
import useDetailCollection from '../hooks/useDetailCollection';

type Props = {};

const FilmsDetail: React.FC<Props> = () => {
    const { pathname } = useLocation()

    const { result, loading, error } = useDetailCollection(pathname)
    const data = result as IFilms

    if(loading){
        return <Loader title='Please wait...' />
    }

    if(error){
        return <>error</>
    }

    return (
        <>
            <div className='px-5 flex flex-col pb-10'>
                <h1 className='font-bold text-lg'><Link to='/films' className='text-blue-500 text-xl hover:underline'>Films Collection</Link> / Detail</h1>
                <div className='border p-5 rounded-2xl mt-5'>
                    <h2 className='mb-5 text-2xl font-bold text-center md:text-left'>{data?.title}</h2>
                    <div className='flex flex-col-reverse md:flex-row justify-between items-center relative'>
                        <div className='grid grid-cols-3 gap-4 gap-y-4 md:text-base'>
                            <span className='detail-label'>Episode</span>
                            <span className='detail-value'>{data?.episode_id}</span>
                            <span className='detail-label'>Release Date</span>
                            <span className='detail-value'>{dayjs(data?.release_date).format('YYYY-MM-DD')}</span>
                            <span className='detail-label'>Producer</span>
                            <span className='detail-value md:w-[23rem]'>{data?.producer}</span>
                            <span className='detail-label'>Director</span>
                            <span className='detail-value'>{data?.director} Km</span>
                            <span className='detail-label'>Opening Crawl</span>
                            <span className='detail-value md:w-[20rem]'>{data?.opening_crawl}</span>
                            <span className='detail-label'>Created</span>
                            <span className='detail-value'>{dayjs(data?.created).format('HH:mm MMMM DD, YYYY')}</span>
                            <span className='detail-label'>Edited</span>
                            <span className='detail-value'>{dayjs(data?.edited).format('HH:mm MMMM DD, YYYY')}</span>
                            <span className='detail-label'>Characters</span>
                            <div className='detail-value'>
                                {data?.characters.map((item, key) => 
                                    <Link className='capitalize font-medium text-blue-500 hover:underline text-sm' to={item.split(BASE_URL)[1]} key={key}>
                                        {item.split('/')[item.split('/').length - 3]} {item.split('/')[item.split('/').length - 2]}
                                    </Link>
                                )}
                            </div>
                            <span className='detail-label'>Planets</span>
                            <div className='detail-value'>
                                {data?.planets.map((item, key) => 
                                    <Link className='capitalize font-medium text-blue-500 hover:underline text-sm' to={item.split(BASE_URL)[1]} key={key}>
                                        {item.split('/')[item.split('/').length - 3]} {item.split('/')[item.split('/').length - 2]}
                                    </Link>
                                )}
                            </div>
                            <span className='detail-label'>Species</span>
                            <div className='detail-value'>
                                {data?.species.map((item, key) => 
                                    <Link className='capitalize font-medium text-blue-500 hover:underline text-sm' to={item.split(BASE_URL)[1]} key={key}>
                                        {item.split('/')[item.split('/').length - 3]} {item.split('/')[item.split('/').length - 2]}
                                    </Link>
                                )}
                            </div>
                            <span className='detail-label'>Vehicles</span>
                            <div className='detail-value'>
                                {data?.vehicles.map((item, key) => 
                                    <Link className='capitalize font-medium text-blue-500 hover:underline text-sm' to={item.split(BASE_URL)[1]} key={key}>
                                        {item.split('/')[item.split('/').length - 3]} {item.split('/')[item.split('/').length - 2]}
                                    </Link>
                                )}
                            </div>
                            <span className='detail-label'>Starships</span>
                            <div className='detail-value'>
                                {data?.starships.map((item, key) => 
                                    <Link className='capitalize font-medium text-blue-500 hover:underline text-sm' to={item.split(BASE_URL)[1]} key={key}>
                                        {item.split('/')[item.split('/').length - 3]} {item.split('/')[item.split('/').length - 2]}
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div className='md:absolute top-0 right-0 mb-5 md:mb-0 -mt-2 md:-mt-10'>
                            <LazyLoadImage effect='blur' alt={data?.title} src={poster} className='w-40 md:w-[28rem] rounded-2xl' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FilmsDetail;