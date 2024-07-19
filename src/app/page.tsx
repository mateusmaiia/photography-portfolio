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
    const token = '67080b602e8c0562fcedc61a9c305f2dc08a2fc7c69f79837e2f3e5d4d08f0b138db9675f1228ce5334e2dcd070cf3efda7ad1e5b4448b65247bed4d7912f519b110403ced1121bbb1737899b7b24d642fe9be23bb64b8431328056356e7c650bc29d3bc7fcb580659048bd4ab8ad491e3e2c8736cc24d45f7697cad4cd66254';

    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setCategories(data.data);
      setIsLoading(false);
    })
    .catch(error => {
      console.error('Error:', error);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" w-full h-full bg-top bg-cover overflow-auto">
      <Image 
        src={backgorunImage}
        alt="placeholder"
        className="fixed left-0 top-0 z-0"
        priority
      />
      <div className="fixed top-0 left-0 z-10 from-stone-900 bg-gradient-to-t overflow-auto"></div>

      <header className=" px-10 fixed w-full z-10 top-0 text-white flex justify-between items-center h-[90px]">
        <div className="hidden">hm</div>
        <div className="uppercase text-lg font-medium">Bruna Brasil</div>
        <Link href="#" className="rounded-3xl bg-white text-stone-700 px-3 py-2 text-md hover:bg-opacity-90">
          Get in touch
        </Link>
      </header>
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
                  <Masonry className="flex gap-4" breakpointCols={3}>
                    {category.attributes.Images.data.map((image, idx) => {
                      const imageUrl = `http://localhost:1337${image.attributes.url}`;
                      return (
                        <Image 
                          src={imageUrl}
                          key={image.id}
                          alt={image.attributes.alternativeText || 'Imagem'}
                          className="my-4 bg:hover:"
                          width={image.attributes.width}
                          height={image.attributes.height}
                          onClick={() => {
                            lightBoxRef.current?.openGallery(idx);
                          }}
                        />
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
                        src: `http://localhost:1337${image.attributes.url}`,
                        thumb: `http://localhost:1337${image.attributes.url}`
                      }))}
                    />
                  </Masonry>
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>
        </div> 
      </main>
      <footer className="relative mt-10 text-white h-[90px] text-lg uppercase font-medium flex items-center justify-center">
        <p>Photography Portfolio</p>
      </footer>
    </div>
  );
}
