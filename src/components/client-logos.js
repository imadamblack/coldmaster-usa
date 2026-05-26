import React from "react";
import Image from "next/image";
import SliderContainer, { SliderItem } from "./slider";
import br1 from "../../public/assets/10.jpg";
import br2 from "../../public/assets/11.jpg";
import br3 from "../../public/assets/12.jpg";
import br4 from "../../public/assets/13.jpg";

const ClientLogos = () => (
  <div className="flex items-center justify-center">
    <SliderContainer className="" initialOffsetX={0} contentWidth={1290}>
      <SliderItem width={240}>
        <Image
          src={br1}
          width={2000}
          height={1600}
          alt="logo"
          objectFit="contain"
        />
      </SliderItem>
      <SliderItem width={180}>
        <Image
          src={br2}
          width={2000}
          height={1600}
          alt="logo"
          objectFit="contain"
        />
      </SliderItem>
      <SliderItem width={240}>
        <Image
          src={br3}
          width={2000}
          height={1600}
          alt="logo"
          objectFit="contain"
        />
      </SliderItem>
      <SliderItem width={200}>
        <Image
          src={br4}
          width={2000}
          height={1600}
          alt="logo"
          objectFit="contain"
        />
      </SliderItem>
    </SliderContainer>
  </div>
);

export default ClientLogos;
