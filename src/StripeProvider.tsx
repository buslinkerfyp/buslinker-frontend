import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51PMwlDAGD0UqVVszN7LmrkQcOgDawiQREbBAUNSt8Rtfft3i4eUjSd4oVvLXCrUqrUP0NxHSjvvwSNqEJfpSMEOx00R81f7ZPj');

const StripeProvider = ({ children }: any) => {

    const appearance: any = {
        theme: 'stripe',
        variables: {
            colorPrimary: '#0a101d',
            colorBackground: '#fff',
            colorText: '#353535',
            colorDanger: '#df1b41',
        },
        rules: {
            '.Input': {
                borderColor: '#353535',
                color: '#0a101d',
                borderRadius: '4px',
                fontSize: '32px',
            },
            '.Label': {
                color: '#0a101d',
                fontSize: '32px',
            },
        },
    };

    return <Elements stripe={stripePromise} options={{ appearance: appearance }}>{children}</Elements>;
};
export default StripeProvider;