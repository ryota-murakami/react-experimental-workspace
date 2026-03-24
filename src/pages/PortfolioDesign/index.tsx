/**
 * Portfolio Design experiment page.
 * Implements a dark-themed portfolio design from Figma Community file.
 * @see https://www.figma.com/design/yGh3rpI0jE9x90patbPo7K/Portfolio-Design--Community-
 */

import { Link } from 'react-router'

const P = '/portfolio-design'

const assets = {
  background: `${P}/background.svg`,
  logo: `${P}/logo.svg`,
  profilePhoto: `${P}/profile-photo.png`,
  profileGlow: `${P}/profile-glow.svg`,
  arrow: `${P}/arrow.svg`,
  coverUnderline: `${P}/cover-underline.svg`,
  facebookIcon: `${P}/facebook-icon.png`,
  gradientBlob1: `${P}/gradient-blob-1.svg`,
  gradientBlob2: `${P}/gradient-blob-2.svg`,
  gradientBlob3: `${P}/gradient-blob-3.svg`,
  gradientBlob4: `${P}/gradient-blob-4.svg`,
  learnMoreBtn: `${P}/learn-more-btn.svg`,
  cardIcon1: `${P}/card-icon-1.png`,
  cardIcon2: `${P}/card-icon-2.png`,
  cardIcon3: `${P}/card-icon-3.png`,
  cardIcon4: `${P}/card-icon-4.png`,
  skillIcon1: `${P}/skill-icon-1.png`,
  skillIcon2: `${P}/skill-icon-2.png`,
  skillIcon3: `${P}/skill-icon-3.png`,
  skillIcon4: `${P}/skill-icon-4.png`,
  skillIcon5: `${P}/skill-icon-5.png`,
  skillIcon6: `${P}/skill-icon-6.png`,
  skillIcon7: `${P}/skill-icon-7.png`,
  skillIcon8: `${P}/skill-icon-8.png`,
  skillIcon9: `${P}/skill-icon-9.png`,
  skillIcon10: `${P}/skill-icon-10.png`,
  skillIcon11: `${P}/skill-icon-11.png`,
  skillIcon12: `${P}/skill-icon-12.png`,
  skillIcon13: `${P}/skill-icon-13.png`,
  globe: `${P}/globe.svg`,
  globeGlow: `${P}/globe-glow.svg`,
  globeInner: `${P}/globe-inner.svg`,
  screenshot1: `${P}/screenshot-1.png`,
  screenshot2: `${P}/screenshot-2.png`,
  socialIcons: `${P}/social-icons.svg`,
  clickIcon: `${P}/click-icon.svg`,
} as const

const EXPERIENCE_CARDS = [
  {
    icon: assets.cardIcon1,
    title: 'CIB on the Mobile',
    description:
      'Take your client onboard seamlessly by our amazing tool of digital onboard process.',
    gradient:
      'linear-gradient(138deg, rgb(19,4,40) 20%, rgb(37,16,67) 68%, rgb(56,18,109) 100%)',
  },
  {
    icon: assets.cardIcon4,
    title: 'CIB on the Mobile',
    description:
      'Take your client onboard seamlessly by our amazing tool of digital onboard process.',
    gradient:
      'linear-gradient(106deg, rgb(19,4,40) 1%, rgb(37,16,67) 16%, rgb(56,18,109) 29%, rgb(38,16,69) 46%, rgb(25,6,52) 54%)',
  },
  {
    icon: assets.cardIcon2,
    title: 'CIB on the Mobile',
    description:
      'Take your client onboard seamlessly by our amazing tool of digital onboard process.',
    gradient:
      'linear-gradient(106deg, rgb(19,4,40) 1%, rgb(37,16,67) 16%, rgb(56,18,109) 29%, rgb(38,16,69) 46%, rgb(25,6,52) 54%)',
  },
  {
    icon: assets.cardIcon3,
    title: 'CIB on the Mobile',
    description:
      'Take your client onboard seamlessly by our amazing tool of digital onboard process.',
    gradient:
      'linear-gradient(169deg, rgb(19,4,40) 37%, rgb(37,16,67) 70%, rgb(56,18,109) 98%, rgb(38,16,69) 132%, rgb(25,6,52) 151%)',
  },
] as const

const SKILL_ICONS = [
  assets.skillIcon1,
  assets.skillIcon2,
  assets.skillIcon3,
  assets.skillIcon4,
  assets.skillIcon5,
  assets.skillIcon6,
  assets.skillIcon7,
  assets.skillIcon8,
  assets.skillIcon9,
  assets.skillIcon10,
  assets.skillIcon11,
  assets.skillIcon12,
  assets.skillIcon13,
] as const

function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-[#1a0b2e]/95 px-12 py-6 shadow-[0_6px_22px_-3px_rgba(0,0,0,0.1)] backdrop-blur-sm">
      <img src={assets.logo} alt="Logo" className="h-10 w-9" />
      <nav className="flex gap-16 font-['Plus_Jakarta_Sans'] text-xl font-semibold tracking-wide text-white">
        <a href="#home" className="transition-opacity hover:opacity-80">
          Home
        </a>
        <a href="#about" className="transition-opacity hover:opacity-80">
          About
        </a>
        <a href="#lab" className="transition-opacity hover:opacity-80">
          Lab
        </a>
      </nav>
    </header>
  )
}

function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex items-start gap-8 px-12 pb-16 pt-12"
    >
      {/* Decorative gradient blob */}
      <img
        src={assets.gradientBlob3}
        alt=""
        className="pointer-events-none absolute left-[15%] top-[5%] h-[430px] w-[385px] opacity-60"
      />

      {/* Left: Profile */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="relative">
          <img
            src={assets.profileGlow}
            alt=""
            className="absolute -inset-2 h-[270px] w-[270px]"
          />
          <img
            src={assets.profilePhoto}
            alt="Ibrahim Memon"
            className="relative h-[223px] w-[165px] object-cover"
          />
        </div>
      </div>

      {/* Right: Intro text */}
      <div className="relative z-10 flex flex-col gap-4 pt-4">
        <p className="font-['Preahvihear'] text-[19px] text-white">
          Hello! I Am{' '}
          <span className="text-[#7127ba]">Ibrahim Memon</span>
        </p>

        <img
          src={assets.arrow}
          alt=""
          className="absolute -left-16 top-0 h-[82px] w-[92px] -rotate-[148deg] -scale-y-100"
        />

        <div className="flex flex-col gap-1">
          <p className="font-['Preahvihear'] text-[17px] text-white underline">
            A Designer who
          </p>
          <h2 className="font-['Preahvihear'] text-[50px] leading-[70%] text-white">
            Judges a book
            <br />
            by its <span className="text-[#7127ba]">cover</span>...
          </h2>
          <p className="font-['Preahvihear'] text-[11px] text-white">
            Because if the cover does not impress you what else can?
          </p>
        </div>
      </div>
    </section>
  )
}

function EngineerSection() {
  return (
    <section className="relative px-12 pb-20">
      {/* Decorative gradient blob */}
      <img
        src={assets.gradientBlob1}
        alt=""
        className="pointer-events-none absolute left-[35%] top-0 h-[700px] w-[625px] opacity-40"
      />

      <div className="relative z-10 max-w-[900px]">
        <h1 className="mb-4 font-['Preahvihear'] text-[50px] tracking-wide text-white">
          I'm a Software Engineer.
          <span className="animate-pulse text-[#7127ba]">|</span>
        </h1>

        <div className="mb-6 flex items-center gap-1 font-['Preahvihear'] text-[21px] text-white">
          Currently, I'm a Software Engineer at{' '}
          <img
            src={assets.facebookIcon}
            alt="Facebook"
            className="mx-1 inline-block h-5 w-5"
          />
          <span className="text-[#1877f2]">Facebook</span>,
        </div>

        <p className="font-['Preahvihear'] text-[22px] leading-relaxed tracking-wide text-white">
          A self-taught UI/UX designer, functioning in the industry for
          3+ years now. I make meaningful and delightful digital products
          that create an equilibrium between user needs and business
          goals.
        </p>
      </div>
    </section>
  )
}

function ExperienceCard({
  icon,
  title,
  description,
  gradient,
}: (typeof EXPERIENCE_CARDS)[number]) {
  return (
    <div
      className="relative overflow-hidden rounded-[15px] p-8 shadow-[4px_7px_26px_rgba(0,0,0,0.12)]"
      style={{ backgroundImage: gradient }}
    >
      {/* Top decorative bar */}
      <div className="absolute left-0 top-0 h-2 w-full bg-[#4f228d]" />

      <div className="flex items-start gap-6">
        <img
          src={icon}
          alt=""
          className="h-[92px] w-[92px] shrink-0 rounded object-cover"
        />
        <div className="flex flex-col gap-3">
          <h3 className="font-['Poppins'] text-[26px] font-semibold leading-tight text-white">
            {title}
          </h3>
          <p className="font-['Poppins'] text-sm font-medium leading-relaxed text-white/80">
            {description}
          </p>
          <button
            type="button"
            className="w-fit rounded-full border border-white/30 px-6 py-2 font-['Poppins'] text-[10px] font-medium tracking-wider text-white transition-colors hover:bg-white/10"
          >
            LEARN MORE
          </button>
        </div>
      </div>
    </div>
  )
}

function WorkExperienceSection() {
  return (
    <section className="px-12 pb-24">
      <h2 className="mb-10 font-['Preahvihear'] text-[40px] tracking-wide text-white">
        Work Experience
      </h2>
      <div className="grid grid-cols-2 gap-6">
        {EXPERIENCE_CARDS.map((card, i) => (
          <ExperienceCard key={i} {...card} />
        ))}
      </div>
    </section>
  )
}

function SkillsSection() {
  return (
    <section className="relative flex flex-col items-center px-12 pb-32">
      <div className="mb-10 text-center">
        <p className="font-['Preahvihear'] text-[24px] tracking-wide text-white">
          I'm currently looking to join a{' '}
          <span className="text-[#a362ff]">cross-functional</span> team
        </p>
        <p className="font-['Preahvihear'] text-[17px] tracking-wide text-white">
          that values improving people's lives through accessible design
        </p>
      </div>

      {/* Tech skill icons */}
      <div className="mb-16 flex flex-col items-center gap-4">
        <div className="flex gap-3">
          {SKILL_ICONS.slice(0, 8).map((icon, i) => (
            <div
              key={i}
              className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-[#2c1250]/80"
            >
              <img
                src={icon}
                alt={`Skill ${i + 1}`}
                className="h-7 w-7 object-contain"
              />
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          {SKILL_ICONS.slice(8).map((icon, i) => (
            <div
              key={i}
              className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-[#2c1250]/80"
            >
              <img
                src={icon}
                alt={`Skill ${i + 9}`}
                className="h-7 w-7 object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Globe decoration */}
      <div className="relative h-[350px] w-[550px]">
        <img
          src={assets.globeGlow}
          alt=""
          className="absolute inset-0 h-full w-full object-contain opacity-60"
        />
        <img
          src={assets.globe}
          alt=""
          className="absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2"
        />
        <img
          src={assets.globeInner}
          alt=""
          className="absolute left-1/2 top-[40%] h-[275px] w-[306px] -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </section>
  )
}

function PortfolioProject({
  align,
}: {
  align: 'left' | 'right'
}) {
  const isLeft = align === 'left'
  return (
    <div
      className={`flex items-start gap-8 ${isLeft ? '' : 'flex-row-reverse'}`}
    >
      {/* Text content */}
      <div
        className={`flex max-w-[500px] flex-col gap-3 ${isLeft ? '' : 'items-end text-right'}`}
      >
        <span className="font-['Poppins'] text-base font-semibold tracking-wide text-[#9857d3]">
          Featured Project
        </span>
        <h3 className="font-['Poppins'] text-[34px] font-semibold tracking-wide text-[#ccd6f6]">
          Example Project
        </h3>

        {/* Glass card */}
        <div className="rounded-[14px] border border-white/10 bg-white/5 p-6 backdrop-blur-[40px]">
          <p className="font-['Poppins'] text-lg font-medium leading-relaxed text-[#ccd6f6]">
            A web app for visualizing personalized Spotify data. View
            your top artists, top tracks, recently played tracks, and
            detailed audio information about each track. Create and save
            new playlists of recommended tracks based on your existing
            playlists and more.
          </p>
        </div>

        <div className="flex gap-2">
          <img
            src={assets.clickIcon}
            alt="View project"
            className="h-8 w-8 cursor-pointer opacity-80 transition-opacity hover:opacity-100"
          />
          <img
            src={assets.clickIcon}
            alt="View code"
            className="h-8 w-8 cursor-pointer opacity-80 transition-opacity hover:opacity-100"
          />
        </div>
      </div>

      {/* Screenshot */}
      <div className="relative h-[341px] w-[583px] shrink-0 overflow-hidden rounded-[10px]">
        <img
          src={isLeft ? assets.screenshot1 : assets.screenshot2}
          alt="Project screenshot"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}

function PortfolioSection() {
  return (
    <section className="relative px-12 pb-24">
      {/* Decorative gradient blobs */}
      <img
        src={assets.gradientBlob4}
        alt=""
        className="pointer-events-none absolute right-[10%] top-[10%] h-[720px] w-[642px] opacity-30"
      />
      <img
        src={assets.gradientBlob2}
        alt=""
        className="pointer-events-none absolute left-[5%] top-[60%] h-[641px] w-[572px] opacity-30"
      />

      <div className="relative z-10 flex flex-col gap-24">
        <PortfolioProject align="left" />
        <PortfolioProject align="right" />
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section className="px-12 pb-20">
      <h2 className="mb-8 font-['Preahvihear'] text-[25px] tracking-wide text-white">
        Contact
      </h2>
      <div className="max-w-[700px]">
        <p className="mb-6 font-['Preahvihear'] text-[15px] leading-relaxed tracking-wide text-white">
          I'm currently looking to join a cross-functional team that
          values improving people's lives through accessible design. or
          have a project in mind? Let's connect.
        </p>
        <p className="mb-8 font-['Preahvihear'] text-[15px] tracking-wide text-white">
          ibrhaimmemon930@gmail.com
        </p>
      </div>
      <img
        src={assets.socialIcons}
        alt="Social media links"
        className="h-5 w-28"
      />
    </section>
  )
}

export default function PortfolioDesign() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1a0b2e]">
      {/* Full-page background */}
      <img
        src={assets.background}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      {/* Back to home link */}
      <Link
        to="/"
        className="fixed left-4 top-4 z-[60] rounded-full bg-white/10 px-4 py-2 font-['Poppins'] text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/20"
      >
        ← Back
      </Link>

      <div className="relative z-10 mx-auto max-w-[1200px]">
        <Header />
        <HeroSection />
        <EngineerSection />
        <WorkExperienceSection />
        <SkillsSection />
        <PortfolioSection />
        <ContactSection />
      </div>
    </div>
  )
}
