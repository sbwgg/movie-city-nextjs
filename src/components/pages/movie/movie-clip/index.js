import React, {useEffect} from 'react';
import styles from './index.module.scss';
import Script from 'next/script';
import classNames from 'classnames';

const Index = props => {
    const {clipKey} = props;

    useEffect(() => {
        document.addEventListener('DOMContentLoaded', function() {
            window.addEventListener('message', function(e) {
                if (!e || !e.data) return;
                var q = document.querySelector('[data-yo="quality"]');
                var t = document.querySelector('[data-yo="translate"]');
                if (e.data.quality && q) {
                    q.innerHTML = e.data.quality;
                }
                if (e.data.translate && t) {
                    t.innerHTML = e.data.translate;
                }
            });
        });
    },[])

    return (
        <section className={classNames([styles.clipContainer, 'movie-info-wrapper'])}>
            {/*<iframe width="560" height="315"*/}
            {/*        src={`https://www.youtube.com/embed/${clipKey}`}*/}
            {/*        title="YouTube video player" frameBorder="0"*/}
            {/*        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"*/}
            {/*        allowFullScreen*/}
            {/*/>*/}
            <div id="yohoho" data-videospider_tv="0" data-player="iframe" data-tmdb="35791"></div>

            <Script src="//yohoho.cc/yo.js"/>
        </section>
    )
}

export default Index;
