import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContex';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signin, isAuthenticated, authErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/profile");
        }
    }, [isAuthenticated, navigate]);

    const onSubmit = async (data) => {
        const result = await signin(data);
        if (!result.success) {
            console.error('Error en el inicio de sesión:', result.error);
        }
    };

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                <h1 className='text-2xl font-bold'>Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="email"
                        {...register('email', { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Email"
                    />
                    {errors.email && <p className="text-red-500">Email is required</p>}

                    <input
                        type="password"
                        {...register('password', { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Password"
                    />
                    {errors.password && <p className="text-red-500">Password is required</p>}

                    {authErrors && <p className="text-red-500">{authErrors}</p>} {/* Mostrar errores de autenticación */}

                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Login</button>
                </form>
                <p className='flex gap-x-2 justify-between mt-4'>
                    Don't have an account? <Link to="/register" className='text-sky-500'>Sign up</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
