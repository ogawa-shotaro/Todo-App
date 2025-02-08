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

  return (
    <div className="flex justify-center mt-6 w-full">
      <div className="flex items-center justify-center space-x-2">
        {/* 前へボタン */}
        {page > 1 && <GrayButton label="前へ" onClick={onPrevPage} />}
        {/* ページネーションボタン */}
        <div className="flex justify-center space-x-2">
          {pages.map((_page, index) => (
            <PaginationButton
              key={index}
              label={_page}
              page={_page}
              currentPage={page}
              onClick={() => onChangePage(_page)}
            />
          ))}
        </div>
        {/* 次へボタン */}
        {page < totalPages && <GrayButton label="次へ" onClick={onNextPage} />}
      </div>
    </div>
  );
};
