import Link from 'next/link'
export default function Download(){
    return(
        <div className="bg-purple-700 w-full py-20 md:flex justify-around px-24">
            <div className="md:w-1/2 mx-auto md:mx-0">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Try Edufy now. It's simple.</h1>
            <p className="mt-3 text-gray-200 text-lg md:text-xl ">Experience online meetings with emotion intelligence. Your meetings have never been this interactive!</p>
            </div>
            <div className="md:w-1/2 md:text-center my-auto mt-12 md:mt-0 text-start"> 
                <Link href="/">
                    <a className="bg-white md:px-12 px-6 py-3 text-purple-700 rounded-full font-bold text-md md:text-xl">Start your trial</a>
                </Link>
                
                
            </div>
        </div>
    )
}