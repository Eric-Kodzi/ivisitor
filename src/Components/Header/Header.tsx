import Logo from './Logo.png';
import './Header.css';

export default function Header() {
    return (
        <header>
            <img src={Logo} alt={'company logo'}/>
        </header>

    )
}