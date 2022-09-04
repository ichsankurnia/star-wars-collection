import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useLocation } from 'react-router-dom';
import { BASE_URL } from '../api';
import { IPeople } from '../utils/interface';
import peopleIcon from '../asset/people-icon.png'
import dayjs from 'dayjs';
import useDetailCollection from '../hooks/useDetailCollection';
import Loader from '../component/Loader';

type Props = {};

const PeopleDetail: React.FC<Props> = () => {
    const { pathname } = useLocation()

    const { result, loading, error } = useDetailCollection(pathname)
    const data = result as IPeople

    if(loading){
        return <Loader title='Please wait...' />
    }

    if(error){
        return <>error</>
    }

    return (
        <>
            <div className='px-5 flex flex-col pb-10'>
                <h1 className='font-bold text-lg'><Link to='/people' className='text-blue-500 text-xl hover:underline'>People Collection</Link> / Detail</h1>
                <div className='flex flex-col items-center'>
                    <h2 className='text-lg font-semibold mt-5'>Character Info</h2>
                    <LazyLoadImage effect='blur' alt='character-detail' src={peopleIcon} className="w-32 rounded-full border p-3 my-4" />
                    <Link to={data?.homeworld?.split(BASE_URL)[1] || ''}  className='capitalize font-medium text-blue-500 hover:underline mb-5'>
                        Homeworld {data?.homeworld?.split('/')[data?.homeworld?.split('/').length - 3]} {data?.homeworld?.split('/')[data?.homeworld?.split('/').length - 2]}
                    </Link>
                    <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-12 gap-y-6 md:gap-y-8'>
                        <div className='flex flex-col items-center w-40 md:w-64'>
                            <span className='text-gray-600 italic mb-1'>Name</span>
                            <span className='md:text-base font-medium truncate'>{data?.name}</span>
                        </div>
                        <div className='flex flex-col items-center w-40 md:w-64'>
                            <span className='text-gray-600 italic mb-1'>Height</span>
                            <span className='md:text-base font-medium truncate'>{data?.height}</span>
                        </div>
                        <div className='flex flex-col items-center w-40 md:w-64'>
                            <span className='text-gray-600 italic mb-1'>Mass</span>
                            <span className='md:text-base font-medium truncate'>{data?.mass}</span>
                        </div>
                        <div className='flex flex-col items-center w-40 md:w-64'>
                            <span className='text-gray-600 italic mb-1'>Gender</span>
                            <span className='md:text-base font-medium truncate'>{data?.gender}</span>
                        </div>
                        <div className='flex flex-col items-center w-40 md:w-64'>
                            <span className='text-gray-600 italic mb-1'>Birth Year</span>
                            <span className='md:text-base font-medium truncate'>{data?.birth_year}</span>
                        </div>
                        <div className='flex flex-col items-center w-40 md:w-64'>
                            <span className='text-gray-600 italic mb-1'>Skin Color</span>
                            <span className='md:text-base font-medium truncate'>{data?.skin_color}</span>
                        </div>
                        <div className='flex flex-col items-center w-40 md:w-64'>
                            <span className='text-gray-600 italic mb-1'>Hair Color</span>
                            <span className='md:text-base font-medium truncate'>{data?.hair_color}</span>
                        </div>
                        <div className='flex flex-col items-center w-40 md:w-64'>
                            <span className='text-gray-600 italic mb-1'>Eye Color</span>
                            <span className='md:text-base font-medium truncate'>{data?.eye_color}</span>
                        </div>
                        <div className='flex flex-col items-center w-40 md:w-64'>
                            <span className='text-gray-600 italic mb-1'>Created at</span>
                            <span className='font-medium truncate'>{dayjs(data?.created).format('HH:mm MMM DD, YYYY')}</span>
                        </div>
                        <div className='flex flex-col items-center w-40 md:w-64'>
                            <span className='text-gray-600 italic mb-1'>Last Modified</span>
                            <span className='font-medium truncate'>{dayjs(data?.edited).format('HH:mm MMM DD, YYYY')}</span>
                        </div>
                    </div>
                    <h2 className='text-lg font-semibold mt-8 mb-4'>Collection</h2>
                    <div className='grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-12 gap-y-6 md:gap-y-8'>
                        <div className='flex flex-col items-center w-40 md:w-64'>
                            <span className='text-gray-600 italic mb-1.5'>Films</span>
                            <ul className='flex flex-col space-y-1'>
                                {data?.films?.map((item, key) => 
                                    <li className='capitalize font-medium text-blue-500 hover:underline' key={key}>
                                        <Link to={item.split(BASE_URL)[1] || ''}>{item.split('/')[item.split('/').length - 3]} {item.split('/')[item.split('/').length - 2]}</Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className='flex flex-col items-center w-40 md:w-64'>
                            <span className='text-gray-600 italic mb-1.5'>Species</span>
                            <ul className='flex flex-col space-y-1'>
                                {data?.species?.map((item, key) => 
                                    <li className='capitalize font-medium text-blue-500 hover:underline' key={key}>
                                        <Link to={item.split(BASE_URL)[1] || ''}>{item.split('/')[item.split('/').length - 3]} {item.split('/')[item.split('/').length - 2]}</Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className='flex flex-col items-center w-40 md:w-64'>
                            <span className='text-gray-600 italic mb-1.5'>Vehicles</span>
                            <ul className='flex flex-col space-y-1'>
                                {data?.vehicles?.map((item, key) => 
                                    <li className='capitalize font-medium text-blue-500 hover:underline' key={key}>
                                        <Link to={item.split(BASE_URL)[1] || ''}>{item.split('/')[item.split('/').length - 3]} {item.split('/')[item.split('/').length - 2]}</Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className='flex flex-col items-center w-40 md:w-64'>
                            <span className='text-gray-600 italic mb-1.5'>Starships</span>
                            <ul className='flex flex-col space-y-1'>
                                {data?.starships?.map((item, key) => 
                                    <li className='capitalize font-medium text-blue-500 hover:underline' key={key}>
                                        <Link to={item.split(BASE_URL)[1] || ''}>{item.split('/')[item.split('/').length - 3]} {item.split('/')[item.split('/').length - 2]}</Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PeopleDetail;