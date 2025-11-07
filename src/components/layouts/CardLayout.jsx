import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import SummaryDialog from "@/components/common/drop-down-comps/SummaryDialog";
import CustomActionsMenu from "@/components/common/drop-down-comps/ReportActionMenu";

const CardLayout = ({
  report_title,
  report_type,
  report_description,
  is_summarized,
  file_urls,
  summary,
  error,
  id,
}) => {
  return (
    <>
      <Card className="w-full lg:max-w-full 2xl:max-w-full flex flex-col justify-between">
        <CardHeader className="pb-3 px-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 space-y-1">
              <CardTitle className="xl:text-lg md:text-base text-lg leading-tight">
                {report_title}
              </CardTitle>
              {report_description && (
                <CardDescription className="text-sm line-clamp-2">
                  {report_description}
                </CardDescription>
              )}
            </div>
            <CustomActionsMenu
              id={id}
              report_title={report_title}
              report_type={report_type}
              report_description={report_description}
            />
          </div>
        </CardHeader>

        <CardContent className="px-4">
          <div className="flex items-center justify-between py-2 border-t">
            <span className="text-sm text-muted-foreground">Report Type</span>
            <span className="text-sm font-medium capitalize">
              {report_type?.replace("_", " ") || "N/A"}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-t">
            <span className="text-sm text-muted-foreground">Status</span>
            <span className="text-sm font-medium">
              {is_summarized ? (
                <span className="inline-flex items-center gap-1.5 text-green-600 dark:text-green-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-500"></span>
                  Summarized
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-amber-600 dark:text-amber-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600 dark:bg-amber-500"></span>
                  Not Summarized
                </span>
              )}
            </span>
          </div>

          {error && (
            <div className="text-sm p-3 rounded-md bg-destructive/10 text-destructive border border-destructive/20">
              {error}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex gap-2 pt-2 flex-wrap px-4">
          {is_summarized && summary && (
            <SummaryDialog
              summary={summary}
              report_title={report_title}
              report_description={report_description}
            />
          )}
          {file_urls?.url ? (
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => window.open(file_urls.url, "_blank")}
            >
              Open File
            </Button>
          ) : (
            <span className="text-base font-medium w-full text-center">
              {file_urls}
            </span>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default CardLayout;
