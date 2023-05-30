import classNames from 'classnames/bind';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { apiRegisterCompany } from '~/services/userService';
import { path } from '~/utils';
import styles from './RegisterCompany.module.scss';
import * as actions from '~/store/actions';

const cx = classNames.bind(styles);
function RegisterCompany() {
    document.title = 'LUXAS-Register-Company';
    const [error, setError] = useState(1);
    const [message, setMessage] = useState();
    const dispatch = useDispatch();
    const handleRegister = async (data) => {
        dispatch(actions.changeStatusReactLoading(true));
        let response = await apiRegisterCompany(data);
        setMessage(response.message);
        if (response.errCode === 0) {
            dispatch(actions.changeStatusReactLoading(false));
            setError(1);
            reset();
        } else {
            dispatch(actions.changeStatusReactLoading(false));
            setError(0);
        }
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm();

    const isError = Object.keys(errors).length !== 0;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('register-wrapper')}>
                <h2 className={cx('title')}>Sign up for an account</h2>
                <h3 className={cx('link-register-bussiness')}>
                    <Link to={path.REGISTER}>Register for a user account</Link>
                </h3>
                <div className={cx('messError', !error ? 'err' : 'succees')}>{message} </div>
                <form method="get" className={cx('form')} onSubmit={handleSubmit(handleRegister)}>
                    <div className={cx('form-group')}>
                        <fieldset className={cx('username')}>
                            <label forhtml="name" className={cx('form-label')}>
                                Company name
                            </label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Company name"
                                className={cx('form-input')}
                                {...register('name', { required: true })}
                            />
                            {isError && (
                                <span className={cx('form-message')}>
                                    {errors.name?.type === 'required' && 'This field is required'}
                                </span>
                            )}
                        </fieldset>
                    </div>
                    <div className={cx('form-group')}>
                        <fieldset className={cx('address')}>
                            <label forhtml="address" className={cx('form-label')}>
                                Address
                            </label>
                            <input
                                name="address"
                                type="text"
                                placeholder="Company name"
                                className={cx('form-input')}
                                {...register('address', { required: true, minLength: 6 })}
                            />
                            {isError && (
                                <span className={cx('form-message')}>
                                    {errors.address?.type === 'required' && 'This field is required'}
                                    {errors.address?.type === 'minLength' && 'Address must be more than 6 characters'}
                                </span>
                            )}
                        </fieldset>
                    </div>
                    <div className={cx('form-group')}>
                        <fieldset className={cx('phone')}>
                            <label forhtml="phonenumber" className={cx('form-label')}>
                                Phone number
                            </label>
                            <input
                                name="phonenumber"
                                type="text"
                                placeholder="Phone number..."
                                className={cx('form-input')}
                                {...register('phonenumber', {
                                    required: true,
                                    pattern: /^[0-9]+$/,
                                    minLength: 10,
                                })}
                            />
                            {isError && (
                                <span className={cx('form-message')}>
                                    {errors.phonenumber?.type === 'required' && 'This field is required'}
                                    {errors.phonenumber?.type === 'pattern' && 'Phone number must be numeric character'}
                                    {errors.phonenumber?.type === 'minLength' &&
                                        'Phone number must be more than 10 characters'}
                                </span>
                            )}
                        </fieldset>
                    </div>
                    <div className={cx('form-group')}>
                        <fieldset className={cx('email')}>
                            <label forhtml="email" className={cx('form-label')}>
                                Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="VD: email@gmail.com"
                                className={cx('form-input')}
                                {...register('email', {
                                    required: true,
                                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                })}
                            />
                            {isError && (
                                <span className={cx('form-message')}>
                                    {errors.email?.type === 'required' && 'This field is required'}
                                    {errors.email?.type === 'pattern' && 'Please enter the correct email format'}
                                </span>
                            )}
                        </fieldset>
                    </div>
                    <div className={cx('form-group')}>
                        <fieldset className={cx('pass')}>
                            <label forhtml="password" className={cx('form-label')}>
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                className={cx('form-input')}
                                {...register('password', { required: true, minLength: 6 })}
                            />
                            {isError && (
                                <span className={cx('form-message')}>
                                    {errors.password?.type === 'required' && 'This field is required'}
                                    {errors.password?.type === 'minLength' && 'Password must be more than 6 characters'}
                                </span>
                            )}
                        </fieldset>
                    </div>

                    <div className={cx('form-group')}>
                        <fieldset className={cx('pass')}>
                            <label forhtml="password_confirmation" className={cx('form-label')}>
                                Confirm password
                            </label>
                            <input
                                name="password_confirmation"
                                type="password"
                                placeholder="Confirm password"
                                className={cx('form-input')}
                                {...register('confirm_password', {
                                    required: true,
                                    validate: (val) => {
                                        if (watch('password') !== val) {
                                            return 'Your passwords do no match';
                                        }
                                    },
                                })}
                            />
                            {isError && (
                                <span className={cx('form-message')}>
                                    {errors.confirm_password?.type === 'required' && 'This field is required'}
                                    {errors.confirm_password?.type === 'validate' && 'Your passwords do no match'}
                                </span>
                            )}
                        </fieldset>
                    </div>
                    <span className={cx('agree-terms')}>
                        <input type="checkbox" name="agree-terms" value="OK" />
                        Agree with
                        <Link to="#"> terms for users</Link>
                    </span>

                    <button name="register-submit" value="Đăng kí" type="submit" className={cx('form-submit')}>
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisterCompany;
