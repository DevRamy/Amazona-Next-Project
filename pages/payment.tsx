import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import CheckoutWizard from "../components/checkoutwizard";
import Layout from "../components/layout";
import { actions, Store } from "../utils/Store";

const Payment = () => {

    const router = useRouter();

    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { shippingAddress, paymentMethod } = cart;

    const [selectedPaymentMethod,setSelectedPaymentMethod] = useState('');

    const SubmitHandler = (e) => {
        e.preventDefault();

        if(!selectedPaymentMethod){
            return toast.error('Payment method is required');
        }

        dispatch({type: actions.SAVE_PAYMENT_METHOD, payload: selectedPaymentMethod});

        router.push('/placeorder');
    };

    useEffect(() => {

        const backToShipping = () => {
            router.push('/shipping');
        }

        if(!shippingAddress.address){
            return backToShipping();
        }

        setSelectedPaymentMethod(paymentMethod || '');
    },[shippingAddress,setSelectedPaymentMethod,paymentMethod]);

    return (<Layout>
        <CheckoutWizard activeStep={2} />
        <form className="mx-auto max-w-screen-md" onSubmit={SubmitHandler}>
            <h1 className="mb-4 text-xl">Payment Method</h1>
            {
                ['PayPal','Stripe','Cash on delivery'].map((payment) => (
                    <div key={payment} className="mb-4">
                        <input 
                         name="paymentMethod"
                         className="p-2 outline-none focus:ring-0"
                         id={payment}
                         type="radio"
                         checked={selectedPaymentMethod === payment}
                         onChange={() => setSelectedPaymentMethod(payment)}
                        />
                        <label className="p-2" htmlFor={payment}>{payment}</label>
                    </div>
                ))}
                <div className="mb-4 flex justify-between">
                    <button type="button" className="default-button" onClick={() => router.push('shipping')}>Back</button>
                    <button className="primary-button">Next</button>
                </div>
        </form>
    </Layout>);
}

Payment.auth = true;

export default Payment;