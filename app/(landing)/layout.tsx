import Footer from "@/components/layouts/landingLayout/Footer";
import Navbar from "@/components/layouts/landingLayout/Navbar";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="font-poppins">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default LandingLayout;
