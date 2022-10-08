import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import Layout from "../components/layout";

const Login = () => {

    const {handleSubmit,register,formState: {errors}} = useForm<any>(); 

    const SubmitHandler = ({email,password}: {email: string, password: string}) => {
        console.log(email,password);
    }

    return (
        <Layout>
            <form className="mx-auto max-w-screen-md" onSubmit={handleSubmit(SubmitHandler)}>
                <h1 className="mb-4 text-xl">Login</h1>
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
                    } className="w-full" id="email" autoFocus></input>
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
                    <button className="primary-button">Login</button>
                </div>
                <div className="mb-4">
                   {"Don't have an account? "}
                   <Link href="/register">Register</Link>
                </div>
            </form>
        </Layout>
    );
}

export default Login;