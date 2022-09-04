import React from 'react';

type Props = {
    className?: string,
};

const NotFound: React.FC<Props> = ({className}) => {
    return (
        <>
            <div className={`h-full flex flex-col text-center justify-center font-medium ${className} px-8`}>
                <h1 className='font-extrabold text-7xl'>404</h1>
                <h1 className='font-semibold mb-5'>Oops. Page not found</h1>
                <p>Looks like the page you were looking for does not exist</p>
            </div>
        </>
    );
}

export default NotFound;