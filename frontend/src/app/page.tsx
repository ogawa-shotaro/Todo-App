import Link from "next/link";

import { GreenButton } from "@/components/shared/buttons/buttons";

export default function TopPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-950 text-white px-4 pt-[12.5rem]">
      <div className="text-center">
        <div className="text-5xl mb-4">
          <span role="img" aria-label="clipboard">
            📋
          </span>{" "}
          <span className="font-bold">Todo App</span>
        </div>
        <h2 className="text-2xl font-semibold mb-2">タスク管理をシンプルに</h2>
        <p className="text-gray-400 mb-6">
          Todoアプリでやるべきことを整理しましょう
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/signup">
            <GreenButton label="サインアップ" />
          </Link>
        </div>
      </div>
    </div>
  );
}
