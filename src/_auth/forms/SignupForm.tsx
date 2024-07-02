import * as z from "zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../../components/ui/use-toast";
import { SignupValidation } from "../../lib/validation";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import Loader from "../../components/shared/Loader";
import { cn } from "../../lib/utils";
import {
    useCreateUserAccount,
    useSignInAccount,
} from "../../lib/react-query/queries";
import { useUserContext } from "../../context";

const SignupForm = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const {
        checkAuthUser,
        isLoading: isUserLoading,
        setIsLoading,
    } = useUserContext();

    const form = useForm<z.infer<typeof SignupValidation>>({
        resolver: zodResolver(SignupValidation),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
        },
    });

    // Tanstack-Queries
    const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
        useCreateUserAccount();
    const { mutateAsync: signInAccount, isPending: isSigningInUser } =
        useSignInAccount();

    // HandleSignup
    const handleSignup = async (user: z.infer<typeof SignupValidation>) => {
        try {
            setIsLoading(true);
            const newUser = await createUserAccount(user);

            if (!newUser) {
                toast({ title: "Sign up failed. Please try again." });

                return;
            }

            const session = await signInAccount({
                email: user.email,
                password: user.password,
            });

            if (!session) {
                toast({
                    title: "Something went wrong. Please login your new account",
                });

                navigate("/sign-in");

                return;
            }

            const isLoggedIn = await checkAuthUser();

            if (isLoggedIn) {
                form.reset();

                navigate("/");
            } else {
                toast({ title: "Login failed. Please try again." });

                return;
            }
        } catch (error) {
            console.log({ error });
        }
    };

    return (
        <Form {...form}>
            <section className='w-full sm:w-420 px-5 flex flex-col items-start justify-center dark:bg-dark-background'>
                <h1 className='h1 text-primary-500'>Clique</h1>

                <h4 className='h4 whitespace-nowrap'>
                    Join Our Exclusive Community!
                </h4>
                <p className='text-sm text-gray-400'>
                    To use clique, Please enter your details
                </p>

                <form
                    onSubmit={form.handleSubmit(handleSignup)}
                    className='flex flex-col gap-5 w-full mt-10'
                >
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type='text'
                                        className='shad-input'
                                        {...field}
                                        placeholder='Name'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='username'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type='text'
                                        className='shad-input'
                                        {...field}
                                        placeholder='Username'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type='text'
                                        className='shad-input'
                                        {...field}
                                        placeholder='Email'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type='password'
                                        className='shad-input'
                                        {...field}
                                        placeholder='Password'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type='submit'
                        className={cn(
                            "btn w-full bg-gradient-to-r from-purple-500 to-purple-900 disabled:cursor-not-allowed disabled:opacity-80"
                        )}
                    >
                        {isUserLoading ? (
                            <div className='flex-center gap-2'>
                                <Loader /> Loading...
                            </div>
                        ) : (
                            "Create My Account"
                        )}
                    </Button>

                    <p className='text-sm text-light-2 text-center mt-2'>
                        Already have an account?
                        <Link
                            to='/sign-in'
                            className='text-primary-500 font-semibold ml-1'
                        >
                            Log in
                        </Link>
                    </p>
                </form>
            </section>
        </Form>
    );
};

export default SignupForm;
