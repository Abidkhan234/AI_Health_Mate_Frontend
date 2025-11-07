import CardLayout from "@/components/layouts/CardLayout";
import { useQuery } from "@tanstack/react-query";
import { handleReportFetch } from "../../../../apis/reportApi";
import { useEffect } from "react";
import useUIContext from "../../../../contexts/UIContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import CardSkeleton from "@/components/cards/CardSkeleton";
import FilterMenu from "@/components/common/FilterMenu";
import ReportHistoryPagination from "@/components/common/ReportHistoryPagination";

const ReportHistoryPage = () => {
  const { setUserData, sort, page } = useUIContext();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["report_history", sort, page],
    queryFn: (sort, page) => handleReportFetch(sort, page),
  });

  useEffect(() => {
    if (isError) {
      if (error.status == 401) {
        navigate("/");
        toast.error(error.message);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUserData(null);
      }
    }
  }, [isError]);

  return (
    <section className="w-full h-full">
      <>
        <FilterMenu />
      </>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-5 gap-3">
        {isLoading ? (
          <>
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <div className="" key={i}>
                <CardSkeleton key={i} />
              </div>
            ))}
          </>
        ) : (
          <>
            {data?.reports?.map((item, i) => (
              <CardLayout
                key={i}
                report_title={item.report_title}
                report_type={item.report_type}
                report_description={
                  item?.report_description || "No description provided"
                }
                is_summarized={item.is_summarized}
                file_urls={
                  item.file_urls?.url ? item?.file_urls : "No file provided"
                }
                summary={item.summary}
                error={item?.error ? item?.error : null}
                id={item.id}
              />
            ))}
          </>
        )}
      </div>
      {data?.reports?.length < 1 ? (
        <div className="w-full flex justify-center items-center">
          <h2 className="text-4xl font-bold text-center">No Reports Found</h2>
        </div>
      ) : (
        <>
          {data?.pagination?.totalPages > 1 && (
            <ReportHistoryPagination
              paginationData={data?.pagination}
              isLoading={isLoading}
            />
          )}
        </>
      )}
    </section>
  );
};

export default ReportHistoryPage;
