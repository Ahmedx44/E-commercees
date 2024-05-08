import Logo from "../image/Screenshot from 2024-05-07 14-20-48.png";

function FooterContainer() {
  return (
    <footer className="footer p-16 text-neutral-content bg-indigo-900 w-full">
      <aside>
        <img src={Logo} alt="" className="w-96 rounded-full" />
        <p>
          ACME Industries Ltd.
          <br />
          Providing reliable tech since 1992
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <a>{/* SVG content */}</a>
          <a>{/* SVG content */}</a>
          <a>{/* SVG content */}</a>
        </div>
      </nav>
    </footer>
  );
}

export default FooterContainer;
