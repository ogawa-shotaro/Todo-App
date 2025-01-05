import Header from "@/components/shared/header";

export default function TodoPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header currentPage="content" />
      {children}
    </div>
  );
}
