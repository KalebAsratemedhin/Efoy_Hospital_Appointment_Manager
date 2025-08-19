# Stripe Payment Integration for Efoy Hospital Appointment Manager

This document explains how to set up and use the Stripe payment integration in the Efoy Hospital Appointment Manager project.

## Overview

The Stripe integration allows patients to securely pay for their medical appointments using credit cards, debit cards, and other payment methods supported by Stripe.

## Features

- **Secure Payment Processing**: Uses Stripe's secure payment infrastructure
- **Checkout Sessions**: Redirects users to Stripe's hosted checkout page
- **Payment Intents**: Supports direct payment processing
- **Webhook Handling**: Automatically updates payment and booking statuses
- **Refund Support**: Allows for payment refunds when necessary
- **Receipt Generation**: Provides downloadable and email-able receipts

## Setup Instructions

### 1. Stripe Account Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard:
   - **Publishable Key** (starts with `pk_test_` for test mode)
   - **Secret Key** (starts with `sk_test_` for test mode)
   - **Webhook Secret** (for handling payment events)

### 2. Environment Variables

#### Client (.env file in Efoy-client/)
```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

#### Server (.env file in server/)
```bash
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
FRONTEND_URL=http://localhost:3000
```

### 3. Install Dependencies

#### Client
```bash
cd Efoy-client
npm install @stripe/stripe-js
```

#### Server
```bash
cd server
pip install stripe==8.10.0
```

### 4. Stripe Webhook Configuration

1. In your Stripe Dashboard, go to **Developers > Webhooks**
2. Add a new endpoint with URL: `https://your-domain.com/api/v1/payment/webhook`
3. Select these events to listen for:
   - `checkout.session.completed`
   - `charge.refunded`
4. Copy the webhook signing secret to your server environment variables

## Usage

### For Patients

1. **Book an Appointment**: Navigate to the doctor's profile and book an appointment
2. **Payment**: After booking, you'll be redirected to the payment page
3. **Complete Payment**: Enter your payment details and complete the transaction
4. **Confirmation**: Receive payment confirmation and appointment details

### For Developers

#### Creating a Payment

```typescript
import { useCreateCheckoutSessionMutation } from '../redux/api/paymentAPI';

const [createCheckoutSession] = useCreateCheckoutSessionMutation();

const handlePayment = async () => {
  const paymentData = {
    bookingId: 'booking_id_here',
    amount: 150.00,
    currency: 'USD',
    description: 'Appointment consultation fee'
  };
  
  const result = await createCheckoutSession(paymentData).unwrap();
  // Redirect to Stripe checkout
};
```

#### Checking Payment Status

```typescript
import { useGetPaymentStatusQuery } from '../redux/api/paymentAPI';

const { data: paymentStatus } = useGetPaymentStatusQuery(sessionId);
```

## API Endpoints

### Payment Endpoints

- `POST /api/v1/payment/create-payment-intent` - Create a payment intent
- `POST /api/v1/payment/create-checkout-session` - Create a checkout session
- `POST /api/v1/payment/confirm-payment/{id}` - Confirm a payment
- `GET /api/v1/payment/status/{session_id}` - Get payment status
- `POST /api/v1/payment/refund/{session_id}` - Refund a payment
- `POST /api/v1/payment/webhook` - Handle Stripe webhooks

## Database Models

### Payment Model

```python
class Payment(Document):
    booking_id: str
    patient_id: str
    doctor_id: str
    amount: float
    currency: str
    status: PaymentStatus
    stripe_session_id: Optional[str]
    stripe_payment_intent_id: Optional[str]
    created_at: datetime
    paid_at: Optional[datetime]
```

## Security Features

- **JWT Authentication**: All payment endpoints require valid authentication
- **User Authorization**: Users can only access their own payments
- **Webhook Verification**: Stripe webhook signatures are verified
- **HTTPS Required**: Production deployments require HTTPS
- **Input Validation**: All inputs are validated using Pydantic schemas

## Testing

### Test Cards

Use these test card numbers in development:

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Requires Authentication**: 4000 0025 0000 3155

### Test Mode

- All Stripe operations use test mode by default
- No real charges are made
- Test webhooks can be sent using Stripe CLI

## Production Deployment

### Environment Variables

1. Use production Stripe keys (start with `pk_live_` and `sk_live_`)
2. Set up production webhook endpoints
3. Configure proper CORS origins
4. Use HTTPS for all communications

### Monitoring

1. Monitor Stripe Dashboard for failed payments
2. Set up logging for webhook events
3. Monitor database for payment status updates
4. Set up alerts for failed webhook deliveries

## Troubleshooting

### Common Issues

1. **Webhook Failures**: Check webhook secret and endpoint URL
2. **Payment Declines**: Verify test card numbers and amounts
3. **CORS Errors**: Ensure frontend URL is properly configured
4. **Authentication Errors**: Verify JWT tokens and user permissions

### Debug Mode

Enable debug logging in the server:

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

## Support

For Stripe-specific issues:
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com)

For application-specific issues:
- Check the application logs
- Verify environment variables
- Test with Stripe's test mode first

## License

This integration follows Stripe's terms of service and the project's existing license. 