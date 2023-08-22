import React from 'react';
import classNames from 'classnames';
import Seo from '@/components/UI/Seo';
import Header from '@/components/header/index';
import Footer from '@/components/footer';
import styles from './index.module.scss';

const Index = props => {
    const {
        title,
        description,
        children,
        image,
    } = props;

    return (
        <>
            <Seo title={title} description={description} image={image}/>
            <main>
                <Header/>
                <div className="page">
                    <div className={classNames([
                        styles.personContainer,
                        'page-container'])}
                    >
                        {children}
                    </div>
                </div>
                <Footer/>
            </main>
        </>
    )
}

export default Index;