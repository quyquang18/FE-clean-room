import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';

import styles from './Register.module.scss';
import { path, STAUTUS_COMPANY } from '~/utils';
import { handleGetListCompany, handleRegisterApi } from '~/services/userService';
const cx = classNames.bind(styles);

function Register() {
    document.title = 'LUXAS-Register';
    const [error, setError] = useState(1);
    const [message, setMessage] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [listCompany, setListCompany] = useState([]);
    const [selecedCompany, setSelectedCompany] = useState();
    const getListCompany = useCallback(async () => {
        let res = await handleGetListCompany(STAUTUS_COMPANY.CONFIRMED);
        if (res && res.errCode === 0) {
            setListCompany(buildDataInputSelect(res.data));
        }
    }, []);

    useEffect(() => {
        getListCompany();
    }, [getListCompany]);
    const buildDataInputSelect = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.forEach((item) => {
                result.push({
                    value: item.id,
                    label: item.name,
                });
            });
        }
        return result;
    };
    const handleChangeCompany = (event) => {
        setSelectedCompany(event);
    };
    const handleRegister = async (data) => {
        console.log(data);
        if (selecedCompany) {
            data.companyId = selecedCompany.value;
            setIsLoading(true);
            let response = await handleRegisterApi(data);
            setIsLoading(false);
            setMessage(response.message);
            if (response.errCode === 0) {
                setError(1);
                reset();
            } else {
                setError(0);
            }
        }
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm({ mode: 'onBlur' });

    const isError = Object.keys(errors).length !== 0;
    return (
        <div className={cx('wrapper')}>
            {isLoading && (
                <div className={cx('loader-container')}>
                    <div className={cx('spinner')}></div>
                    <p> Loading. please await</p>
                </div>
            )}
            <div className={cx('register-wrapper')}>
                <h2 className={cx('title')}>
                    <FormattedMessage id="register-user.title" />
                </h2>
                <h3 className={cx('link-register-bussiness')}>
                    <Link to={path.REGISTER_COMPANY}>
                        <FormattedMessage id="register-user.register-business" />
                    </Link>
                </h3>
                <div className={cx('messError', !error ? 'err' : 'succees')}>{message} </div>
                <form method="get" className={cx('form')} onSubmit={handleSubmit(handleRegister)}>
                    <div className={cx('form-group')}>
                        <fieldset className={cx('username')}>
                            <label forhtml="username" className={cx('form-label')}>
                                <FormattedMessage id="register-user.username" />
                            </label>
                            <input
                                name="username"
                                type="text"
                                placeholder="User Name"
                                className={cx('form-input')}
                                {...register('username', {
                                    required: true,
                                    pattern: /^([a-zA-Z0-9._])+$/,
                                    minLength: 6,
                                })}
                            />
                            {isError && (
                                <span className={cx('form-message')}>
                                    {errors.username?.type === 'required' && 'This field is required'}
                                    {errors.username?.type === 'minLength' && 'Username must be more than 6 characters'}
                                </span>
                            )}
                        </fieldset>
                    </div>
                    <div className={cx('form-group')}>
                        <fieldset className={cx('phone')}>
                            <label forhtml="phonenumber" className={cx('form-label')}>
                                <FormattedMessage id="register-user.phone-number" />
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
                        <fieldset className={cx('email')}>
                            <label forhtml="email" className={cx('form-label')}>
                                <FormattedMessage id="register-user.company" />
                            </label>
                            <Select
                                value={selecedCompany}
                                onChange={(event) => handleChangeCompany(event)}
                                options={listCompany}
                            />
                        </fieldset>
                    </div>
                    <div className={cx('form-group')}>
                        <fieldset className={cx('pass')}>
                            <label forhtml="password" className={cx('form-label')}>
                                <FormattedMessage id="register-user.password" />
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
                                <FormattedMessage id="register-user.confirm-password" />
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
                        <FormattedMessage id="register-user.agree" />
                        <Link to="#">
                            <FormattedMessage id="register-user.terms" />
                        </Link>
                    </span>

                    <button name="register-submit" value="Đăng kí" type="submit" className={cx('form-submit')}>
                        <FormattedMessage id="register-user.register" />
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
