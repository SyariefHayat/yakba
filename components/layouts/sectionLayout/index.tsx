const SectionLayout = ({ children }: { children: React.ReactNode}) => {
    return (
        <section className="w-full min-h-screen px-4 md:px-8 lg:px-16 py-16 md:py-24 border">
            {children}
        </section>
    )
}

export default SectionLayout