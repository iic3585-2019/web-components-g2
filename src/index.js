import '@/assets/stylesheets/index.sass';

// Components
import Product from '@/components/Product';
import Rating from '@/components/Rating';

window.onload = () => {
  const root = document.getElementById('application');

  if ('content' in document.createElement('template')) {
    const product = Product({
      discount: '38%',
      image:
        'https://media.tracfone.com/wps/contenthandler/dav/content/libraries/wcm.library.phones/components/STSAS367VCP/wcm.comps.image/st_ecom_large_1.png',
      name: 'Nokia',
      prices: {
        creditCard: '49.990',
        online: '59.990',
        normal: '79.990',
      },
    });

    root.appendChild(product);

    const rating = Rating({ maxValue: 5, currentValue: 3 });

    root.appendChild(rating);
  } else {
    console.error('HTML5 templates not supported!');
  }
};
