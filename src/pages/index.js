import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import GameFrame from '@site/src/components/GameFrame';
import {workshopVolumes} from '@site/src/data/workshopContent';
import styles from './index.module.css';

function ContentImage({src, alt}) {
  return <img className={styles.contentImage} src={useBaseUrl(src)} alt={alt} loading="lazy" />;
}

function ContentBlock({block}) {
  if (block.type === 'game') return <GameFrame {...block} />;
  if (block.type === 'image') return <ContentImage {...block} />;

  if (block.type === 'instruction') {
    return <p className={styles.instruction}><strong>دستورالعمل:</strong> {block.text}</p>;
  }

  if (block.type === 'lines') {
    return <p>{block.lines.map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}</p>;
  }

  if (block.type === 'callout') {
    return (
      <details className={styles.answer}>
        <summary>{block.label.replace('سوال', 'سؤال')}</summary>
        <p>{block.text}</p>
      </details>
    );
  }

  if (block.type === 'calculation') {
    return (
      <div className={styles.calculation} dir="ltr">
        {block.lines.map((line) => <div key={line}><bdi dir="ltr">{line}</bdi></div>)}
      </div>
    );
  }

  if (block.type === 'heading') {
    const HeadingTag = block.level === 3 ? 'h4' : 'h3';
    return <HeadingTag className={styles.sectionHeading}>{block.text}</HeadingTag>;
  }

  if (block.type === 'table') {
    const [head, ...rows] = block.text.split('\n').map((row) => row.split('\t'));
    return (
      <div className={styles.tableScroll}>
        <table className={styles.truthTable}>
          <thead><tr>{head.map((cell) => <th key={cell}>{cell}</th>)}</tr></thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return <p>{block.text}</p>;
}

export default function WorkshopHome() {
  return (
    <Layout
      title="زیر پوست کامپیوتر"
      description="کارگاه تعاملی سخت‌افزار؛ از نمایش داده با صفر و یک تا جمع‌کننده، حافظه و کلاک">
      <a className={styles.skipLink} href="#workshop-content">رفتن به محتوای کارگاه</a>

      <header className={styles.hero} id="top">
        <h1>زیر پوست کامپیوتر</h1>

        <nav className={styles.volumeNav} aria-label="فهرست جلدها">
          {workshopVolumes.map((volume) => (
            <a key={volume.slug} href={`#${volume.slug}`}>
              <span>{volume.number}</span>
              جلد {volume.number}
            </a>
          ))}
        </nav>
      </header>

      <main id="workshop-content" className={styles.workshop}>
        {workshopVolumes.map((volume) => (
          <section id={volume.slug} className={styles.volume} key={volume.slug}>
            <div className={styles.volumeMarker} aria-hidden="true"><span>{volume.number}</span></div>

            <article className={styles.article}>
              <header className={styles.volumeHeader}>
                <h2>{volume.title}</h2>
              </header>

              <div className={styles.prose}>
                {volume.blocks.map((block, index) => (
                  <ContentBlock block={block} key={`${volume.slug}-${index}`} />
                ))}
              </div>
            </article>
          </section>
        ))}
      </main>

    </Layout>
  );
}
