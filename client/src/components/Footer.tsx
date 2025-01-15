const Footer = () => {
  return (
    <footer className="bottom-0 w-full bg-neutral-900 text-neutral-400 py-4">
      <div className="container mx-auto text-center">
        {/* Footer Text */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Momentum. All rights reserved.
          Founded by Joaquin Del Vecchio & Jeronimo Garay.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
