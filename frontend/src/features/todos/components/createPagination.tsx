import { GrayButton } from "@/components/shared/buttons/buttons";
import { PaginationButton } from "@/components/shared/buttons/paginationButton";

interface PaginationProps {
  totalCount: number;
  PAGE_SIZE: number;
  page: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onChangePage: (ChangePage: number) => void;
}

export const CreatePagination: React.FC<PaginationProps> = ({
  totalCount,
  PAGE_SIZE,
  page,
  onNextPage,
  onPrevPage,
  onChangePage,
}) => {
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const pages = [...Array(totalPages)].map((_, i) => i + 1);

  const getPageItems = () => {
    if (totalPages <= 10) return pages;
    if (page <= 5) return [1, 2, 3, 4, 5, "...", totalPages];
    if (page >= totalPages - 4) return [1, "...", ...pages.slice(-5)];

    return [1, "...", page - 1, page, page + 1, "...", totalPages];
  };

  const pageItems = getPageItems() ?? [];

  return (
    <div className="flex justify-center mt-6 w-full">
      <div className="flex items-center justify-center space-x-2">
        {/* 前へボタン */}
        {page > 1 && <GrayButton label="前へ" onClick={onPrevPage} />}
        {/* ページネーションボタン */}
        <div className="flex justify-center space-x-2">
          {pageItems.map((item, index) =>
            item === "..." ? (
              <span
                key={index}
                className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md cursor-default"
              >
                ...
              </span>
            ) : (
              <PaginationButton
                key={index}
                label={item as number}
                page={item as number}
                currentPage={page}
                onClick={() => onChangePage(item as number)}
              />
            )
          )}
        </div>
        {/* 次へボタン */}
        {page < totalPages && <GrayButton label="次へ" onClick={onNextPage} />}
      </div>
    </div>
  );
};
