

const Footer = () => {
    return (
        <footer className="footer p-10 text-white">
            <aside className="mt-7">
                <figure><img className="w-[30px] h-[30px] rounded-lg" src="https://i.ibb.co/VBzzqzb/Digital-Hub-logo.jpg" alt="Logo" /></figure>
                <p>DigitalHub<br />Copyright &copy; {new Date().getUTCFullYear()} DigitalHub | All rights reserved.</p>
            </aside>
            <nav>
                <header className="footer-title">Packages</header>
                <a className="link link-hover">Maximum 5 employees</a>
                <a className="link link-hover">Maximum 10 employees</a>
                <a className="link link-hover">Maximum 20 employees</a>
            </nav>
            <nav>
                <header className="footer-title">Quick Links</header>
                <a className="link link-hover" href="/">Home</a>
                <a className="link link-hover" href="/join-employee">Join as Employee</a>
                <a className="link link-hover" href="/join-admin">Join as HR/Admin</a>
            </nav>
            <nav>
                <header className="footer-title">Legal</header>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
        </footer>
    );
};

export default Footer;