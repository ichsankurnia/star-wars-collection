import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useLocation } from 'react-router-dom';
import { BASE_URL } from '../api';
import { ISpecies } from '../utils/interface';
import poster from '../asset/poster-species.png'
import dayjs from 'dayjs';
import Loader from '../component/Loader';
import useDetailCollection from '../hooks/useDetailCollection';

type Props = {};

const SpeciesDetail: React.FC<Props> = () => {
    const { pathname } = useLocation()

    const { result, loading, error } = useDetailCollection(pathname)
    const data = result as ISpecies

    if(loading){
        return <Loader title='Please wait...' />
    }

    if(error){
        return <>error</>
    }

    return (
        <>
            <div className='px-5 flex flex-col pb-10'>
                <h1 className='font-bold text-lg'><Link to='/species' className='text-blue-500 text-xl hover:underline'>Species Collection</Link> / Detail</h1>
                <div className='border p-5 rounded-2xl mt-5'>
                    <h2 className='mb-5 text-2xl font-bold text-center md:text-left'>{data?.name}</h2>
                    <div className='flex flex-col-reverse md:flex-row justify-between items-center relative'>
                        <div className='grid grid-cols-3 gap-y-4 gap-x-10 md:gap-x-16 md:text-base capitalize'>
                            <span className='detail-label'>designation</span>
                            <span className='detail-value'>{data?.designation}</span>
                            <span className='detail-label'>classification</span>
                            <span className='detail-value'>{data?.classification}</span>
                            <span className='detail-label'>average Height</span>
                            <span className='detail-value'>{data?.average_height} cm</span>
                            <span className='detail-label'>average lifespan</span>
                            <span className='detail-value'>{data?.average_lifespan} years</span>
                            <span className='detail-label'>eye colors</span>
                            <span className='detail-value'>{data?.eye_colors}</span>
                            <span className='detail-label'>hair colors</span>
                            <span className='detail-value'>{data?.hair_colors}</span>
                            <span className='detail-label'>skin colors</span>
                            <span className='detail-value'>{data?.skin_colors} days</span>
                            <span className='detail-label'>language</span>
                            <span className='detail-value'>{data?.language} days</span>
                            <span className='detail-label'>Created</span>
                            <span className='detail-value'>{dayjs(data?.created).format('HH:mm MMMM DD, YYYY')}</span>
                            <span className='detail-label'>Edited</span>
                            <span className='detail-value'>{dayjs(data?.edited).format('HH:mm MMMM DD, YYYY')}</span>
                            <span className='detail-label'>homeworld</span>
                            <span className='detail-value'>
                                {data?.homeworld?
                                <Link to={data?.homeworld?.split(BASE_URL)[1] || ''} className='capitalize font-medium text-blue-500 hover:underline'>
                                    {data?.homeworld?.split('/')[data?.homeworld?.split('/').length - 3]} {data?.homeworld?.split('/')[data?.homeworld?.split('/').length - 2]}
                                </Link>
                                : '-'
                                }
                            </span>
                            <span className='detail-label'>People</span>
                            <div className='detail-value'>
                                {data?.people.map((item, key) => 
                                    <Link className='capitalize font-medium text-blue-500 hover:underline text-sm' to={item.split(BASE_URL)[1]} key={key}>
                                        {item.split('/')[item.split('/').length - 3]} {item.split('/')[item.split('/').length - 2]}
                                    </Link>
                                )}
                            </div>
                            <span className='detail-label'>Films</span>
                            <div className='detail-value'>
                                {data?.films.map((item, key) => 
                                    <Link className='capitalize font-medium text-blue-500 hover:underline text-sm' to={item.split(BASE_URL)[1]} key={key}>
                                        {item.split('/')[item.split('/').length - 3]} {item.split('/')[item.split('/').length - 2]}
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div className='md:absolute top-0 right-0 mb-5 md:mb-0 -mt-2 md:-mt-12'>
                            <LazyLoadImage effect='blur' alt='' src={poster} className='w-40 md:w-[28rem]' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SpeciesDetail;