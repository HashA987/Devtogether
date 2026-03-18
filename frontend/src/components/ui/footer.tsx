"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" border-t ">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-md text-muted-foreground">
          © 2026 <span className="text-blue-500">Dev</span>
          <span className="text-red-500">Together</span>. All rights reserved.
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-center md:justify-end space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0 text-sm">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/jobs" className="hover:underline">
              Jobs
            </Link>
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-4 justify-center">
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4 1a9 9 0 01-2.88 1.1A4.48 4.48 0 0016.11 0c-2.5 0-4.5 2.04-4.5 4.55 0 .36.04.7.12 1.03A12.94 12.94 0 011.64 1.1a4.51 4.51 0 00-.61 2.29c0 1.58.81 2.97 2.05 3.79a4.52 4.52 0 01-2.04-.56v.06c0 2.2 1.56 4.04 3.62 4.46a4.53 4.53 0 01-2.03.08 4.53 4.53 0 004.22 3.15A9.05 9.05 0 010 19.54a12.8 12.8 0 006.92 2.03c8.3 0 12.84-6.93 12.84-12.94 0-.2-.01-.4-.02-.6A9.22 9.22 0 0023 3z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.44c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.1-.75.08-.74.08-.74 1.22.09 1.87 1.25 1.87 1.25 1.08 1.85 2.83 1.31 3.52 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.64.25 2.86.12 3.16.77.84 1.24 1.91 1.24 3.22 0 4.61-2.82 5.62-5.5 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.69.82.58A12 12 0 0024 12c0-6.63-5.37-12-12-12z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.98 3.5C4.98 5.43 3.41 7 1.5 7S-1.98 5.43-1.98 3.5 1.5 0 3.58 0 4.98 1.57 4.98 3.5zM.04 8.92h4v14h-4v-14zm7.5 0h3.84v2.03h.05c.53-1 1.83-2.03 3.78-2.03 4.05 0 4.8 2.67 4.8 6.14v7.86h-4v-6.97c0-1.66-.03-3.8-2.32-3.8-2.33 0-2.69 1.82-2.69 3.7v7.07h-4v-14z" />
              </svg>
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
