import Link from "next/link";

export default function NotFound() {
  return <section className="container page-intro not-found"><p className="eyebrow">404 / Off the map</p><h1>This page<br />isn’t <span className="orange-text">here.</span></h1><p>The link may have changed. The projects are still on the shelf.</p><Link href="/" className="button button-ink">Back to the studio <span aria-hidden="true">↗</span></Link></section>;
}
