import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-shell narrow">
      <div className="hero-card">
        <p className="eyebrow">404</p>
        <h1>That learning page could not be found.</h1>
        <p>The content may have moved, or the slug does not exist in the local repository.</p>
        <Link className="cta-button" href="/">
          Return home
        </Link>
      </div>
    </main>
  );
}
