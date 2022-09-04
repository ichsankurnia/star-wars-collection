import {  useEffect, useState } from 'react';
import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'
import Root from "./page/Explore";
import { BASE_URL } from './api';
import People from './page/People';

import PeopleDetail from './page/PeopleDetail';
import Planets from './page/Planets';
import PlanetsDetail from './page/PlanetsDetail';
import Films from './page/FIlms';
import FilmsDetail from './page/FilmsDetail';
import Species from './page/Species';
import Speciesdetail from './page/Speciesdetail';
import Starships from './page/Starships';
import StarshipsDetail from './page/StarshipsDetail';
import Vehicles from './page/Vehicles';
import VehiclesDetail from './page/VehiclesDetail';
import NotFound from "./page/NotFound";
import Header from './component/Header';
import Bookmark from './page/Bookmark';

const queryClient = new QueryClient()

function App() {
  const [resource, setResource] = useState<any>(null)
  const [mobileMenu, setMobileMenu] = useState(false)

  const fetchAllResource = async () => {
    const req = await fetch(BASE_URL)
    const res = await req.json()

    setResource(res)
  }

  useEffect(() => {
    fetchAllResource()
  }, [])

  return (
    <>
      <div className='flex flex-col font-poppins text-sm'>
        <QueryClientProvider client={queryClient}>
          <Router>

            <Header mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />

            <div className='mt-5 overflow-hidden'>
              <div className='flex xl:max-w-[1300px] mx-auto w-full min-h-[75vh]'>

                <div className='hidden md:block w-[19rem] border rounded-lg'>
                  <div className='p-5 py-2 w-full font-bold'>Stars War Collection</div>
                  <ul className='flex flex-col border-t rounded-lg rounded-t-none p-2 space-y-2 font-medium pt-3'>
                    {resource && Object.entries(resource).map((item, key) =>
                      <NavLink to={item[0]} key={key} className={({ isActive }) => `rounded-lg hover:bg-gray-200 px-3 py-2 transition duration-300 ease-in-out ${isActive ? 'bg-gray-100 font-semibold' : 'bg-transparent'}`}>
                        <span className="capitalize">{item[0]}</span>
                      </NavLink>
                    )}
                  </ul>
                </div>

                <nav className={`fixed bg-white h-full w-full z-10 text-sm transform transition-all duration-700 ease-in-out ${mobileMenu ? '-translate-y-5' : '-translate-y-[70rem]'}`}>
                  <div className='bg-white p-5'>
                    <div className='p-5 py-2 w-full font-bold'>Stars War Collection</div>
                    <ul className='flex flex-col border-t rounded-lg rounded-t-none p-2 space-y-2 font-medium pt-3'>
                      {resource && Object.entries(resource).map((item, key) =>
                        <NavLink to={item[0]} onClick={()=>setMobileMenu(false)} key={key} className={({ isActive }) => `rounded-lg hover:bg-gray-200 px-3 py-2 transition duration-300 ease-in-out ${isActive ? 'bg-gray-100 font-semibold' : 'bg-transparent'}`}>
                          <span className="capitalize">{item[0]}</span>
                        </NavLink>
                      )}
                    </ul>
                  </div>
                </nav>

                <div className='w-full'>
                  <Routes>
                    <Route path='/' element={<Root />} />
                    <Route path='/bookmark' element={<Bookmark />} />
                    <Route path='/people' element={<People />} />
                    <Route path='/people/:id' element={<PeopleDetail />} />
                    <Route path='/planets' element={<Planets />} />
                    <Route path='/planets/:id' element={<PlanetsDetail />} />
                    <Route path='/films' element={<Films />} />
                    <Route path='/films/:id' element={<FilmsDetail />} />
                    <Route path='/species' element={<Species />} />
                    <Route path='/species/:id' element={<Speciesdetail />} />
                    <Route path='/starships' element={<Starships />} />
                    <Route path='/starships/:id' element={<StarshipsDetail />} />
                    <Route path='/vehicles' element={<Vehicles />} />
                    <Route path='/vehicles/:id' element={<VehiclesDetail />} />
                    <Route path='*' element={<NotFound className='min-h-[75vh]' />} />
                  </Routes>
                </div>

              </div>
            </div>

          </Router>
        </QueryClientProvider>
      </div>
    </>
  );
}

export default App;
