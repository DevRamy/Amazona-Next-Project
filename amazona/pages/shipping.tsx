import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import CheckoutWizard from "../components/checkoutwizard";
import Layout from "../components/layout";
import { actions, Store } from "../utils/Store";

const ShippingScreen = () => {

    const {
        handleSubmit,
        register,
        formState: {errors},
        setValue,
    } = useForm<any>();

    const router = useRouter();
    const {state, dispatch} = useContext(Store);
    const {cart} = state;
    const { shippingAddress } = cart;

    useEffect(() => {
        setValue('fullName',shippingAddress.fullName);
        setValue('address',shippingAddress.address);
        setValue('city',shippingAddress.city);
        setValue('postalCode',shippingAddress.postalCode);
        setValue('country',shippingAddress.country);
    },[setValue,shippingAddress]);

    const SubmitHandler = ({fullName, address, city, postalCode, country}) => {
        dispatch({
            type: actions.SAVE_SHIPPING_ADDRESS,
             payload: {fullName, address, city, postalCode, country},
        });

        router.push('/payment')
    }

    return (
        <Layout>
            <CheckoutWizard activeStep={1} />
            <form className="mx-auto max-w-screen-md" onSubmit={handleSubmit(SubmitHandler)}>
                <h1 className="mb-4 text-xl">Shipping Address</h1>
                <div className="mb-4">
                    <label htmlFor="fullname">Full Name</label>
                    <input 
                     className="w-full" 
                     id="fullName"
                     autoFocus
                     {...register('fullName',{required: 'Please enter full name'})}
                    />
                    {errors.fullname && (<span className="text-red-500">{errors.fullname.message?.toString()}</span>)}
                </div>
                <div className="mb-4">
                    <label htmlFor="address">Address</label>
                    <input 
                     className="w-full" 
                     id="address"
                     autoFocus
                     {...register('address',{
                         required: 'Please enter the address',
                         minLength: {value: 3, message: 'Address must be at least 3 characters'}
                       }
                     )}
                    />
                    {errors.address && (<span className="text-red-500">{errors.address.message?.toString()}</span>)}
                </div>
                <div className="mb-4">
                    <label htmlFor="city">City</label>
                    <input 
                     className="w-full" 
                     id="city"
                     autoFocus
                     {...register('city',{required: 'Please enter the city'})}
                    />
                    {errors.city && (<span className="text-red-500">{errors.city.message?.toString()}</span>)}
                </div>
                <div className="mb-4">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input 
                     className="w-full" 
                     id="postalCode"
                     autoFocus
                     {...register('postalCode',{required: 'Please enter the postal code'})}
                    />
                    {errors.postalCode && (<span className="text-red-500">{errors.postalCode.message?.toString()}</span>)}
                </div>
                <div className="mb-4">
                    <label htmlFor="country">Country</label>
                    <input 
                     className="w-full" 
                     id="country"
                     autoFocus
                     {...register('country',{required: 'Please enter the country'})}
                    />
                    {errors.country && (<span className="text-red-500">{errors.country.message?.toString()}</span>)}
                </div>
                <div className="mb-4 flex justify-between">
                    <button className="primary-button">Next</button>
                </div>
            </form>
        </Layout>
    );
}

ShippingScreen.auth = true;

export default ShippingScreen;