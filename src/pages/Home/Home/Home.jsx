import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Packages from "../Packages/Packages";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Home | DigitalHub</title>
            </Helmet>
            <Banner></Banner>

            <h3 className="text-3xl font-bold text-center mt-9 mb-9">About Us</h3>
            <p className="text-center mb-14">
                Welcome to our Asset Management System web app, a cutting-edge solution designed to elevate how organizations oversee and optimize their valuable resources. Tailored by DigitalHub, our web app is at the forefront of technological innovation, providing a comprehensive platform for managing both physical and digital assets with unparalleled efficiency. With a user-friendly interface and robust features, our system caters to the diverse needs of businesses, ensuring seamless tracking, maintenance, and utilization of assets throughout their lifecycle. Whether it`s overseeing equipment, handling software licenses, or streamlining request workflows, our Asset Management System is engineered to enhance operational transparency and streamline asset-related processes. Rooted in a commitment to excellence, our web app empowers users with real-time insights, powerful reporting tools, and a responsive design that ensures a seamless experience across devices. At the intersection of user-friendly design and advanced functionality, our Asset Management System redefines how businesses interact with their assets, fostering efficiency, compliance, and strategic decision-making. Join us on a journey where asset management becomes a catalyst for organizational success, and DigitalHub`s web app becomes the cornerstone of your resource optimization strategy.
            </p>

            <div className="mb-14">
                <h3 className="text-3xl font-bold text-center mt-20 mb-14">Our Packages</h3>
                <Packages></Packages>
            </div>
        </>
    );
};

export default Home;