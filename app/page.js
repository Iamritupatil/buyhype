import Header from "@/components/Header";
import StatsFooter from "@/components/StatsFooter";

export default function HomePage() {
  return (
    <>
      <div className="bg">
        <video className="bg-video" autoPlay muted loop playsInline>
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260809_012548_ef22562c-c0ae-4816-ad9d-f8922af4e6a7.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="page">
        <Header />

        <main className="hero">
          <div className="trust-row anim" style={{ "--d": "0.05s" }}>
            <div className="avatar avatar-1">
              <span className="avatar-inner">
                <i className="fa-brands fa-reddit-alien"></i>
              </span>
            </div>
            <div className="avatar avatar-2">
              <span className="avatar-inner">
                <i className="fa-brands fa-github"></i>
              </span>
            </div>
            <div className="avatar avatar-3">
              <span className="avatar-inner">
                <i className="fa-brands fa-x-twitter"></i>
              </span>
            </div>
            <div className="signal-pill">Tracking Signals Across The Internet</div>
          </div>

          <h1 className="headline">
            <span className="headline-line" style={{ "--d": "0.12s" }}>
              Find It Before
            </span>
            <span className="headline-line" style={{ "--d": "0.30s" }}>
              Everyone Hypes It
            </span>
          </h1>

          <p className="subhead anim" style={{ "--d": "0.28s" }}>
            Spot emerging trends, products and business opportunities
            <br />
            before the rest of the internet catches on.
          </p>

          <a href="#" className="cta-btn" style={{ "--d": "0.4s" }}>
            See What&apos;s Rising
          </a>
        </main>

        <StatsFooter />
      </div>
    </>
  );
}
