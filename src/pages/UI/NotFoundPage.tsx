import PageNotFoundSvg from "@/components/SVGs/PageNotFoundSvg";

const NotFoundPage = () => {
  return (
    <section className="container">
      <div className="flex flex-col items-center md:justify-center justify-stretch  gap-4 w-full h-[calc(100vh-var(--nav-height))]">
        <PageNotFoundSvg />
        <div>
          <h2 className="text-muted-black text-xl mb-2 text-center">
            Page Not Found
          </h2>
          <p className="text-gray-400 max-w-6xl text-center">
            Sorry, The page you are looking for does not exist.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
