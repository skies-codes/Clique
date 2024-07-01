import ThemeToggle from "../components/shared/ThemeToggle";

const RootLayout = () => {
    return (
        <>
            <section className='w-full h-screen flex items-center justify-center flex-col gap-4'>
                <h1 className=' text-[56px]'>Heading 1</h1>
                <h2 className='text-[44px]'>Heading 2</h2>
                <h3 className='text-[32px]'>Heading 3</h3>
                <h1 className='text-[20px]'>Heading 4</h1>
                <h5 className='text-lg'>Subtitle</h5>
                <button className='text-base py-2 px-10 bg-light-destructive dark:bg-dark-destructive text-white rounded-md font-semibold'>
                    Button
                </button>
                <p className='text-base'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Qui, aspernatur?
                </p>
                <p className='text-sm'>Label</p>
                <ThemeToggle />
            </section>
        </>
    );
};

export default RootLayout;
