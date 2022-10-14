import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import {signIn, useSession} from 'next-auth/react';
import Layout from "../components/layout";
import { getError } from "../utils/functions/errors";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";

const Login = () => {

    const {data: session} = useSession();
    const router = useRouter();
    const {redirect} = router.query;

    useEffect(() => {
        if(session?.user){
            router.push(redirect?.toString() || '/');  
        }
    },[session, router, redirect]);

    const {handleSubmit,register, getValues,formState: {errors}} = useForm<any>(); 

    const SubmitHandler = async ({name,email,password}: {name: string, email: string, password: string}) => {
        try{

            const newUser = {
                name,
                email,
                password,
            };

            await axios.post('/api/auth/signup',newUser);

            const result = await signIn('credentials',{
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                toast.error(result.error);
            }
        } catch(e){
            toast.error(getError(e));
        }
    }

    return (
        <Layout>
            <form className="mx-auto max-w-screen-md" onSubmit={handleSubmit(SubmitHandler)}>
                <h1 className="mb-4 text-xl">Sign Up</h1>
                <div className="mb-4">
                    <label htmlFor="name">Name</label>
                    <input type="text"
                    {...register('name',
                      {required: "Please enter your name",
                      })
                    } className="w-full" id="name" autoFocus></input>
                    {errors.name && <span className="text-red-500">{`${errors.name.message}`}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="email">Email</label>
                    <input type="email" 
                    {...register('email',
                      {required: "Please enter email",
                       pattern: {
                           value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[z-zA-Z0-9-.]+$/i,
                           message: "Please enter valid email"
                           }
                      })
                    } className="w-full" id="email"></input>
                    {errors.email && <span className="text-red-500">{`${errors.email.message}`}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password">Password</label>
                    <input type="password" 
                    {...register('password',{
                        required: 'Please enter password',
                        minLength: {value: 8, message: 'Password should be more than 7 char'}
                       }
                    )}
                    className="w-full" id="password" autoFocus></input>
                    {errors.password && <span className="text-red-500">{`${errors.password.message}`}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" 
                    {...register('confirmPassword',{
                        required: 'Please confirm the password',
                        validate: (value) => value === getValues('password'),
                       }
                    )}
                    className="w-full" id="confirmPassword" autoFocus></input>
                    {errors.confirmPassword && <span className="text-red-500">{`${errors.confirmPassword.message}`}</span> }
                    {errors.confirmPassword && errors.confirmPassword.type === 'validate' && <span className="text-red-500">Password does not match</span>}
                </div>
                <div className="mb-4">
                    <button className="primary-button">Sign up</button>
                </div>
            </form>
        </Layout>
    );
}

export default Login;