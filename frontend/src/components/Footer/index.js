import { NavLink } from 'react-router-dom';
import './footer.css'


const Footer = () => {
    return (
        <div className='footer-body'>
            <div className='footer-link'>
                <NavLink to='/'>About us</NavLink>
                <NavLink to='/'>Contact us</NavLink>
                <NavLink to='/'>FAQ</NavLink>
            </div>
        </div>
    )
};

export default Footer;