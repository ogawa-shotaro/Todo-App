import Link from "next/link";
import type { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="bg-blue-600 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm mt-2">
          <Link href="/todos">&copy; 2025 Todo App. All rights reserved.</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
