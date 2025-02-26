import './loader.css';
function Loader() {
    return (
        <div className=' w-full flex justify-center items-center h-screen'>
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
