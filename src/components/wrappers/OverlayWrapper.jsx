const OverlayWrapper = ({ children, isStarted }) => {
  return (
    <>
      {isStarted && (
        <div className="fixed inset-0 z-50 bg-transparent pointer-events-auto cursor-not-allowed" />
      )}
      <div
        className={isStarted ? "pointer-events-none" : "pointer-events-auto"}
      >
        {children}
      </div>
    </>
  );
};

export default OverlayWrapper;
