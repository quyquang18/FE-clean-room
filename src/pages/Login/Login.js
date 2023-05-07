import classNames from 'classnames/bind';
import { useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';

import * as actions from '~/store/actions';
import { handleLoginApi } from '~/services/userService';
import config from '~/config';
import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { path } from '~/utils';
const cx = classNames.bind(styles);

function Login() {
    document.title = 'LUXAS-Login';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [errMessage, setErrMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state);
    const handleLogin = async (e) => {
        setErrMessage('');
        e.preventDefault();
        setErrMessage('');
        try {
            dispatch(actions.changeStatusReactLoading(true));
            let data = await handleLoginApi(email, password);
            // console.log(data);
            if (data && data.errCode !== 0) {
                dispatch(actions.changeStatusReactLoading(false));
                dispatch(actions.userLoginFail());
                setErrMessage(data.message);
            }
            if (data && data.errCode === 0) {
                dispatch(actions.changeStatusReactLoading(false));
                dispatch(actions.userLoginSuccess(data.user));
                navigate(path.HOMEPAGE);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={cx('wapper-login')}>
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
