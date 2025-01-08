import { useState } from "react";
import Link from "next/link";
import type { FC } from "react";

const HamburgerButton: FC = () => {
  const [menu, setMenu] = useState(false);

  const handleToggleMenu = () => {
    setMenu((state) => !state);
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggleMenu}
        className="flex flex-col justify-center items-center w-8 h-8 bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none mr-4"
      >
        <span className="block  w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
      </button>
      {/* メニューリスト */}
      {menu && (
        <div className="absolute left-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md">
          <ul>
            <li
              className="p-2 border-b hover:bg-gray-200"
              onClick={handleToggleMenu}
            >
              <a>プロフィール</a>
            </li>
            <li
              className="p-2 border-b hover:bg-gray-200"
              onClick={handleToggleMenu}
            >
              <Link href="/users/update">アカウント更新</Link>
            </li>
            <li
              className="p-2 border-b hover:bg-gray-200"
              onClick={handleToggleMenu}
            >
              <a>アカウント削除</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HamburgerButton;
