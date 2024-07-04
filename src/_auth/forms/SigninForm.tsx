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
import { useToast } from "../../components/ui/use-toast";

import { SigninValidation } from "../../lib/validation/index";
import { useSignInAccount } from "../../lib/react-query/queries";
import { useUserContext } from "../../context";
import { PiEyeFill, PiEyeSlashFill } from "react-icons/pi";
import { useState } from "react";
import { cn } from "../../lib/utils";
import Loading from "../../components/loaders/Loading";

const SigninForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
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
                <h1 className='text-5xl text-foreground font-semibold dark:text-dark-foreground'>
                    Clique
                </h1>

                <h3 className='text-2xl mt-10 text-foreground dark:text-dark-foreground'>
                    Log in to your account
                </h3>
                <p className='text-sm text-zinc-500 mt-1'>
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
                                <div className='relative'>
                                    <FormControl>
                                        <Input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            className='shad-input'
                                            {...field}
                                            placeholder='Password'
                                        />
                                    </FormControl>
                                    <div
                                        className=' absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer'
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                    >
                                        {showPassword ? (
                                            <PiEyeFill className='text-foreground dark:text-dark-foreground' />
                                        ) : (
                                            <PiEyeSlashFill className='text-foreground dark:text-dark-foreground' />
                                        )}
                                    </div>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type='submit'
                        className={cn(
                            "w-full text-white bg-primary disabled:cursor-not-allowed disabled:opacity-60"
                        )}
                        disabled={isUserLoading || isPending}
                    >
                        {isPending || isUserLoading ? (
                            <div className='flex-center gap-2'>
                                <Loading text='Loading...' />
                            </div>
                        ) : (
                            "Log in"
                        )}
                    </Button>

                    <p className='text-sm text-foreground dark:text-dark-foreground text-center mt-2'>
                        Don&apos;t have an account?
                        <Link
                            to='/sign-up'
                            className='text-primary text-sm font-semibold ml-1'
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
