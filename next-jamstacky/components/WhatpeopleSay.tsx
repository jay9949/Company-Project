"use client";

import richText from "@/app/Rich text/richtext";
import client from "@/client/sanity.client";
import React from "react";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "sanity";
import Image from "next/image";
import { urlFor } from "@/imageBuilder/urlFor";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface IWhatSay {
  _id: string;
  testinomialSec: PortableTextBlock[];
  reviewText: string;
  reviewerName: string;
  reviewerLocation: string;
  reviewerImage: string;
  reviews: any;
}

async function getData() {
  const query = `*[_type == 'WhatPeopleSay']{
    _id,
    testinomialSec,
    reviewText,
    reviewerName,
    reviewerLocation,
    reviewerImage,
    reviews
  }`;
  const data = await client.fetch(query);
  return data as IWhatSay[];
}

const WhatpeopleSay = async () => {
  const data = (await getData()) as IWhatSay[];
  // console.log(data);

  const responsive = {
	
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 1,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 1,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
		},
	};

  return (
    <div className="max-w-[90rem] m-auto px-[1rem] my-[4rem] mb:my-[9rem]">
      {data.map((item) => {
        // console.log(item);
        return (
          <div
            key={item._id}
            className=" h-auto md:h-[29rem]  bg-boxgradient p-[1rem] md:p-[4.5rem]"
          >
            <div className="flex items-center mb:items-start justify-between md:flex-row flex-col ">
              <div className="gap-[1rem]  flex flex-col [&>h5]:text-whitecolor [&>h5]:text-[1rem] [&>h5]:font-[700] [&>h5]:font-dmSans [&>h5]:uppercase [&>h5]:tracking-[0.1875rem] [&>h5]:leading-[1.25rem] [&>h5]:text-center [&>h5]:mb:text-left [&>h2]:text-center [&>h2]:mb:text-left [&>h2]:text-[2.25rem] [&>h2]:text-white [&>h2]:font-[700] [&>h2]:leading-[3rem]  [&>h2]:font-dmSans [&>h2]:md:max-w-[21.5625rem] [&>p]:text-[1rem] [&>p]:text-whitecolor [&>p]:leading-[1.75rem] [&>p]:md:max-w-[21.8125rem] [&>p]:max-w-none [&>p]:mb:text-left [&>p]:text-center">
                <PortableText
                  value={item?.testinomialSec}
                  // serializers={richText}
                />
              </div>
              <div className="border-[0.1rem] border-whitecolor w-[0.0625rem] h-[19.375rem] hidden md:block"></div>
              <div className=" w-full md:w-3/5 relative pl-[0] md:pl-24 py-0 pt-4 md:pt-[0] pr-4 md:pr-[0] ">
                <Carousel
                  swipeable={true}
                  draggable={true}
                  showDots={false}
                  arrows={true}
                  responsive={responsive}
                  infinite={true}
                  keyBoardControl={true}
                  slidesToSlide={1}
                       >
                  {item?.reviews.map((list: any) => {
                    console.log(list.reviewerImage);
                    return (
                      <div
                        key={list._key}
                        className=" flex flex-col justify-evenly h-full [&>p]:text-[1rem] [&>p]:lg:text-[1.5rem] [&>p]:text-whitecolor [&>p]:font-[700]  [&>p]:md:max-w-[29.3125rem] [&>p]:text-center [&>p]:mb:text-left "
                      >
                        <PortableText
                          value={list.reviewText}
                          // serializers={richText}
                        />
                        <div className="flex items-center justify-center mb:justify-start gap-[1rem]">
                          <img
                            src={urlFor(list.reviewerImage).url()}
                            alt="image"
                            width={50}
                            height={50}
                          />
                          <div className="flex flex-col">
                            <h3 className="text-[1.5rem] font-dmSans font-[700] text-white leading-[2rem]">
                              {list.reviewerName}
                            </h3>
                            <p className="text-[1rem]  font-[400] text-[#CECECE] leading-[1.75rem]">
                              {list.reviewerLocation}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })} 
                </Carousel>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WhatpeopleSay;
