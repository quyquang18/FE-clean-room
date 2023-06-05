import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './Search.module.scss';
import { SearchIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Search() {
    return (
        <div>
            <HeadlessTippy
                interactive
                render={(attrs) => <div className={cx('search-result')} tabIndex="-1" {...attrs}></div>}
            >
                <div className={cx('search')}>
                    <input placeholder="Search devices" spellCheck={false}></input>
                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <SearchIcon width="2.0rem" height="2.0rem" />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}
export default Search;
