'use client';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import backgorunImage from '/public/photograpy-bg.png'
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import Masonry from "react-masonry-css";
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import type { LightGallery as TypeGallery } from "lightgallery/lightgallery";
import { useRef, useState, useEffect } from "react";
import { Header } from "./components/Header";
import Footer from "./components/Footer";

type ImageData = {
  id: number;
  attributes: {
    alternativeText: string | null;
    caption: string | null;
    createdAt: string;
    ext: string;
    formats: {
      thumbnail: { url: string };
      small: { url: string };
      medium?: { url: string };
    };
    hash: string;
    height: number;
    mime: string;
    name: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: string | null;
    size: number;
    updatedAt: string;
    url: string;
    width: number;
  };
};

type Category = {
  id: number;
  attributes: {
    categoryImageName: string;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
    Images: {
      data: ImageData[];
    };
  };
};
export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const lightBoxRef = useRef<TypeGallery | null>(null);

  useEffect(() => {
    const url = 'https://strapi-photography-t64p.onrender.com/api/category-with-images?populate=*';
    const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

    console.log('Token:', token); 

    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => { 
      console.log(response.status)
      return response.json()
     } )
    .then(data => {
      setCategories(data.data);
      console.log(data.data);
      setIsLoading(false);
    })
    .catch(error => {
      console.error('Error:', error);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div className="w-full h-full flex items-center justify-center ">
      <div className="text-center text-2xl text-bold text-gray-300 h-full flex items-center justify-center z-50">
        Carregando site da gostosa...
      </div>
      <Image 
        src={backgorunImage}
        alt="placeholder"
        className="fixed left-0 top-0 z-0 h-full overflow-auto w-full"
        priority
      />
    </div>;
  }

  return (
    <div className=" w-full h-full bg-top bg-cover overflow-auto">
      <Image 
        src={backgorunImage}
        alt="placeholder"
        className="fixed left-0 top-0 z-0 h-full overflow-auto w-full"
        priority
      />
      <div className="fixed top-0 w-full bg-center bg-cover left-0 z-10 from-stone-900 bg-gradient-to-t overflow-auto"></div>

      <Header />

      <main className="relative pt-[110px] z-20">
        <div className="flex justify-center items-center w-full h-full">
          <TabGroup className="h-full w-full flex items-center flex-col">
            <TabList className="flex items-center gap-12 justify-center w-full">
              {categories?.map((category) => (
                <Tab key={category.id} className="uppercase text-lg data-[selected]:text-white text-stone-600 p-2">
                  {category.attributes.categoryImageName}
                </Tab>
              ))}
            </TabList>
            <TabPanels className=" bg-opacity-80 h-full w-full max-w-[900px] p-2 sm:p-4 my-6 ">
              {categories?.map((category) => (
                <TabPanel key={category.id}>
                  <Masonry className="flex gap-2 md:gap-2" breakpointCols={3}>
                    {category.attributes.Images.data.map((image, idx) => {
                      const imageUrl = `https://strapi-photography-t64p.onrender.com${image.attributes.url}`;
                      console.log('Image URL:', imageUrl); // Verifique se a URL está correta
                      return (
                        <div key={image.id} className="relative">
                            <Image 
                               src={imageUrl}
                               
                               alt={image.attributes.alternativeText || 'Imagem'}
                               className="relative my-2 md:my-2"
                               width={image.attributes.width}
                               height={image.attributes.height}
                             
                             />
                           <div className="absolute bg-transparent hover:bg-stone-900 hover:bg-opacity-10 h-full w-full inset-0 cursor-pointer"
                             onClick={() => {
                               lightBoxRef.current?.openGallery(idx);
                             }}
                           />
                        </div>
                       );
                    })}
                    <LightGallery
                      onInit={(ref) => {
                        if (ref) {
                          lightBoxRef.current = ref.instance;
                        }
                      }}
                      plugins={[lgThumbnail, lgZoom]}
                      speed={500}
                      dynamic
                      dynamicEl={category.attributes.Images.data.map((image) => ({
                        src: `https://strapi-photography-t64p.onrender.com${image.attributes.url}`,
                        thumb: `https://strapi-photography-t64p.onrender.com${image.attributes.url}`
                      }))}
                    />
                  </Masonry>
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>
        </div> 
      </main>
      <Footer />
    </div>
  );
}
