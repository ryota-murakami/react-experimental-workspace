import { Link } from 'react-router'

import styles from './index.module.css'

/**
 * Experiment catalog data structure
 * Each experiment has a route path and display label
 */
const EXPERIMENTS = [
  { path: '/dnd', label: 'Drag & Drop' },
  { path: '/context', label: 'Context API' },
  { path: '/form', label: 'React Hook Form' },
  { path: '/anime', label: 'CSS Animation' },
  { path: '/modal', label: 'Modal Dialog' },
  { path: '/search', label: 'Search UI' },
  { path: '/windowOpen', label: 'Window Open' },
  { path: '/refcompare', label: 'Ref Compare' },
  { path: '/imageupload', label: 'Image Upload' },
  { path: '/dateform', label: 'Date Form' },
  { path: '/arrayform', label: 'Array Form' },
  { path: '/contextmenu', label: 'Context Menu' },
  { path: '/multi-file-upload', label: 'Multi-File Upload' },
  { path: '/sandbox', label: 'Sandbox' },
  { path: '/tailwindlineclamp', label: 'Line Clamp' },
  { path: '/VIEWTRANSISION', label: 'View Transition' },
  { path: '/mixi', label: 'Mixi' },
] as const

/**
 * GlassCard - Individual experiment link with liquid glass styling
 * @param path - Route path for the experiment
 * @param label - Display label for the experiment
 */
function GlassCard({ path, label }: { path: string; label: string }) {
  return (
    <Link to={path} className={styles.glassCard}>
      <span>{label}</span>
      <span className={styles.cardIcon}>→</span>
    </Link>
  )
}

/**
 * Index - Main landing page with Bluesky-inspired Liquid Glass design
 * Features animated gradient background, glassmorphism containers,
 * and responsive experiment grid
 */
export default function Index() {
  return (
    <div className={styles.pageWrapper}>
      {/* Animated gradient orb */}
      <div className={styles.gradientOrb} aria-hidden="true" />

      {/* Main content */}
      <div className={styles.content}>
        <div className={styles.glassContainer}>
          {/* Header */}
          <header className={styles.header}>
            <div className={styles.logo}>
              <span className={styles.logoIcon} role="img" aria-label="React logo">
                ⚛️
              </span>
            </div>
            <h1 className={styles.title}>React Experimental Workspace</h1>
            <p className={styles.subtitle}>
              A collection of React experiments and UI patterns
            </p>
          </header>

          {/* Experiment Grid */}
          <main className={styles.experimentGrid}>
            {EXPERIMENTS.map(({ path, label }) => (
              <GlassCard key={path} path={path} label={label} />
            ))}
          </main>

          {/* Footer */}
          <footer className={styles.footer}>
            <p>
              Built with React, Vite &amp; Tailwind CSS •{' '}
              <a
                href="https://github.com/ryota-murakami"
                className={styles.footerLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                @ryota-murakami
              </a>
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}
