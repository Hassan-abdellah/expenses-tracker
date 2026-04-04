import UnderConstructionSVG from "@/components/SVGs/UnderConstructionSVG";

const ComingSoonPage = () => {
  return (
    <section className="container">
      <div className="flex flex-col items-center md:justify-center justify-stretch w-full gap-4 h-[calc(100vh-var(--nav-height))]">
        <UnderConstructionSVG />

        <div>
          <h2 className="text-muted-black text-xl mb-2 text-center">
            Comming Soon
          </h2>
          <p className="text-gray-400 max-w-6xl text-center">
            Sorry, This is Page is still Under Construction
          </p>
        </div>
      </div>
    </section>
  );
};

export default ComingSoonPage;
