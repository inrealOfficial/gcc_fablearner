import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Andika } from "next/font/google";
import Image from "next/image";
import { wrap } from "popmotion";

const andika = Andika({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-andika",
});

interface Testimonial {
  id: number;
  imageUrl: string;
  rating: number;
  childAge: number;
}

export const TestimonialsSection = ({ id }: { id?: string }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const testimonials = [
    {
      id: 1,
      imageUrl: "/testimonials/Group-37297.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 2,
      imageUrl: "/testimonials/Group-37295.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 3,
      imageUrl: "/testimonials/Group-37294.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 4,
      imageUrl: "/testimonials/Group-37293.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 5,
      imageUrl: "/testimonials/Group-37292.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 6,
      imageUrl: "/testimonials/Group-37290.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 7,
      imageUrl: "/testimonials/Group-37288.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 8,
      imageUrl: "/testimonials/Group-37289.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 9,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-2021050-rahimashazia.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 10,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210505-shilpas.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 11,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210507-renitadsouza.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 12,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210507-rimpalparakramsinhmahida.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 13,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210507-salinisandeep.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 14,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210508-anukangarajan.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 15,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210508-ganeshsant.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 16,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210508-maruvarasiselvaraj.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 17,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210508-priyankatalati.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 18,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210508-salehasultana.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 19,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210508-samruddhipote.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 20,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210509-deepthihn.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 21,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210514-anujamohan.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 22,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210514-arpitasingh.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 23,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210514-ashasanjaykoli.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 24,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210514-bidishakonwar.png",
      rating: 5,
      childAge: 5,
    },
    {
      id: 25,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210514-deepikaluhurika.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 26,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210514-deeptiyadraprada.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 27,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210514-devnarayan.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 28,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210514-girlyn.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 29,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210514-gowthami.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 30,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210514-himanshigupta.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 31,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210514-jagritinitishahuja.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 32,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210514-keerthigakeerthi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 33,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210514-khadeejausman.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 34,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210514-mahalaxmipillai.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 35,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210514-manjuharo.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 36,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210514-neeloufar.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 37,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210514-nehanand.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 38,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210514-nehaschawla.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 39,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210514-NISHASAHNI.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 40,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210514-pratibhabachu.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 41,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210915-rahimashazia.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 42,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210915-aartimangal.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 43,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210915-fathimaalizehra.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 44,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20210915-yashikatakkar.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 45,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20211001-rahimashazia.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 46,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20211001-aartimangal.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 47,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20211001-fathimaalizehra.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 48,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20211001-yashikatakkar.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 49,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20211015-rahimashazia.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 50,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20211015-aartimangal.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 51,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20211015-fathimaalizehra.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 52,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20211015-yashikatakkar.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 53,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20211101-rahimashazia.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 54,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20211101-aartimangal.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 55,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20211101-fathimaalizehra.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 56,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20211101-yashikatakkar.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 57,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20211115-rahimashazia.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 58,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20211115-aartimangal.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 59,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20211115-fathimaalizehra.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 60,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20211115-yashikatakkar.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 61,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20211201-rahimashazia.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 62,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20211201-aartimangal.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 63,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20211201-fathimaalizehra.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 64,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20211201-yashikatakkar.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 65,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20211215-rahimashazia.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 66,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20211215-aartimangal.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 67,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20211215-fathimaalizehra.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 68,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20211215-yashikatakkar.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 69,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220101-rahimashazia.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 70,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220101-aartimangal.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 71,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220101-fathimaalizehra.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 72,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220101-yashikatakkar.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 73,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220115-rahimashazia.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 74,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220115-aartimangal.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 75,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220115-fathimaalizehra.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 76,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220115-yashikatakkar.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 77,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220201-rahimashazia.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 78,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220201-aartimangal.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 79,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220201-fathimaalizehra.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 80,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220201-yashikatakkar.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 81,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220215-rahimashazia.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 82,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220215-aartimangal.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 83,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220215-fathimaalizehra.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 84,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220215-yashikatakkar.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 85,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220301-rahimashazia.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 86,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220301-aartimangal.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 87,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220301-fathimaalizehra.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 88,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220301-yashikatakkar.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 89,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220315-rahimashazia.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 90,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220315-aartimangal.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 91,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220315-fathimaalizehra.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 92,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220315-yashikatakkar.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 93,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220401-rahimashazia.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 94,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220401-aartimangal.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 95,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220401-fathimaalizehra.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 96,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220401-yashikatakkar.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 97,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220415-rahimashazia.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 98,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220415-aartimangal.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 99,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220415-fathimaalizehra.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 100,
      imageUrl:
        "/testimonials/Set 4/fab-testimonial-trustpilot-20220415-yashikatakkar.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 101,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 102,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 103,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 104,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 105,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 106,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 107,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 108,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 109,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 110,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 111,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 112,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 113,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 114,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 115,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 116,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 117,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 118,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 119,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 120,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 121,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 122,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 123,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 124,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 125,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 126,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 127,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 128,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 129,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 130,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 131,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 132,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 133,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 134,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 135,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 136,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 137,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 138,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 139,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 140,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 141,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 142,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 143,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 144,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 145,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 146,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 147,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 148,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 149,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 150,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 151,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 152,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 153,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 154,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 155,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 156,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 157,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 158,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 159,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 160,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 161,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 162,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 163,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 164,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 165,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 166,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 167,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 168,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 169,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 170,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 171,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 172,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 173,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 174,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 175,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 176,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    {
      id: 177,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-asmamanuashi.png",
      rating: 5,
      childAge: 4,
    },
    {
      id: 178,
      imageUrl:
        "/testimonials/Set 5/fab-testimonial-trustpilot-20210530-fab-testimonial-trustpilot-20210528-bahulashreeperiyasamy.png",
      rating: 5,
      childAge: 3,
    },
    ];

  // Add state for slideshow
  const [[page, direction], setPage] = useState([0, 0]);
  const testimonialIndex = wrap(0, testimonials.length, page);

  // Update slide variants for more elegant animations
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.8,
      filter: "blur(8px)",
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.8,
      filter: "blur(8px)",
    }),
  };

  // Calculate visible testimonials (only 3 at a time with smooth transitions)
  const visibleTestimonials = [
    testimonials[wrap(0, testimonials.length, page - 1)],
    testimonials[wrap(0, testimonials.length, page)],
    testimonials[wrap(0, testimonials.length, page + 1)],
  ];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  // Add this new animation control
  const [[activePage, activeDirection], setActivePage] = useState([0, 0]);

  const slideRight = () => {
    setActivePage([activePage + 1, 1]);
    paginate(1);
  };

  const slideLeft = () => {
    setActivePage([activePage - 1, -1]);
    paginate(-1);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 px-4 bg-white overflow-hidden"
      id={id}
    >
      {/* Simplified Background Effect */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(252,231,243,0.3)_0%,rgba(255,255,255,0)_70%)]" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div className="relative mb-4">
            <span
              className={`
              ${andika.className} 
              relative inline-flex items-center px-6 py-2
              bg-pink-50
              text-pink-600 
              font-semibold 
              text-lg
              tracking-wide 
              rounded-full
              shadow-[0_2px_10px_-2px_rgba(236,72,153,0.2)]
            `}
            >
              Testimonials
            </span>
          </motion.div>

          <div className="mt-4">
            <h2
              className="font-dingdong text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 
              bg-clip-text text-transparent relative inline-block"
            >
              DOES IT REALLY WORK?
            </h2>
          </div>
        </motion.div>

        {/* Updated Card Styles */}
        <div className="relative mt-16">
          <div className="relative max-w-6xl mx-auto px-12">
            {" "}
            {/* Added px-12 for arrow space */}
            {/* Left Arrow Button */}
            <motion.button
              className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 
                bg-white/90 backdrop-blur-sm rounded-full p-2.5 md:p-4
                shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] text-pink-600 hover:text-purple-600
                hover:shadow-[0_4px_20px_-4px_rgba(236,72,153,0.3)] 
                transition-all duration-300
                border border-pink-100
                flex items-center justify-center
                w-10 h-10 md:w-12 md:h-12"
              onClick={slideLeft}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>
            {/* Updated Testimonials Grid with Responsive Layout */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={direction}
            >
              {/* Show all 3 on desktop, but only middle one on mobile */}
              {visibleTestimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.id}-${index}`}
                  className={`
                    group relative
                    ${index !== 1 ? "hidden md:block" : ""}
                  `}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div
                    className="relative bg-white rounded-2xl overflow-hidden
                    shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]
                    hover:shadow-[0_4px_20px_-4px_rgba(236,72,153,0.15)]
                    transition-all duration-500"
                  >
                    {/* Updated Image Container with better mobile handling */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <Image
                        src={testimonial.imageUrl}
                        alt={`Parent Testimonial ${testimonial.id}`}
                        fill
                        priority={index === 1}
                        className={`
                          object-contain
                          transform transition-all duration-700
                          md:object-cover md:object-center
                          ${
                            index !== 1
                              ? "md:group-hover:scale-110 md:group-hover:rotate-1"
                              : ""
                          }
                        `}
                        sizes="(max-width: 768px) 100vw, (max-width: 1536px) 33vw, 400px"
                        quality={90}
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500
                        md:block hidden"
                      />
                    </div>

                    {/* Card Content */}
                    <div className="p-6 bg-white">
                      <div className="flex justify-center space-x-1 text-yellow-400 text-xl mb-3">
                        {Array(testimonial.rating)
                          .fill("★")
                          .map((star, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1, type: "spring" }}
                            >
                              {star}
                            </motion.span>
                          ))}
                      </div>
                      <p
                        className={`${andika.className} text-center text-base font-medium text-gray-700
                        group-hover:text-pink-600 transition-colors duration-300`}
                      >
                        Parent of a {testimonial.childAge}-year-old
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            {/* Right Arrow Button */}
            <motion.button
              className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 
                bg-white/90 backdrop-blur-sm rounded-full p-2.5 md:p-4
                shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] text-pink-600 hover:text-purple-600
                hover:shadow-[0_4px_20px_-4px_rgba(236,72,153,0.3)] 
                transition-all duration-300
                border border-pink-100
                flex items-center justify-center
                w-10 h-10 md:w-12 md:h-12"
              onClick={slideRight}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </div>

          {/* Updated Navigation Dots */}
          <div className="flex justify-center items-center space-x-3 mt-12">
            {[...Array(Math.ceil(testimonials.length / 3))].map((_, index) => (
              <button
                key={index}
                onClick={() => setPage([index * 3, index * 3 > page ? 1 : -1])}
                className={`
                  h-2 rounded-full transition-all duration-500 
                  ${
                    Math.floor(page / 3) === index
                      ? "w-8 bg-pink-500"
                      : "w-2 bg-pink-100 hover:bg-pink-200"
                  }
                `}
                aria-label={`Go to testimonial group ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
