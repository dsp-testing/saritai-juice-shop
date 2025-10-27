# End-to-End Tests

This directory contains Cypress end-to-end tests for the OWASP Juice Shop application.

## Test Coverage

The test suite now includes **44 comprehensive E2E test files** covering:

### Authentication & User Management
- `login.spec.ts` - User login, SQL injection challenges
- `register.spec.ts` - User registration, XSS challenges
- `changePassword.spec.ts` - Password change functionality
- `forgotPassword.spec.ts` - Password reset workflow
- `profile.spec.ts` - User profile management
- `totpSetup.spec.ts` - Two-factor authentication setup
- `accountMenu.spec.ts` - Account menu navigation and logout

### Shopping & Cart Management
- `basket.spec.ts` - Shopping basket manipulation
- `shoppingCart.spec.ts` - Cart operations (add, remove, update quantities)
- `search.spec.ts` - Product search functionality
- `productReviews.spec.ts` - Product review creation, viewing, and liking

### Order Management
- `orderHistory.spec.ts` - View past orders
- `orderCompletion.spec.ts` - Complete order workflow end-to-end
- `orderTracking.spec.ts` - Track order status
- `trackOrder.spec.ts` - Order tracking by ID

### Payment & Checkout
- `payment.spec.ts` - Payment method selection and management
- `savedPaymentMethods.spec.ts` - Manage saved credit cards
- `wallet.spec.ts` - Digital wallet functionality
- `b2bOrder.spec.ts` - Business-to-business orders

### Address Management
- `address.spec.ts` - Create and manage shipping addresses
- `savedAddresses.spec.ts` - View, edit, and delete saved addresses
- `delivery.spec.ts` - Select delivery method and speed

### Security & Privacy
- `administration.spec.ts` - Admin panel access
- `privacyPolicy.spec.ts` - Privacy policy viewing
- `dataErasure.spec.ts` - GDPR data erasure request
- `dataExport.spec.ts` - GDPR data export functionality
- `forgedJwt.spec.ts` - JWT token manipulation
- `noSql.spec.ts` - NoSQL injection challenges

### Additional Features
- `about.spec.ts` - About page and company information
- `chatbot.spec.ts` - Chatbot interaction
- `complain.spec.ts` - Customer complaint submission
- `contact.spec.ts` - Contact form submission
- `deluxe.spec.ts` - Deluxe membership functionality
- `directAccess.spec.ts` - Direct file access challenges
- `geoStalking.spec.ts` - Geolocation-based challenges
- `languages.spec.ts` - Multi-language support
- `metrics.spec.ts` - Metrics endpoint exposure
- `photoWall.spec.ts` - Photo wall/memories feature
- `publicFtp.spec.ts` - Public FTP access
- `recycle.spec.ts` - Recycling program functionality
- `redirect.spec.ts` - URL redirection challenges
- `restApi.spec.ts` - REST API interactions
- `scoreBoard.spec.ts` - Challenge scoreboard
- `tokenSale.spec.ts` - Token sale feature

## Running Tests

### Run all tests in headless mode:
```bash
npm run cypress:run
```

### Open Cypress Test Runner (interactive mode):
```bash
npm run cypress:open
```

### Run specific test file:
```bash
npx cypress run --spec "test/cypress/e2e/login.spec.ts"
```

## Test Structure

All tests follow the same pattern:
1. Use `describe()` blocks to group related tests
2. Use `beforeEach()` for setup (e.g., navigation, login)
3. Use `it()` for individual test cases
4. Utilize custom Cypress commands like `cy.login()` and `cy.expectChallengeSolved()`

## Custom Commands

The test suite includes custom commands defined in `test/cypress/support/commands.ts`:
- `cy.login()` - Authenticate as a user
- `cy.expectChallengeSolved()` - Verify a challenge has been solved
- `cy.eachSeries()` - Iterate through arrays sequentially

## Configuration

Test configuration is defined in `cypress.config.ts` at the project root.
