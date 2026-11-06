import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './GameFrame.module.css';

export default function GameFrame({title, src, height = 620}) {
  const basedSrc = useBaseUrl(src);
  const resolvedSrc = /^https?:\/\//.test(src) ? src : basedSrc;
  const gameId = `game-${src.replace(/^https?:\/\//, '').replace(/^\/games\//, '').replace(/\/index\.html$/, '').replace(/\.html$/, '').replace(/\/$/, '').replace(/[^a-zA-Z0-9_-]+/g, '-')}`;

  return (
    <figure id={gameId} className={styles.frame} style={{'--game-height': `${height}px`}}>
      <figcaption className={styles.toolbar}>
        <span className={styles.identity}>
          <span className={styles.status} aria-hidden="true" />
          <span>
            <small>بازی تعاملی</small>
            <strong>{title}</strong>
          </span>
        </span>
      </figcaption>
      <div className={styles.viewport}>
        <iframe
          src={resolvedSrc}
          title={title}
          loading="lazy"
          allow="fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <div className={styles.linkBar} dir="ltr">
        <a href={resolvedSrc} target="_blank" rel="noreferrer">{resolvedSrc}</a>
      </div>
    </figure>
  );
}
