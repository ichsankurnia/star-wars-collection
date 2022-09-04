import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useLocation } from 'react-router-dom';
import { BASE_URL } from '../api';
import { IVehicles } from '../utils/interface';
import poster from '../asset/poster-vehicles.png'
import dayjs from 'dayjs';
import useDetailCollection from '../hooks/useDetailCollection';
import Loader from '../component/Loader';

type Props = {};

const VehiclesDetail: React.FC<Props> = () => {
    const { pathname } = useLocation()

    const { result, loading, error } = useDetailCollection(pathname)
    const data = result as IVehicles

    if(loading){
        return <Loader title='Please wait...' />
    }

    if(error){
        return <>error</>
    }

    return (
        <>
            <div className='px-5 flex flex-col pb-10'>
                <h1 className='font-bold text-lg'><Link to='/vehicles' className='text-blue-500 text-xl hover:underline'>Vehicles Collection</Link> / Detail</h1>
                <div className='border p-5 rounded-2xl mt-5'>
                    <h2 className='mb-5 text-2xl font-bold text-center md:text-left'>{data?.name}</h2>
                    <div className='flex flex-col-reverse md:flex-row justify-between items-center relative'>
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-10 md:gap-x-16 md:text-base capitalize'>
                            <span className='detail-label'>model</span>
                            <span className='detail-value col-span-1 md:col-span-2'>{data?.model}</span>
                            <span className='detail-label'>vehicle class</span>
                            <span className='detail-value col-span-1 md:col-span-2'>{data?.vehicle_class}</span>
                            <span className='detail-label'>manufacturer</span>
                            <span className='detail-value col-span-1 md:col-span-2'>{data?.manufacturer}</span>
                            <span className='detail-label'>max atmosphering speed</span>
                            <span className='detail-value col-span-1 md:col-span-2'>{data?.max_atmosphering_speed}</span>
                            <span className='detail-label'>cargo capacity</span>
                            <span className='detail-value col-span-1 md:col-span-2'>{data?.cargo_capacity} kg</span>
                            <span className='detail-label'>consumables</span>
                            <span className='detail-value col-span-1 md:col-span-2'>{data?.consumables}</span>
                            <span className='detail-label'>length</span>
                            <span className='detail-value col-span-1 md:col-span-2'>{data?.length} meters</span>
                            <span className='detail-label'>crew</span>
                            <span className='detail-value col-span-1 md:col-span-2'>{data?.crew}</span>
                            <span className='detail-label'>passengers</span>
                            <span className='detail-value col-span-1 md:col-span-2'>{data?.passengers}</span>
                            <span className='detail-label'>cost in credits</span>
                            <span className='detail-value col-span-1 md:col-span-2'>{data?.cost_in_credits} Galactic Credits</span>
                            <span className='detail-label'>Created</span>
                            <span className='detail-value col-span-1 md:col-span-2'>{dayjs(data?.created).format('HH:mm MMMM DD, YYYY')}</span>
                            <span className='detail-label'>Edited</span>
                            <span className='detail-value col-span-1 md:col-span-2'>{dayjs(data?.edited).format('HH:mm MMMM DD, YYYY')}</span>
                            <span className='detail-label'>Pilots</span>
                            <div className='detail-value col-span-1 md:col-span-2'>
                                {data?.pilots?.length!>0? data?.pilots.map((item, key) => 
                                    <Link className='capitalize font-medium text-blue-500 hover:underline text-sm' to={item.split(BASE_URL)[1]} key={key}>
                                        {item.split('/')[item.split('/').length - 3]} {item.split('/')[item.split('/').length - 2]}
                                    </Link>
                                ):'-'
                            }
                            </div>
                            <span className='detail-label'>Films</span>
                            <div className='detail-value col-span-1 md:col-span-2'>
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

export default VehiclesDetail;