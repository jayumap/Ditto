import { Github, Heart } from 'lucide-react';
import { FOOTER } from '../../constants';

/**
 * Footer with logo, tagline, link columns, GitHub icon, and copyright.
 */
export default function Footer() {
  return (
    <footer className="border-t border-gray-200/60 dark:border-dark-600/30 bg-gray-50/50 dark:bg-dark-800/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4" aria-label="Ditto Home">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-600/20">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Ditto
              </span>
            </a>
            <p className="text-sm text-gray-500 dark:text-dark-400 max-w-xs leading-relaxed">
              {FOOTER.tagline}
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-gray-500 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
          </div>

          {/* Link columns */}
          {FOOTER.columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-500 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-200/60 dark:border-dark-600/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400 dark:text-dark-500">
            {FOOTER.copyright}
          </p>
          <p className="text-sm text-gray-400 dark:text-dark-500 flex items-center gap-1">
            Made with <Heart size={14} className="text-red-500 fill-red-500" /> for developers
          </p>
        </div>
      </div>
    </footer>
  );
}
