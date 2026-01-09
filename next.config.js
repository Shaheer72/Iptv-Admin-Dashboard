/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
        port: '',
        pathname: '/**'
      }
    ]
    ,
    // Disable server-side image optimization for remote images to avoid
    // upstream timeouts when the remote host is slow or blocks requests.
    unoptimized: true
  }
};
