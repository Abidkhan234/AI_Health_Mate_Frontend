import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useUIContext from "../../../contexts/UIContext";

const ReportHistoryPagination = ({ paginationData, isLoading }) => {
  const { setPage } = useUIContext();

  if (isLoading || !paginationData) return null;

  const { currentPage, totalPages } = paginationData;

  const handlePageChange = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      setPage(page);
    }
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <Pagination className="justify-end mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            aria-disabled={currentPage === 1}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {pages.length > 7 ? (
          <>
            <PaginationItem>
              <PaginationLink
                isActive={currentPage === 1}
                onClick={() => handlePageChange(1)}
              >
                1
              </PaginationLink>
            </PaginationItem>

            {currentPage > 3 && <PaginationEllipsis />}

            {pages
              .filter(
                (p) =>
                  p >= currentPage - 1 &&
                  p <= currentPage + 1 &&
                  p !== 1 &&
                  p !== totalPages
              )
              .map((pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    isActive={pageNum === currentPage}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ))}

            {currentPage < totalPages - 2 && <PaginationEllipsis />}

            <PaginationItem>
              <PaginationLink
                
                isActive={currentPage === totalPages}
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        ) : (
          pages.map((pageNum) => (
            <PaginationItem key={pageNum}>
              <PaginationLink
                
                isActive={pageNum === currentPage}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          ))
        )}

        <PaginationItem>
          <PaginationNext
            
            onClick={() => handlePageChange(currentPage + 1)}
            aria-disabled={currentPage === totalPages}
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ReportHistoryPagination;
