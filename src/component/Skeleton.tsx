export const SkeletonCard = () => {
    return (
        <div className="shadow rounded-lg p-5 w-full">
            <div className="flex flex-col animate-pulse">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <div className="w-16 h-16 bg-slate-300 rounded-full"></div>
                        <div className="ml-5 space-y-3">
                            <div className="h-5 w-64 bg-slate-300 rounded-md"></div>
                            <div className="h-4 w-40 bg-slate-300 rounded-md"></div>
                        </div>
                    </div>
                    <div className="h-10 w-8 bg-slate-300 rounded-md"></div>
                </div>
                <div className="space-y-2.5 flex flex-col my-4">
                    <div className="h-3 w-40 bg-slate-300 rounded-md"></div>
                    <div className="h-3 w-52 bg-slate-300 rounded-md"></div>
                </div>
                <div className="flex space-x-5">
                    <div className="h-5 w-44 bg-slate-300 rounded-md"></div>
                    <div className="h-5 w-48 bg-slate-300 rounded-md"></div>
                </div>
            </div>
        </div>
    )
}

export const SkeletonPost = () => {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
            {[1,2,3,4,5,6].map(key =>
                <SkeletonCard key={key} />    
            )}
        </div>
    )
}