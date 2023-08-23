import React from 'react';
import styles from './index.module.scss';

const Index = props => {
    const {
        name,
        biography
    } = props;

    return (
        <section className={styles.careerWrapper}>
            <h1>{name}</h1>
            <div className={styles.careerContainer}>
                <div className={styles.careerBiography}>
                    <h3>Biography</h3>
                    <p>{biography}</p>
                </div>
                <div className={styles.careerKnown}>
                    <h3>Known For</h3>
                </div>
            </div>
        </section>
    )
}

export default Index;