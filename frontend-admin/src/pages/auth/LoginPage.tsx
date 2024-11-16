import {HtmlHTMLAttributes, ReactNode, useEffect, useRef} from 'react';
import {Avatar, Card, SxProps} from '@mui/material';
import {styled} from '@mui/material/styles';
import LockIcon from '@mui/icons-material/Lock';
import {useNavigate} from 'react-router-dom';
import {useCheckAuth} from 'ra-core';
import {LoginForm} from "./LoginForm.tsx";


const LoginPage = (props: LoginProps) => {
    const {
        children = defaultLoginForm,
        backgroundImage,
        avatarIcon = defaultAvatarIcon,
        ...rest
    } = props;
    const containerRef = useRef<HTMLDivElement>(null);
    let backgroundImageLoaded = false;
    const checkAuth = useCheckAuth();
    const navigate = useNavigate();
    useEffect(() => {
        checkAuth({}, false)
            .then(() => {
                // already authenticated, redirect to the home page
                navigate('/');
            })
            .catch(() => {
                // not authenticated, stay on the login page
            });
    }, [checkAuth, navigate]);

    const updateBackgroundImage = () => {
        if (!backgroundImageLoaded && containerRef.current) {
            containerRef.current.style.backgroundImage = `url(${backgroundImage})`;
            backgroundImageLoaded = true;
        }
    };

    // Load background image asynchronously to speed up time to interactive
    const lazyLoadBackgroundImage = () => {
        if (backgroundImage) {
            const img = new Image();
            img.onload = updateBackgroundImage;
            img.src = backgroundImage;
        }
    };

    useEffect(() => {
        if (!backgroundImageLoaded) {
            lazyLoadBackgroundImage();
        }
    });
    return (
        <Root {...rest} ref={containerRef}>
            <Card className={LoginClasses.card}>
                <div className={LoginClasses.avatar}>
                    <Avatar className={LoginClasses.icon}>{avatarIcon}</Avatar>
                </div>
                {children}
            </Card>
        </Root>
    );
};

const defaultLoginForm = <LoginForm/>;

const defaultAvatarIcon = <LockIcon/>;

export interface LoginProps extends HtmlHTMLAttributes<HTMLDivElement> {
    avatarIcon?: ReactNode;
    backgroundImage?: string;
    children?: ReactNode;
    className?: string;
    sx?: SxProps;
}

const PREFIX = 'RaLogin';
export const LoginClasses = {
    card: `${PREFIX}-card`,
    avatar: `${PREFIX}-avatar`,
    icon: `${PREFIX}-icon`,
};

const Root = styled('div', {
    name: PREFIX,
    overridesResolver: (_, styles) => styles.root,
})(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    height: '1px',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundImage:
        'radial-gradient(circle at 50% 14em, #313264 0%, #00023b 60%, #00023b 100%)',

    [`& .${LoginClasses.card}`]: {
        minWidth: 300,
        marginTop: '6em',
    },
    [`& .${LoginClasses.avatar}`]: {
        margin: '1em',
        display: 'flex',
        justifyContent: 'center',
    },
    [`& .${LoginClasses.icon}`]: {
        backgroundColor: (theme.palette as any).secondary[500],
    },
}));

export default LoginPage;