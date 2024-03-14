import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';

import * as actions from '~/store/actions';
import { handleLoginApi } from '~/services/userService';
import config from '~/config';
import styles from './Login.module.scss';
import { path } from '~/utils';
import { EyeHideIcon, EyeShowIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Login() {
    document.title = 'LUXAS-Login';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [errMessage, setErrMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = async (e) => {
        setErrMessage('');
        e.preventDefault();
        setErrMessage('');
        try {
            dispatch(actions.changeStatusReactLoading(true));
            let data = await handleLoginApi(email, password);
            if (data && data.errCode !== 0) {
                dispatch(actions.changeStatusReactLoading(false));
                dispatch(actions.userLoginFail());
                setErrMessage(data.message);
            }
            if (data && data.errCode === 0) {
                let expiresIn = data.expires_in * 1000 + Date.now();
                dispatch(actions.userLoginSuccess(data.user, data.accessToken, data.refreshToken, expiresIn));
                navigate(path.HOME);
                dispatch(actions.changeStatusReactLoading(false));
            }
        } catch (error) {
            console.log(error);
            dispatch(actions.changeStatusReactLoading(false));
            dispatch(actions.userLoginFail());
            setErrMessage(error.message);
        }
    };
    return (
        <div className={cx('wapper-login', 'row')}>
            <div className={cx('col c-12 m-6 m-o-3 l-4 l-o-4')}>
                <div className={cx('login-container')}>
                    <div className={cx('header')}>
                        <h1 className={cx('form-heading')}>
                            <FormattedMessage id="login.login" />
                        </h1>
                    </div>
                    <form method="post">
                        <div className="row mt-2">
                            <div className={cx('fif_wrap', 'col c-12 m-12 l-12')}>
                                <label htmlFor="email">Email</label>
                                <span>
                                    <p>
                                        <FormattedMessage id="login.redirect-register" />
                                    </p>
                                    <Link to={config.routes.register} className={cx('btn-register')}>
                                        <FormattedMessage id="login.register" />
                                    </Link>
                                </span>
                            </div>

                            <div className={cx('col c-12 m-12 l-12')}>
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
                        <div className="row mt-2">
                            <div className={cx('fif_wrap', 'col c-12 m-12 l-12')}>
                                <label htmlFor="curent-password">
                                    <FormattedMessage id="login.password" />
                                </label>
                                <span>
                                    {hidePassword ? (
                                        <span
                                            className={cx('show-btn')}
                                            onClick={() => {
                                                setHidePassword(false);
                                            }}
                                        >
                                            <EyeHideIcon width="2.2rem" height="2.2rem" />
                                            <p>
                                                <FormattedMessage id="login.hide" />
                                            </p>
                                        </span>
                                    ) : (
                                        <span
                                            className={cx('show-btn')}
                                            onClick={() => {
                                                setHidePassword(true);
                                            }}
                                        >
                                            <EyeShowIcon width="2.2rem" height="2.2rem" />
                                            <p>
                                                <FormattedMessage id="login.show" />
                                            </p>
                                        </span>
                                    )}
                                </span>
                            </div>
                            <div className="col c-12 m-12 l-12">
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
                        <FormattedMessage id="login.login">
                            {(msg) => (
                                <input type="submit" value={msg} className={cx('form-submit')} onClick={handleLogin} />
                            )}
                        </FormattedMessage>
                        <Link className={cx('forgot_pass')} to={config.routes.register}>
                            <FormattedMessage id="login.forgot-password" />
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
