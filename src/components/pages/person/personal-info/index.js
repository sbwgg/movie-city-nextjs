import React from 'react';
import styles from './index.module.scss';
import ImageComponent from '@/components/UI/image-component';
import {IMAGE_PATH} from '@/constants';
import Facebook from '@/assets/svg/facebook-icon.svg';
import Twitter from '@/assets/svg/twitter-icon.svg';
import Instagram from '@/assets/svg/instagram-icon.svg';
import UrlIcon from '@/assets/svg/url-icon.svg';

const Index = ({details, social}) => {

    const calculateAge = birthday => {
        const birthdate = new Date(birthday);
        const currentDate = new Date();
        const age = currentDate.getFullYear() -
            birthdate.getFullYear() -
            (
                currentDate < new Date(currentDate.getFullYear(),
                    birthdate.getMonth(), birthdate.getDate()) ? 1 : 0
            );

        return age;
    };

    const calculateDeathAge = (birthdate, deathdate) => {
        const birthDate = new Date(birthdate);
        const deathDate = new Date(deathdate);

        let age = deathDate.getFullYear() - birthDate.getFullYear();

        if (deathDate.getMonth() < birthDate.getMonth() ||
            (deathDate.getMonth() === birthDate.getMonth() && deathDate.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    return (
        <section className={styles.personalInfoWrapper}>
            <div className={styles.personalInfoContainer}>
                <ImageComponent
                    wrapperClass={styles.personalInfoAvatar}
                    src={IMAGE_PATH(details.profile_path)}
                    alt={details.name}
                />
                <div className={styles.personalInfo}>
                    {(details.homepage || social) &&
                        <div className={styles.personalInfoMedia}>
                            {social.facebook_id &&
                                <a
                                    href={`https://www.facebook.com/${social.facebook_id}`}
                                    className="btn btn-secondary"
                                    target="_blank"
                                    rel="noopener"
                                    title="Visit Facebook"
                                >
                                    <ImageComponent src={Facebook} alt="facebook"/>
                                </a>
                            }
                            {social.twitter_id &&
                                <a
                                    href={`https://twitter.com/${social.twitter_id}`}
                                    className="btn btn-secondary"
                                    target="_blank"
                                    rel="noopener"
                                    title="Visit Twitter"
                                >
                                    <ImageComponent src={Twitter} alt="twitter"/>
                                </a>
                            }
                            {social.instagram_id &&
                                <a
                                    href={`https://instagram.com/${social.instagram_id}`}
                                    className="btn btn-secondary"
                                    target="_blank"
                                    rel="noopener"
                                    title="Visit Instagram"
                                >
                                    <ImageComponent src={Instagram} alt="instagram"/>
                                </a>
                            }
                            {details.homepage &&
                                <a
                                    href={details.homepage}
                                    className="btn btn-secondary homepage"
                                    target="_blank"
                                    rel="noopener"
                                    title="Visit Homepage"
                                >
                                    <ImageComponent src={UrlIcon} alt="url icon"/>
                                </a>
                            }
                        </div>
                    }
                    <h3>Personal Info</h3>
                    <ul>
                        <li>
                            <b>Known For</b>
                            <span>{details.known_for_department}</span>
                        </li>
                        <li>
                            <b>Gender</b>
                            <span>{details.gender === 2 ? 'Male' : 'Female'}</span>
                        </li>
                        <li>
                            <b>Birthday</b>
                            <span>
                                {details.birthday}
                                {!details.deathday && <> ({calculateAge(details.birthday)} years)</>}
                            </span>
                        </li>
                        {details.deathday && <li>
                            <b>Day of Death</b>
                            <span>
                                {details.deathday} ({calculateDeathAge(details.birthday, details.deathday)} years)
                            </span>
                        </li>}
                        <li>
                            <b>Place of Birth</b>
                            <span>{details.place_of_birth}</span>
                        </li>
                        <li>
                            <b>Also Known As</b>
                            {details.also_known_as.map((item, index) => <span key={index}>{item}</span>)}
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Index;