import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContex';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signup, authErrors } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const success = await signup(values);
        if (!success) {
          navigate('/login');
        }[isAuthenticated, navigate];
    };

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md p-10 rounded-md">
                <h1 className='text-2xl font-bold'>Register</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" 
                        {...register('username', { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Username"
                    />
                    {errors.username && <p className="text-red-500">Username is required</p>}
                    <input type="email"
                        {...register('email', { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Email"
                    />
                    {errors.email && <p className="text-red-500">Email is required</p>}
                    <input type="password"
                        {...register('password', { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Password"
                    />
                    {errors.password && <p className="text-red-500">Password is required</p>}
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        Register
                    </button>
                </form>
                <p className='flex gap-x-2 justify-between mt-4'>
                    You have an account? <Link to="/login" className='text-sky-500'>Sign in</Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
