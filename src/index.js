import '@/assets/stylesheets/index.sass';

// Components
import Product from '@/components/Product';
import Rating from '@/components/Rating';

// Fixtures
import productFixtures from '@/components/Product/fixtures';
import ratingFixtures from '@/components/Rating/fixtures';

if ('content' in document.createElement('template')) {
  const root = document.getElementById('application');

  const product = Product(productFixtures[0]);
  root.appendChild(product);

  const rating = Rating(ratingFixtures[0]);
  root.appendChild(rating);
} else {
  console.error('HTML5 templates not supported!');
}
