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
      <CloudLeft className="absolute w-[42vw] md:w-60 top-8 left-0 md:left-[5%] md:top-10 lg:left-[12%]" />
      <CloudRight className="absolute w-[52vw] md:w-75.5 top-15 -right-[1%] md:top-10 md:-right-[3%]" />
      <CloudCenter className="absolute w-[32vw] md:w-36.75 top-33 -left-[8%] md:left-auto lg:top-32 lg:right-[28%]" />

      <Circle className="absolute w-[50vw] lg:w-[14vw] top-[15%] md:top-[25%] lg:top-[16%] left-[33%] md:left-[30%] lg:left-[40%]" />

      <Tree
        side="left"
        size="sm"
        className="absolute w-[25vw] md:w-[23vw] lg:hidden top-[35%] left-5 md:top-[25%] md:left-[1%]"
      />
      <Tree
        side="right"
        size="sm"
        className="absolute w-[25vw] md:w-[23vw] top-[35%] right-5 md:top-[25%] md:right-[1%] lg:top-[13%] lg:right-[4%]"
      />

      <Star
        delay={1.2}
        className="top-[15%] left-[30%] md:top-[24%] md:left-[32%] lg:top-[50%] lg:left-[12%]"
      />
      <Star
        delay={1.8}
        className="top-[28%] left-[10%] md:top-[37%] md:left-[28%] lg:top-[29%] lg:left-[30%]"
      />
      <Star
        delay={2.4}
        className="top-[24%] right-[12%] md:top-[32%] md:right-[27%] lg:top-[40%] lg:right-[17%]"
      />

      <div className="w-full flex items-center justify-center lg:justify-between mt-32 md:mt-14 lg:mt-20">
        <RightLine />
        <Text />
        <LeftLine />
      </div>

      <Pool className="absolute w-[43vw] md:w-[30vw] bottom-[12%] md:bottom-[18%] lg:bottom-[2%] left-0" />

      <Grass
        delay={1.5}
        skewAmount={15}
        className="absolute cursor-pointer w-[12vw] md:w-[10vw] lg:w-[6vw] bottom-[24%] left-[65%] md:bottom-[30%] md:left-[65%] lg:bottom-[8%] lg:left-[15%]"
      />
      <Grass
        delay={1.8}
        skewAmount={12}
        className="absolute cursor-pointer w-[12vw] md:w-[10vw] lg:w-[6vw] bottom-[20%] right-[5%] md:bottom-[23%] md:right-[8%] lg:bottom-[10%] lg:right-[15%]"
      />
      <Grass
        delay={2.1}
        skewAmount={18}
        className="absolute cursor-pointer w-[12vw] md:w-[10vw] lg:w-[6vw] bottom-[16%] right-[30%] md:bottom-[20%] md:right-[40%] lg:bottom-[18%] lg:right-[8%]"
      />

      <Ellipse
        className="absolute w-[80vw] lg:w-[74vw]
    -bottom-[4%] md:-bottom-[3%] left-auto"
      />

      {/* Cluster kiri */}
      <Stone className="absolute w-[8vw] h-auto bottom-[7%] left-[6%] lg:bottom-[10%] lg:left-[14%]" />
      <Stone className="absolute w-[4vw] h-auto bottom-[6.5%] left-[5%] lg:bottom-[9%] lg:left-[13%]" />

      {/* Cluster kanan */}
      <Stone className="absolute w-[8vw] h-auto bottom-[7.5%] right-[6%] lg:bottom-[3%] lg:right-[6%]" />
      <Stone className="absolute w-[4vw] h-auto bottom-[7%] right-[4%] lg:bottom-[2.5%] lg:right-[4%]" />
      <Stone className="absolute w-[6vw] h-auto bottom-[9%] right-[3.5%] lg:bottom-[5%] lg:right-[4.5%]" />
    </section>
  );
};

export default HeroSection;
