# Amazon Clone

This is a feature-rich Amazon clone built with **React**, **Firebase**, and **Stripe** for payment processing. The app allows users to browse products, add them to a shopping basket, and proceed to checkout for payment.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Contact](#contact)

---

## Project Overview

The **Amazon Clone** project aims to replicate key functionalities of Amazon, such as user authentication, product browsing, shopping basket management, and secure payment processing using **Stripe**. Firebase is used for backend services including Firestore (database) and Authentication.

---

## Features

- **User Authentication:** Sign In and Sign Up functionality with Firebase.
- **Product Listings:** Display dynamically fetched product data.
- **Shopping Basket:** Add products to a shopping basket and manage them.
- **Order Management:** Track past orders for each user.
- **Payment Processing:** Secure payments using Stripe.
- **Responsive Design:** User-friendly interface for desktop and mobile devices.

---

## Installation

Follow these steps to set up the project locally:

### 1. Clone the Repository
   ```sh
   git clone <repository-url>
   cd amazon-clone


2. **Install Dependencies**
    npm install

3.  **Set up Firebase**
    Create a Firebase project in the Firebase Console.

    Add a web app to your Firebase project and copy the Firebase configuration.

    Create a .env file in the root directory and add your Firebase configuration:

    <!-- REACT_APP_FIREBASE_API_KEY=<your-api-key>
    REACT_APP_FIREBASE_AUTH_DOMAIN=<your-auth-domain>
    REACT_APP_FIREBASE_PROJECT_ID=<your-project-id>
    REACT_APP_FIREBASE_STORAGE_BUCKET=<your-storage-bucket>
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<your-messaging-sender-id>
    REACT_APP_FIREBASE_APP_ID=<your-app-id>
    REACT_APP_FIREBASE_MEASUREMENT_ID=<your-measurement-id> -->

4. **Set up Stripe**
    Create a Stripe account at Stripe.

    Copy your Stripe publishable key and add it to the .env file:

5. **Run the development server:**
    npm start


## Usage
1.  Open your browser and navigate to http://localhost:3000.

2.  Sign up or sign in to your account.

3.  Browse products and add them to your shopping basket.

4.  Proceed to checkout and complete the payment process using Stripe.

## Contributing

    Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code follows the project's coding standards.

## Contact
    If you have any questions or need further assistance, feel free to contact the project maintainer at [travis_locke@icloud.com].