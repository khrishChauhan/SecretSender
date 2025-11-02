"use client";

import React from "react";
import { Mail } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/message.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel as UICarousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const MessageCarousel = () => {
  return (
    <UICarousel
      plugins={[Autoplay({ delay: 1500 })]}
      className="w-full max-w-lg md:max-w-xl"
    >
      <CarouselContent>
        {messages.map((message, index) => (
          <CarouselItem key={index} className="p-4">
            <Card className="bg-gray-900/70 border border-gray-700 shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-indigo-300 font-semibold">
                  {message.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500/20">
                  <Mail className="text-indigo-400" />
                </div>
                <div>
                  <p className="text-gray-200 leading-relaxed">{message.content}</p>
                  <p className="text-xs text-gray-500 mt-1">{message.received}</p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </UICarousel>
  );
};

export default MessageCarousel;
