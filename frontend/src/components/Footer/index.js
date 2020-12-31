import { NavLink } from 'react-router-dom';
import './footer.css'


const Footer = () => {
    return (
        <div className='footer-body'>
            <div className='footer-link'>
                <NavLink className='footer' to='/'>About us</NavLink>
                <NavLink className='footer' to='/'>Contact us</NavLink>
                <NavLink className='footer' to='/'>FAQ</NavLink>
            </div>
        </div>
    )
};

export default Footer;