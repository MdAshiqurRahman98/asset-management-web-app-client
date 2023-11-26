import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className='text-center w-3/4 ml-14 md:ml-40 mt-5 md:mt-12 mb-9 md:mb-20'>
            <Carousel>
                <div className='relative'>
                    <img src='https://i.ibb.co/KbhPpSK/Join-HR-logo.jpg' />
                    <Link to='/join-admin'>
                        <button className='btn btn-sm text-white bg-[#FF444A] hover:bg-[#FF444A] normal-case text-xs md:text-lg md:font-medium rounded-lg absolute top-[153px] right-[7px] md:top-[451px] md:right-7'>Join as HR/Admin</button>
                    </Link>
                </div>
                <div className='relative'>
                    <img src='https://i.ibb.co/YXXD45H/Join-as-an-employee.jpg' />
                    <Link to='/join-employee'>
                        <button className='btn btn-sm text-white bg-[#FF444A] hover:bg-[#FF444A] normal-case text-xs md:text-lg md:font-medium rounded-lg absolute top-[141px] right-[7px] md:top-[421px] md:right-7'>Join as Employee</button>
                    </Link>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;