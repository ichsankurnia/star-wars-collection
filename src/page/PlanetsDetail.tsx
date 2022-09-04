import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useLocation } from 'react-router-dom';
import { BASE_URL } from '../api';
import { IPlanets } from '../utils/interface';
import poster from '../asset/poster-planet.png'
import { convertToInternationalCurrencySystem } from '../utils/helper';
import dayjs from 'dayjs';
import useDetailCollection from '../hooks/useDetailCollection';
import Loader from '../component/Loader';

type Props = {};

const PlanetsDetail: React.FC<Props> = () => {
    const { pathname } = useLocation()

    const { result, loading, error } = useDetailCollection(pathname)
    const data = result as IPlanets

    if(loading){
        return <Loader title='Please wait...' />
    }

    if(error){
        return <>error</>
    }

    return (
        <>
            <div className='px-5 flex flex-col pb-10'>
                <h1 className='font-bold text-lg'><Link to='/planets' className='text-blue-500 text-xl hover:underline'>Planets Collection</Link> / Detail</h1>
                <div className='border p-5 rounded-2xl mt-5'>
                    <h2 className='mb-5 text-2xl font-bold text-center md:text-left'>{data?.name}</h2>
                    <div className='flex flex-col-reverse md:flex-row justify-between items-center relative'>
                        <div className='grid grid-cols-3 gap-y-4 gap-x-10 md:gap-x-16 md:text-base'>
                            <span className='detail-label'>Diameter</span>
                            <span className='detail-value'>{data?.diameter} Km</span>
                            <span className='detail-label'>Population</span>
                            <span className='detail-value'>{convertToInternationalCurrencySystem(data?.population)}</span>
                            <span className='detail-label'>Climate</span>
                            <span className='detail-value'>{data?.climate}</span>
                            <span className='detail-label'>Terrain</span>
                            <span className='detail-value'>{data?.terrain}</span>
                            <span className='detail-label'>Gravity</span>
                            <span className='detail-value'>{data?.gravity==='1'? '1 standard G' : data?.gravity==='2'? '2 standard Gs' : '0.5 standard Gs'}</span>
                            <span className='detail-label'>Surface Water</span>
                            <span className='detail-value'>{data?.surface_water}%</span>
                            <span className='detail-label'>Rotation Period</span>
                            <span className='detail-value'>{data?.rotation_period} hours</span>
                            <span className='detail-label'>Orbital Period</span>
                            <span className='detail-value'>{data?.orbital_period} days</span>
                            <span className='detail-label'>Created</span>
                            <span className='detail-value'>{dayjs(data?.created).format('HH:mm MMMM DD, YYYY')}</span>
                            <span className='detail-label'>Edited</span>
                            <span className='detail-value'>{dayjs(data?.edited).format('HH:mm MMMM DD, YYYY')}</span>
                            <span className='detail-label'>Residents</span>
                            <div className='detail-value'>
                                {data?.residents.map((item, key) => 
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

export default PlanetsDetail;