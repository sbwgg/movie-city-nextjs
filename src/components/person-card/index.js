import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';
import ImageComponent from '@/components/UI/image-component';
import NextLink from '@/components/UI/NextLink';
import {IMAGE_PATH} from '@/constants';
import FemaleFallback from '@/assets/svg/female-fallback.svg';
import MaleFallback from '@/assets/svg/male-fallback.svg';

const Index = props => {
    const {
        member,
        secondary
    } = props;

    return (
        <NextLink href="/" className={classNames([
            styles.personItem,
            secondary && 'card-label-hover w-full'
        ])}>
            <figure className={secondary ? styles.personSecondary : styles.personPrimary}>
                {secondary ? (
                    <ImageComponent
                        src={`https://image.tmdb.org/t/p/h632/${member.profile_path}`}
                        fallBackSrc={member.gender === 1 ? FemaleFallback : MaleFallback}
                        width={90}
                        height={135}
                        quality={80}
                        alt={member.name}
                    />
                ) : (
                    <ImageComponent
                        src={IMAGE_PATH(member.profile_path)}
                        fallBackSrc={member.gender === 1 ? FemaleFallback : MaleFallback}
                        width={300}
                        height={450}
                        alt={member.name}
                        className="w-full"
                    />
                )}
                <figcaption className={secondary ? styles.personSecondaryInfo : styles.personPrimaryInfo}>
                    <h4 className="text-oneline">{member.name}</h4>
                    <h5 className="text-oneline">{member.character ? member.character : member.job}</h5>
                </figcaption>
            </figure>
        </NextLink>
    )
}

export default Index;
