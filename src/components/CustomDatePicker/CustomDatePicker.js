import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { getMonth, getYear } from 'date-fns';
import range from 'lodash/range';
import { useDispatch, useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import './CustomDatePicker.scss';
import * as actions from '~/store/actions';
import { LANGUAGES } from '~/utils';
export default function CustomDatePicker({
    selected,
    onChange,
    typeShow,
    maxDate,
    customInput,
    showIcon,
    isClearable,
}) {
    const [currentDate, setCurrentDate] = useState(new Date(selected));
    const [dateRange, setDateRange] = useState([null, null]);
    const years = range(2010, getYear(new Date()) + 1, 1);
    let listMonth = useSelector((state) => state.admin.arrMonth);
    let language = useSelector((state) => state.app.language);
    const dispatch = useDispatch();
    let months = [];
    useEffect(() => {
        dispatch(actions.fetchMonth());
    }, [dispatch]);
    useEffect(() => {
        if (language === LANGUAGES.VI) {
            listMonth.map((item, index) => {
                months.push(item.valueVI);
            });
        }
        if (language === LANGUAGES.EN) {
            listMonth.map((item, index) => {
                months.push(item.valueEN);
            });
        }
    }, [[], listMonth, language]);

    const onChangeDate = (date) => {
        setCurrentDate(date);
        onChange(date);
    };
    const onChangeDateRange = (updateDate) => {
        setDateRange(updateDate);
        if (updateDate[1]) {
            onChange(updateDate);
        }
    };
    const [subOptions, setSubOptions] = useState({});
    const [startDate, endDate] = dateRange;
    useEffect(() => {
        let object = {};
        if (typeShow && typeShow === 'date') {
            object.dateFormat = 'dd/MM/yyyy';
            object.selected = currentDate;
            object.showMonthYearPicker = false;
            object.onChange = (update) => onChangeDate(update);
        }
        if (typeShow && typeShow === 'month') {
            object.dateFormat = 'MM/yyyy';
            object.showMonthYearPicker = true;
            object.selected = currentDate;
            object.onChange = (date) => onChangeDate(date);
        }
        if (typeShow && typeShow === 'range') {
            object.selected = startDate;
            object.dateFormat = 'dd/MM/yyyy';
            object.showMonthYearPicker = false;
            object.selectsRange = true;
            object.startDate = startDate;
            object.endDate = endDate;
            object.onChange = (update) => onChangeDateRange(update);
        }
        setSubOptions(object);
    }, [typeShow, currentDate, endDate, startDate]);
    return (
        <DatePicker
            className="custom-input-style"
            renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
            }) => (
                <div className="header-custom">
                    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                        {'<'}
                    </button>
                    <select
                        className="custom-select-style"
                        value={getYear(date)}
                        onChange={({ target: { value } }) => changeYear(value)}
                    >
                        {years.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <select
                        className="custom-select-style"
                        value={months[getMonth(date)]}
                        onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
                    >
                        {months.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                        {'>'}
                    </button>
                </div>
            )}
            showIcon={showIcon}
            isClearable={isClearable}
            maxDate={maxDate}
            customInput={customInput}
            {...subOptions}
        />
    );
}
