// GalleryDemo.tsx
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { ZoomParallax } from './Past_Sponsor';

export default function GalleryDemo() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animationId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationId);
      lenis.destroy();
    };
  }, []);

  const images = [
    {
      src: 'https://webfiles.amrita.edu/2025/01/olabs-hackthon-img5.jpg',
      alt: 'Devfolio',
    },
    {
      src: 'https://p.kindpng.com/picc/s/150-1508990_coding-blocks-logo-png-transparent-png.png',
      alt: 'Coding Blocks',
    },
    {
      src: 'https://findlogovector.com/wp-content/uploads/2019/11/matic-network-logo-vector.png',
      alt: 'Matic Network',
    },
    {
      src: 'https://static.startuptalky.com/2021/04/codechef-logo-startuptalky.jpg',
      alt: 'CodeChef',
    },
    {
      src: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRZJp2HunQvFzux5bBMseqbwlKJVKn3dUosmfoonNTngMrDeFYd',
      alt: 'HackSociety',
    },
    {
      src: 'https://vectortemplates.com/images/store-logo/creative-tim-coupons.png',
      alt: 'Creative Tim',
    },
    {
      src: 'https://intellyx.com/wp-content/uploads/2019/12/Sentry-intellyx-BC-logo-1200x628-1.png',
      alt: 'Sentry',
    },
    {
      src: 'https://gisuser.com/wp-content/uploads/2019/07/Screenshot-2019-07-30-at-2.34.13-PM.png',
      alt: 'Developer Circles',
    },
    {
      src: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSiWZL0zNvvGf9oLje_lC1-bNzrWdFJ300quyJ9eGYt3G_fb8Lr',
      alt: 'DU Beat',
    },
    {
      src: 'https://conference.eurostarsoftwaretesting.com/wp-content/uploads/2023/01/JetBrains-Logo-200x200px.png',
      alt: 'JetBrains',
    },
    {
      src: 'https://www.host2boost.com/wp-content/uploads/2019/06/xyz-Domain.png',
      alt: '.xyz Domain',
    },
    {
      src: 'https://media.licdn.com/dms/image/v2/C4D12AQFa3GsFA81G_Q/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1520214148779?e=2147483647&v=beta&t=d7WupLVMPr2aAwfxPxRPqQ2W1i7jucXS5WnBtOM0-0c',
      alt: 'i3indya Technologies',
    },
    {
      src: 'https://www.znetlive.com/images/znetlivelogo-white1.jpg',
      alt: 'ZNetLive',
    },
    {
      src: 'https://avatars.githubusercontent.com/u/1582093?s=280&v=4',
      alt: 'Women Who Code',
    },
    {
      src: 'https://www.fita.in/wp-content/uploads/2021/12/0179dSC1AqaTy8DbcTJMDYE-7..v1569472044.jpg',
      alt: 'Amazon Web Services',
    },
    {
      src: 'https://static1.squarespace.com/static/584d41b3f5e2310b396cd953/60bf470bcc89035b21832288/60bf5223cc89035b2183d4bf/1623160992177/hackster-logo-white-background.png?format=1500w',
      alt: 'Hackster',
    },
    {
      src: 'https://s.yimg.com/os/en/globenewswire.com/ce022fe03a0940d9399724ed26015de2',
      alt: 'Bugsee',
    },
    {
      src: 'https://www.snowflake.com/adobe/dynamicmedia/deliver/dm-aid--1a1eb335-3218-459e-a631-28a9f5168c14/teksystems%403x.png?preferwebp=true&quality=85',
      alt: 'TEKsystems',
    },
    {
      src: 'https://images.yourstory.com/cs/images/companies/257b2753f75e-freestandblacklogo-1650359800339.jpg',
      alt: 'FreeStand',
    },
    {
      src: 'https://s3.ap-south-1.amazonaws.com/assets.ynos.in/fund-logos/FUND_001669.png',
      alt: 'AdvantEdge',
    },
    {
      src: 'https://cdn.grabon.in/gograbon/images/merchant/1620720459095/inkmonk-logo.jpg',
      alt: 'InkMonk',
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Balsamiq_horizontal_logo.svg/1280px-Balsamiq_horizontal_logo.svg.png',
      alt: 'Balsamiq',
    },
    {
      src: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRHJEXLjylDNc23hJXb1W7uB1JXVklSyFS6c7V6yFrJuugi7YMo',
      alt: 'StockGro',
    },
    {
      src: 'https://pbs.twimg.com/profile_images/1824315925346066433/g9PzcYAS.jpg',
      alt: 'AnalytixLabs',
    },
  ];

  return (
    <main className="gallery-demo">
      <div className="gallery-hero">
        <div aria-hidden="true" className="gallery-spotlight" />
        <h1 className="gallery-title">Our Past Sponsors </h1>
      </div>

      {/* Zoom Parallax Section */}
      <ZoomParallax images={images} />
    </main>
  );
}