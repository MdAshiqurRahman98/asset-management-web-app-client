

const Packages = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
            <div className="card rounded-lg p-5 bg-base-200">
                <div className="mb-1 flex flex-grow justify-center">
                    <img className="w-80 h-52 object-cover" src='https://i.ibb.co/88z3Nqh/5-logo.jpg' alt="Image" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-center mt-5 mb-1 px-2 py-[2px]">Maximum 5 employees $5</h3>
                </div>
            </div>
            <div className="card rounded-lg p-5 bg-base-200">
                <div className="mb-1 flex flex-grow justify-center">
                    <img className="w-80 h-52 object-cover" src='https://i.ibb.co/WVN30J1/10-logo.jpg' alt="Image" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-center mt-5 mb-1 px-2 py-[2px]">Maximum 10 employees $8</h3>
                </div>
            </div>
            <div className="card rounded-lg p-5 bg-base-200">
                <div className="mb-1 flex flex-grow justify-center">
                    <img className="w-80 h-52 object-cover" src='https://i.ibb.co/SwtbB9G/20-logo.jpg' alt="Image" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-center mt-5 mb-1 px-2 py-[2px]">Maximum 20 employees $15</h3>
                </div>
            </div>
        </div>
    );
};

export default Packages;