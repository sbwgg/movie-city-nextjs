import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';
import {motion} from 'framer-motion';
import useScrollDirection from '@/hooks/useScrollDirection';
import NextLink from '@/components/UI/NextLink';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import LanguageSwitch from '@/components/language-switch';
import {useTranslation} from 'next-i18next';
import ThemeSwitch from '@/components/theme-switch';

const Index = () => {
    const {isSticky, isDown} = useScrollDirection();
    const {t} = useTranslation();

    const slideRightVariants = {
        toIn: {
            opacity: 1,
            translateX: 0
        },

        toOut: {
            opacity: 0,
            translateX: '50px'
        }
    };

    return (
        <header className={classNames([styles.header, isSticky ? styles.headerSticky : isDown ? styles.headerDown : ''])}>
            <div className={classNames(styles.headerInner, 'main-container')}>
                <nav className={styles.nav}>
                    <NextLink href="/" className="max-w-[120px]">
                        <motion.svg
                            initial="toOut"
                            animate="toIn"
                            exit="toOut"
                            transition={{type: 'spring', stiffness: 50}}
                            variants={slideRightVariants}
                            width="80" height="80" viewBox="0 0 241 214" fill="none" xmlns="http://www.w3.org/2000/svg"
                        >
                            <path fillRule="evenodd" clipRule="evenodd" d="M232.198 91.5262L221.896 85.5311L240.575 77.704L239.168 70.9993L226.802 60.4966L235.812 56.745L234.399 50.0445L226.965 42.6152L232.703 40.2089L230.929 31.3701L202.824 0L176.207 10.9019L179.675 26.7312L165.765 15.3289L151.547 21.3568L153.109 28.0041L146.567 23.2955L133.616 28.4785L134.177 37.3187L127.125 31.448L112.099 37.7029L116.719 50.1907L104.454 44.0671C100.948 42.5742 94.9096 43.3835 90.9748 45.4452C86.0831 48.0087 81.6233 50.4314 79.377 58.7862L68.9468 54.8556L42.0241 66.1376L42.7296 76.1399L27.8656 71.9385L0.294922 83.6635L17.8277 168.694L77.6133 167.97C79.9977 180.191 82.5024 191.838 84.4534 199.996C85.934 206.188 93.9977 216.095 105.899 213.199C116.179 210.698 143.021 204.345 152.387 202.125C154.575 201.859 156.847 201.218 159.119 200.265C171.192 195.214 176.067 186.703 173.464 174.316L171.75 166.113L177.597 165.968L187.136 161.972L186.132 157.161L197.793 157.508L207.335 153.512L205.463 144.625L223.37 146.807L232.909 142.819L229.488 126.551L232.198 91.5262ZM127.037 33.2828L126.855 33.1255L126.93 33.0968L127.037 33.2828Z" fill="rgb(var(--color-black))"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M127.74 166.258L109.958 173.701L112.813 187.818C113.507 191.205 113.201 194.75 109.317 196.369C105.65 197.897 104.034 195.167 103.326 191.793L93.5643 145.244C92.8547 141.86 93.1623 138.322 96.8182 136.773C100.705 135.16 102.324 137.883 103.04 141.273L105.429 152.679L123.313 145.188L121.411 136.11C117.655 118.19 107.08 118.051 94.0373 123.511C90.4075 125.029 87.0032 127.001 84.1376 129.534L68.7348 56.1434L42.9908 66.9237L47.8046 128.977L47.5818 129.062L27.6947 73.3276L1.39551 84.328L18.7847 167.201L33.1156 161.198L18.2775 90.4447L18.4853 90.349L43.6702 156.782L59.4052 150.195L54.9017 75.1131L55.1136 75.0215L69.953 145.791L76.268 143.151C75.4669 147.143 75.4737 151.753 76.603 157.152L84.4999 194.854C88.4879 213.828 100.259 214.606 112.105 209.637C127.197 203.321 133.28 192.679 130.03 177.195L127.74 166.258ZM123.6 111.508L135.198 166.754L147.125 161.761L135.537 106.527L123.6 111.508ZM170.868 100.848L169.105 92.4695L140.516 104.435L142.272 112.809L150.605 109.327L160.44 156.19L172.367 151.197L162.522 104.337L170.868 100.848ZM202.854 78.3506L191.228 83.2055L191.447 107.008L191.325 107.063L182.323 86.9393L170.694 91.8188L188.134 122.485L192.406 142.818L204.328 137.83L200.056 117.504L202.854 78.3506Z" fill="rgb(var(--color-primary-blue))"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M85.8957 93.6358C88.5562 106.281 96.475 106.77 104.383 103.466C112.28 100.157 118.729 93.6536 116.069 81.0044L110.793 55.8714C108.147 43.2263 100.228 42.7369 92.3365 46.0414C84.441 49.3527 77.977 55.8495 80.6334 68.4946L85.8957 93.6358ZM94.189 54.8911C96.6964 53.8425 97.7834 55.6622 98.255 57.9113L104.763 88.9491C105.241 91.194 105.034 93.5606 102.514 94.6161C100.006 95.662 98.925 93.845 98.4478 91.5932L91.9304 60.554C91.4738 58.3105 91.6789 55.9411 94.189 54.8911ZM148.939 83.6225L145.906 24.8049L134.775 29.4683L138.53 74.2204L138.389 74.2901L126.58 32.8836L113.796 38.247L133.291 90.1782L148.939 83.6225ZM176.416 72.1245L164.84 16.8793L152.904 21.8695L164.501 77.112L176.416 72.1245ZM213.909 56.4265L212.144 48.0566L199.367 53.4077L195.597 35.406L207.939 30.2299L206.187 21.8586L193.839 27.0279L191.295 14.9229L204.085 9.56759L202.318 1.18811L177.617 11.5309L189.202 66.7733L213.909 56.4265Z" fill="rgb(var(--color-primary-blue))"/>
                        </motion.svg>
                    </NextLink>
                    <div className={styles.navInner}>
                        <div className="flex items-center gap-2">
                            <LanguageSwitch/>
                            <div className="flex items-center h-[fit-content] gap-4">
                                <Input id="search" placeholder={`${t('search')}...`}/>
                                <Button design="primary">{t('search')}</Button>
                            </div>
                        </div>
                        <ThemeSwitch/>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Index;
