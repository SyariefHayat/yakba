import Butterfly from "../elements/butterfly";
import Circle from "../elements/circle";
import CloudCenter from "../elements/cloud-center";
import CloudLeft from "../elements/cloud-left";
import CloudRight from "../elements/cloud-right";
import Ellipse from "../elements/ellipse";
import Grass from "../elements/grass";
import LeftLine from "../elements/left-line";
import Pool from "../elements/pool";
import RightLine from "../elements/right-line";
import Stone from "../elements/stone";
import Text from "../elements/text";
import Star from "../elements/star";
import Tree from "../elements/tree";
import TreeLeft from "../elements/tree-left";

const HeroSection = () => {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center bg-[#FFD502] overflow-hidden relative">
      {/* <CloudLeft /> */}
      {/* <CloudCenter /> */}
      {/* <CloudRight /> */}

      {/* <Butterfly /> */}
      {/* <Circle /> */}
      {/* <Tree /> */}
      {/* <TreeLeft /> */}

      {/* <Star className="top-[43%] md:top-[40.5%] lg:top-1/2 lg:left-50" /> */}
      {/* <Star className="top-[28%] left-13 md:top-[25%] md:left-[25%] lg:top-[29%] lg:left-[30%]" /> */}
      {/* <Star className="top-[24%] right-10 md:top-[20%] md:right-40 lg:top-[40%] lg:right-68" /> */}

      <div className="w-full flex items-center justify-center lg:justify-between mt-20">
        <RightLine />
        <Text />
        <LeftLine />
      </div>

      {/* <Pool /> */}

      {/* <Grass className="w-17.25 md:w-25 lg:w-17.25 bottom-65 left-45 md:bottom-70 md:left-100 lg:bottom-10 lg:left-60" /> */}
      {/* <Grass className="w-17.25 md:w-25 lg:w-17.25 bottom-60 right-5 md:bottom-90 md:right-10 lg:bottom-15 lg:right-60" /> */}
      {/* <Grass className="w-17.25 md:w-25 lg:w-17.25 bottom-45 right-25 lg:bottom-30 lg:right-30" /> */}

      {/* <Ellipse /> */}

      {/* <Stone className="w-10 h-7.5 bottom-23 left-20 lg:bottom-30 lg:left-55" /> */}
      {/* <Stone className="w-5 h-5 bottom-22 left-18 lg:bottom-28 lg:left-53" /> */}

      {/* <Stone className="w-10 h-7.5 bottom-25 right-20 lg:bottom-10 lg:right-25" /> */}
      {/* <Stone className="w-5 h-5 bottom-24 right-13 lg:bottom-8.75 lg:right-16.25" /> */}
      {/* <Stone className="w-8 h-8 bottom-30 right-12 lg:bottom-15.75 lg:right-18.25" /> */}
    </section>
  );
};

export default HeroSection;
