import '@/assets/stylesheets/index.sass';

// Components
import Product from '@/components/Product';
import Rating from '@/components/Rating';

// Fixtures
import productFixtures from '@/components/Product/fixtures';
import ratingFixtures from '@/components/Rating/fixtures';

if ('content' in document.createElement('template')) {
} else {
  console.error('HTML5 templates not supported!');
}
