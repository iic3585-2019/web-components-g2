import '@/assets/stylesheets/index.sass';

// Components
import Product from '@/components/Product';
import Rating from '@/components/Rating';
import Narvar from '@/components/Narvar';

// Fixtures
import productFixtures from '@/components/Product/fixtures';
import ratingFixtures from '@/components/Rating/fixtures';
import narvarFixtures from '@/components/Narvar/fixtures';

if ('content' in document.createElement('template')) {
} else {
  console.error('HTML5 templates not supported!');
}
