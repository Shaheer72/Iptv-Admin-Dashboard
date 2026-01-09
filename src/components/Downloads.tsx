"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const downloadItems = [
  {
    title: "Android App",
    caption: "Download Latest Version (v4.0.3)",
    src: "/images/android-logo.png", // Update with actual logo
    link: "https://www.iptvsmarters.com/iptv-smarters-4.0.3.apk",
    icon: "https://img.icons8.com/?size=100&id=17836&format=png&color=ffffff", // Updated to white icon for dark theme
  },
  {
    title: "iOS App",
    caption: "Download Latest Version (v1.0.8)",
    src: "/images/ios-logo.png", // Update with actual logo
    link: "https://apps.apple.com/in/app/smarters-player-lite/id1628995509",
    icon: "https://img.icons8.com/?size=100&id=30840&format=png&color=ffffff", // Updated to white icon for dark theme
  },
  {
    title: "MacOS App",
    caption: "Download Latest Version (v1.0.8)",
    src: "/images/macos-logo.png", // Update with actual logo
    link: "https://www.iptvsmarters.com/download/?download=mac",
    icon: "https://img.icons8.com/?size=100&id=58025&format=png&color=ffffff", // Updated to white icon for dark theme
  },
  {
    title: "Windows App",
    caption: "Download Latest Version (v4.0.3)",
    src: "/images/windows-logo.png", // Update with actual logo
    link: "https://www.iptvsmarters.com/download/?download=windows_app",
    icon: "https://img.icons8.com/?size=100&id=108792&format=png&color=ffffff", // Updated to white icon for dark theme
  },
  {
    title: "Browser Version",
    caption: "Stream directly from your browser",
    src: "/images/browser-logo.png", // Update with actual logo
    link: "http://webtv.iptvsmarters.com/switchuser.php",
    icon: "https://img.icons8.com/?size=100&id=53419&format=png&color=ffffff", // Updated to white icon for dark theme
  },
  {
    title: "Smart TV App",
    caption: "For your Smart TV device",
    src: "/images/smart-tv-logo.png", // Update with actual logo
    link: "https://www.iptvsmarters.com/smarters.apk",
    icon: "https://img.icons8.com/?size=100&id=9989&format=png&color=ffffff", // Updated to white icon for dark theme
  },
];

function DownloadCard({ item, i }: { item: (typeof downloadItems)[number]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: i * 0.05 }}
      whileHover={{ scale: 1.02 }}
      className="group relative overflow-hidden rounded-xl border border-white/10
bg-gradient-to-br from-red-500/20 via-green-500/20 to-blue-500/20
hover:from-red-500/30 hover:via-green-500/30 hover:to-blue-500/30
"
    >
      <div className="flex flex-col items-center justify-center p-4 id='downloads">
        <div className="app-icon mb-3">
          <Image  
            src={item.icon}
            alt={`${item.title} Icon`}
            width={50}
            height={50}
            className="mb-3"
          />
        </div>
        <h4 className="text-xl font-semibold text-white">{item.title}</h4>
        <Image
          src={item.src}
          alt={item.title}
          width={200}
          height={96}
          className="object-contain my-3 h-24 w-full transition-transform duration-500 group-hover:scale-[1.05]"
        />
        <p className="text-sm text-gray-400">{item.caption}</p>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block px-4 py-2 bg-lime-700 text-white rounded-lg hover:bg-lime-600"
        >
          Download Now
        </a>
      </div>
    </motion.div>
  );
}

export default function Downloads() {
  return (
    <section id="downloads" className="mx-auto max-w-7xl px-6 py-20">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">Available Downloads</h2>
        <p className="mt-4 text-gray-400">
          Download our IPTV app for your preferred device and enjoy seamless entertainment.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {downloadItems.map((item, i) => (
          <DownloadCard key={item.title} item={item} i={i} />
        ))}
      </div>
    </section>
  );
}
