'use client';

import { SmartImage } from '@fck/components/ui';
import Masonry from 'react-masonry-css';
import '@fck/styles/globals.css';
import { gallery } from '@fck/lib/once-ui/content';

export default function MasonryGrid() {
  const breakpointColumnsObj = {
    default: 4,
    1440: 3,
    1024: 2,
    560: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="masonry-grid"
      columnClassName="masonry-grid-column"
    >
      {gallery.images.map((image, index) => (
        <SmartImage
          priority={index < 10}
          sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 25vw"
          key={index}
          radius="m"
          aspectRatio={image.orientation === 'horizontal' ? '16 / 9' : '9 / 16'}
          src={image.src}
          alt={image.alt}
          className="grid-item"
        />
      ))}
    </Masonry>
  );
}
