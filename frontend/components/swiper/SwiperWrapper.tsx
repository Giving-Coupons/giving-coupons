import { useMediaQuery } from '@mui/material';
import React from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperModule } from 'swiper/types';
import { theme } from '../../utils/theme';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type ModuleSelection = {
  navigable?: boolean;
  paginated?: boolean;
};

type Props = ModuleSelection & {
  children: React.ReactNode[];
};

const moduleMap: {
  [key: string]: SwiperModule;
} = {
  navigable: Navigation,
  paginated: Pagination,
};

const convertSelectionToModules = (selection: ModuleSelection): SwiperModule[] => {
  return Object.entries(selection)
    .filter((entry) => entry[1])
    .map(([prop]) => moduleMap[prop]);
};

export default function SwiperWrapper({ children, ...moduleSelection }: Props) {
  const modules = convertSelectionToModules(moduleSelection);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Swiper
      navigation={moduleSelection.navigable}
      modules={modules}
      pagination={moduleSelection.paginated ? { clickable: true } : undefined}
      spaceBetween={50}
      slidesPerView={isMobile ? 1 : 3}
    >
      {children.map((slide, index) => (
        <SwiperSlide key={index}>{slide}</SwiperSlide>
      ))}
    </Swiper>
  );
}
