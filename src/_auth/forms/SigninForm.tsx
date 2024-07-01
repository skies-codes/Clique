import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

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
import Loader from "../../components/shared/loading";
import { useToast } from "../../components/ui/use-toast";

import { SigninValidation } from "../../lib/validation/index";
import { useSignInAccount } from "../../lib/react-query/queries";
import { useUserContext } from "../../context";

const SigninForm = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

    // Query
    const { mutateAsync: signInAccount, isPending } = useSignInAccount();

    const form = useForm<z.infer<typeof SigninValidation>>({
        resolver: zodResolver(SigninValidation),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
        const session = await signInAccount(user);

        if (!session) {
            toast({ title: "Login failed. Please try again." });

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
    };

    return (
        <Form {...form}>
            <section className='sm:w-420 w-full px-5 flex-col items-start justify-center relative dark:bg-dark-background'>
                <h1 className='h1 text-primary-500'>Clique</h1>

                <h3 className='h3 mt-5'>Log in to your account</h3>
                <p className='text-base'>
                    Welcome back! Please enter your details.
                </p>
                <form
                    onSubmit={form.handleSubmit(handleSignin)}
                    className='flex flex-col gap-5 w-full mt-4'
                >
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

                    <Button type='submit' className='shad-button_primary'>
                        {isPending || isUserLoading ? (
                            <div className='flex-center gap-2'>
                                <Loader /> Loading...
                            </div>
                        ) : (
                            "Log in"
                        )}
                    </Button>

                    <p className='text-small-regular text-light-2 text-center mt-2'>
                        Don&apos;t have an account?
                        <Link
                            to='/sign-up'
                            className='text-primary-500 text-small-semibold ml-1'
                        >
                            Sign up
                        </Link>
                    </p>
                </form>
            </section>
        </Form>
    );
};

export default SigninForm;
