// import axios from 'axios';
// import { db } from './firebase'; // Import Firestore from your firebase configuration

// const copyProductsToFirestore = async () => {
//   try {
//     const response = await axios.get('https://fakestoreapi.com/products');
//     const products = response.data;

//     const batch = db.batch(); // Use Firestore batch to make multiple writes

//     products.forEach(product => {
//       const docRef = db.collection('products').doc(`${product.id}`);
//       batch.set(docRef, product);
//     });

//     await batch.commit(); // Commit all writes in the batch
//     console.log('Products copied to Firestore successfully.');
//   } catch (error) {
//     console.error('Error copying products to Firestore:', error);
//   }
// };

// copyProductsToFirestore();
