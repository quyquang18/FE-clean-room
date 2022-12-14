import classNames from 'classnames/bind';
import { useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';

import { handleLoginApi } from '~/services/userService';
import config from '~/config';
import styles from './Login.module.scss';
const cx = classNames.bind(styles);

function Login() {
    document.title = 'LUXAS-Login';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [errMessage, setErrMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        setErrMessage('');
        e.preventDefault();
        try {
            setIsLoading(true);
            let data = await handleLoginApi(email, password);
            setIsLoading(false);
            if (data && data.errCode !== 0) {
                setErrMessage(data.message);
            }
            if (data && data.errCode === 0) {
                alert('Logged in successfully');
                localStorage.setItem(
                    'user',
                    JSON.stringify({
                        isLoggedIn: true,
                        userInfo: data.user,
                    }),
                );
                navigate('/', { replace: true });
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    setErrMessage(error.response.data.message);
                    console.log(error.response);
                }
            }
            console.log(error);
        }
    };
    return (
        <div className={cx('wapper-login')}>
            {isLoading && (
                <div className={cx('loader-container')}>
                    <div className={cx('spinner')}></div>
                    <p> Loading. please await</p>
                </div>
            )}
            <div className={cx('header')}>
                <h1 className={cx('form-heading')}>Đăng nhập</h1>
            </div>
            <form method="post" className={cx('form')}>
                <div className={cx('form-username')}>
                    <div className={cx('fif_wrap')}>
                        <label htmlFor="email">Email</label>
                        <span>
                            <p>Bạn chưa có tài khoản?</p>
                            <Link to={config.routes.register} className={cx('btn-register')}>
                                Đăng kí
                            </Link>
                        </span>
                    </div>

                    <div className={cx('form-input')}>
                        <input
                            type="email"
                            name="email"
                            className={cx('user-input')}
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className={cx('form-pass')}>
                    <div className={cx('fif_wrap')}>
                        <label htmlFor="curent-password">Mật khẩu</label>
                        <span>
                            {hidePassword ? (
                                <>
                                    <BiHide />
                                    <p
                                        onClick={() => {
                                            setHidePassword(false);
                                        }}
                                        className={cx('show-btn')}
                                    >
                                        Hide
                                    </p>
                                </>
                            ) : (
                                <>
                                    <BiShow />
                                    <p
                                        onClick={() => {
                                            setHidePassword(true);
                                        }}
                                        className={cx('show-btn')}
                                    >
                                        Show
                                    </p>
                                </>
                            )}
                        </span>
                    </div>
                    <div className={cx('form-input')}>
                        <input
                            type={hidePassword ? 'password' : 'text'}
                            name="password"
                            className={cx('user-input')}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className={cx('mess-error')}>{errMessage}</div>
                <input type="submit" value="Đăng nhập" className={cx('form-submit')} onClick={handleLogin} />
                <Link className={cx('forgot_pass')} to={config.routes.register}>
                    Quên mật khẩu
                </Link>
            </form>
        </div>
    );
}

export default Login;
