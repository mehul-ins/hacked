// GalleryDemo.tsx

import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';
import './gallery.css';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const logos = [
  { id: 1, img: 'https://webfiles.amrita.edu/2025/01/olabs-hackthon-img5.jpg', alt: 'Devfolio' },
  { id: 2, img: 'https://p.kindpng.com/picc/s/150-1508990_coding-blocks-logo-png-transparent-png.png', alt: 'Coding Blocks' },
  { id: 3, img: 'https://findlogovector.com/wp-content/uploads/2019/11/matic-network-logo-vector.png', alt: 'Matic Network' },
  { id: 4, img: 'https://static.startuptalky.com/2021/04/codechef-logo-startuptalky.jpg', alt: 'CodeChef' },
  { id: 5, img: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRZJp2HunQvFzux5bBMseqbwlKJVKn3dUosmfoonNTngMrDeFYd', alt: 'HackSociety' },
  { id: 6, img: 'https://vectortemplates.com/images/store-logo/creative-tim-coupons.png', alt: 'Creative Tim' },
  { id: 7, img: 'https://intellyx.com/wp-content/uploads/2019/12/Sentry-intellyx-BC-logo-1200x628-1.png', alt: 'Sentry' },
  { id: 8, img: 'https://gisuser.com/wp-content/uploads/2019/07/Screenshot-2019-07-30-at-2.34.13-PM.png', alt: 'Developer Circles' },
  { id: 9, img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSiWZL0zNvvGf9oLje_lC1-bNzrWdFJ300quyJ9eGYt3G_fb8Lr', alt: 'DU Beat' },
  { id: 10, img: 'https://conference.eurostarsoftwaretesting.com/wp-content/uploads/2023/01/JetBrains-Logo-200x200px.png', alt: 'JetBrains' },
  { id: 11, img: 'https://www.host2boost.com/wp-content/uploads/2019/06/xyz-Domain.png', alt: '.xyz Domain' },
  { id: 12, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlLsJWsUeTGkuGMoQRZQC-6QFk0PTlb7qrww&s', alt: 'i3indya Technologies' },
  { id: 13, img: 'https://www.znetlive.com/images/znetlivelogo-white1.jpg', alt: 'ZNetLive' },
  { id: 14, img: 'https://avatars.githubusercontent.com/u/1582093?s=280&v=4', alt: 'Women Who Code' },
  { id: 15, img: 'https://www.fita.in/wp-content/uploads/2021/12/0179dSC1AqaTy8DbcTJMDYE-7..v1569472044.jpg', alt: 'Amazon Web Services' },
  { id: 16, img: 'https://static1.squarespace.com/static/584d41b3f5e2310b396cd953/60bf470bcc89035b21832288/60bf5223cc89035b2183d4bf/1623160992177/hackster-logo-white-background.png?format=1500w', alt: 'Hackster' },
  { id: 17, img: 'https://s.yimg.com/os/en/globenewswire.com/ce022fe03a0940d9399724ed26015de2', alt: 'Bugsee' },
  { id: 18, img: 'https://www.snowflake.com/adobe/dynamicmedia/deliver/dm-aid--1a1eb335-3218-459e-a631-28a9f5168c14/teksystems%403x.png?preferwebp=true&quality=85', alt: 'TEKsystems' },
  { id: 19, img: 'https://images.yourstory.com/cs/images/companies/257b2753f75e-freestandblacklogo-1650359800339.jpg', alt: 'FreeStand' },
  { id: 20, img: 'https://s3.ap-south-1.amazonaws.com/assets.ynos.in/fund-logos/FUND_001669.png', alt: 'AdvantEdge' },
  { id: 21, img: 'https://cdn.grabon.in/gograbon/images/merchant/1620720459095/inkmonk-logo.jpg', alt: 'InkMonk' },
  { id: 22, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Balsamiq_horizontal_logo.svg/1280px-Balsamiq_horizontal_logo.svg.png', alt: 'Balsamiq' },
  { id: 23, img: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRHJEXLjylDNc23hJXb1W7uB1JXVklSyFS6c7V6yFrJuugi7YMo', alt: 'StockGro' },
  { id: 24, img: 'https://pbs.twimg.com/profile_images/1824315925346066433/g9PzcYAS.jpg', alt: 'AnalytixLabs' },
];

// Split logos into two rows
const row1 = logos.slice(0, Math.ceil(logos.length / 2));
const row2 = logos.slice(Math.ceil(logos.length / 2));

export default function GalleryDemo() {
  return (
    <section className="gallery-demo">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInVariants}
        className="gallery-marquee-wrapper"
      >
        <h2 className="gallery-title">Our Past Sponsors</h2>

        {/* Row 1 — scrolls left */}
        <Marquee
          speed={35}
          direction="left"
          gradient={false}
          pauseOnHover={true}
          className="gallery-marquee-row"
        >
          {[...row1, ...row1].map((logo, index) => (
            <div key={`r1-${logo.id}-${index}`} className="gallery-logo-card">
              <img
                src={logo.img}
                alt={logo.alt}
                className="gallery-logo-img"
                loading="lazy"
              />
            </div>
          ))}
        </Marquee>

        {/* Row 2 — scrolls right */}
        <Marquee
          speed={28}
          direction="right"
          gradient={false}
          pauseOnHover={true}
          className="gallery-marquee-row"
        >
          {[...row2, ...row2].map((logo, index) => (
            <div key={`r2-${logo.id}-${index}`} className="gallery-logo-card">
              <img
                src={logo.img}
                alt={logo.alt}
                className="gallery-logo-img"
                loading="lazy"
              />
            </div>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}