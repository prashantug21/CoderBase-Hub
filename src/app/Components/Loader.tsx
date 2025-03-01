import './loader.css';
function Loader() {
    return (
        <div className=' w-full flex justify-center items-center h-[calc(100vh-76.2px)]'>
            <div className="loader">
                <div className="loader-square" />
                <div className="loader-square" />
                <div className="loader-square" />
                <div className="loader-square" />
                <div className="loader-square" />
                <div className="loader-square" />
                <div className="loader-square" />
            </div>
        </div>
    )
}

export default Loader
