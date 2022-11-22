![zavy-icon](https://raw.githubusercontent.com/chingu-voyages/v41-bears-team-32/main/public/favicon.ico)

# Zavy - An eCommerce Marketplace

Zavy is an eCommerce marketplace built by [v41-bears-team-32](https://github.com/chingu-voyages/v41-bears-team-32) ([Chingu.io](https://www.chingu.io/) Voyage 41)

### MVP Features:

- Connect buyers with sellers
- Start selling with 1-Click
- Seller can create their product card with live preview
- Payment processing via Stripe
- Failed or pending payment handling
- Stateful Cart which remembers your selection
- Order tracking and status update

## Preview

![homepage](https://raw.githubusercontent.com/arslanastral/zavy-ecommerce/main/preview/Homepage.png)

![create-product](https://raw.githubusercontent.com/arslanastral/zavy-ecommerce/main/preview/create-product.png)

![product-page](https://raw.githubusercontent.com/arslanastral/zavy-ecommerce/main/preview/product-page.png)

![cart](https://raw.githubusercontent.com/arslanastral/zavy-ecommerce/main/preview/cart.png)

![checkout](https://raw.githubusercontent.com/arslanastral/zavy-ecommerce/main/preview/checkout.png)

![zavy-stripe-integration](https://raw.githubusercontent.com/arslanastral/zavy-ecommerce/main/preview/custom-stripe.png)

![payment-success](https://raw.githubusercontent.com/arslanastral/zavy-ecommerce/main/preview/payment-success.png)

![buyer-orders](https://raw.githubusercontent.com/arslanastral/zavy-ecommerce/main/preview/buyer-order.png)

![buyer-order-page](https://raw.githubusercontent.com/arslanastral/zavy-ecommerce/main/preview/buyer-order-page.png)

![seller-order-page](https://raw.githubusercontent.com/arslanastral/zavy-ecommerce/main/preview/seller-order-page.png)

![seller-order-page-status](https://raw.githubusercontent.com/arslanastral/zavy-ecommerce/main/preview/seller-order-page-status.png)

![buyer-orders-after-status-update](https://raw.githubusercontent.com/arslanastral/zavy-ecommerce/main/preview/buyer-orders-updated-status.png)

![order-with-pending-payment](https://raw.githubusercontent.com/arslanastral/zavy-ecommerce/main/preview/buyer-order-page-pending-payment.png)

![seller-product-dashboard](https://raw.githubusercontent.com/arslanastral/zavy-ecommerce/main/preview/seller-products.png)

![address-book](https://raw.githubusercontent.com/arslanastral/zavy-ecommerce/main/preview/address-book.png)

![login-page](https://raw.githubusercontent.com/arslanastral/zavy-ecommerce/main/preview/login.png)

## Local Development Steps:

### 1️⃣ Database Setup:

This project uses PostgreSQL as the database. The easiest way to install it is using docker. Enter the following command on your terminal if you already have docker installed. This will install and run the latest version of postgreSQL.

$ `docker run --name zavy -e POSTGRES_PASSWORD=password -p 5432:5432 -d --rm postgres`

### 2️⃣ Dependencies Setup

This project uses [pnpm](https://pnpm.io/) for managing dependancies. If you don't already have it installed, install it using `npm install -g pnpm` or choose other available methods [here](https://pnpm.io/installation) and then:

- `git clone` this repo and `cd` into it
- `pnpm install`

#### 🛑 Complete 3️⃣ before continuing...

- `pnpm exec prisma migrate dev` (_Will apply migrations, make sure database setup is completed_)
- `pnpm exec prisma db seed` (_Will seed databse with required data_)
- `pnpm dev`

### 3️⃣ Environment Variables:

`.env.example` file is present in the root directory of project and includes all required envirnoment variables for local development. Following values will get you started:

```
# NEXTAUTH_SECRET can be generated using "openssl rand -base64 32"

DATABASE_URL=postgresql://postgres:password@localhost:5432/postgres
GOOGLE_CLIENT_SECRET=<client-secret>
GOOGLE_CLIENT_ID=<client-id>
FACEBOOK_CLIENT_SECRET=<fb-client-secret>
FACEBOOK_CLIENT_ID=<fb-client-id>
NEXTAUTH_URL=http://localhost:3000/
NEXTAUTH_SECRET=VJ13WCJAjH1SNoLpvUUIWhvk9+cEfsnOMnjssSsvzJQ=
NEXTAUTH_LOGIN=http://localhost:3000/api/login
NEXTAUTH_SIGNUP=http://localhost:3000/api/signup
CLOUDINARY_URL=<cloudinary://[API_KEY]:[API_SECRET]@[CLOUD_NAME]>
STRIPE_SECRET_KEY=<your-test-mode-secret-key>
NEXT_PUBLIC_CURRENT_URL=http://localhost:3000/
CURRENT_ENV=dev
```
