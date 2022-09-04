import React, { useContext } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../api';
import GlobalContext, { IBookmark } from '../context/GlobalContext';
import people from '../asset/people-icon.png'
import planets from '../asset/thumbnail-planet.jpg'
import species from '../asset/thumbnail-species.webp'
import starships from '../asset/thumbnail-starships.png'
import vehicles from '../asset/thumbnail-vehicles.png'
import films from '../asset/thumbnail-film.webp'

type Props = {};

const Bookmark: React.FC<Props> = () => {
    const navigate = useNavigate()
    const { bookmarkedItem, dispatchCalBookmark } = useContext(GlobalContext)


    const handleBookmarkedItem = (e: React.MouseEvent<HTMLElement>, item: any, type: 'push' | 'delete') => {
        e.stopPropagation()

        const payload = {
            url: item.url,
            name: item.name,
            collection: 'starships'
        }

        dispatchCalBookmark({ type: type, payload })
    }

    const getThumbnailImg = (collection: string) => {
        switch (collection) {
            case 'people':
                return people
            case 'planets':
                return planets
            case 'species':
                return species
            case 'vehicles':
                return vehicles
            case 'starships':
                return starships
            case 'films':
                return films
            default:
                break;
        }
    }

    return (
        <>
            <div className='px-5 flex flex-col pb-10'>
                <h1 className='font-bold text-lg'>Bookmark</h1>
                {bookmarkedItem.length > 0 ?
                    <div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 my-5'>
                            {bookmarkedItem?.map((item: IBookmark, key: number) =>
                                <div onClick={() => navigate(item.url.split(BASE_URL)[1])} className="border p-5 rounded-lg cursor-pointer hover:shadow-lg transition duration-300 ease-in-out" key={key}>
                                    <div className="flex flex-col">
                                        <div className="flex justify-between">
                                            <div className="flex items-center">
                                                <LazyLoadImage effect='blur' alt={`img-${item.name}`} src={getThumbnailImg(item.collection)} className="w-32 h-16 object-cover rounded-lg" />
                                                <div className="ml-5 space-y-0.5 max-w-[60%]">
                                                    <div className='font-semibold md:text-lg'>{item.name}</div>
                                                </div>
                                            </div>
                                            {bookmarkedItem.find(book => book.url === item.url) &&
                                                <i className="fa-solid fa-bookmark text-2xl" onClick={(e) => handleBookmarkedItem(e, item, 'delete')}></i>
                                            }
                                        </div>
                                        <div className="flex flex-col mt-10">
                                            <div className='text-gray-500'>Collection : <span className='font-medium text-gray-700'>{item.collection}</span></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    :
                    <div className='border p-5 rounded-2xl mt-5'>

                        <span className='font-medium text-base'>No item</span>
                    </div>
                }
            </div>
        </>
    );
}

export default Bookmark;