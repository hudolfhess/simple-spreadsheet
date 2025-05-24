import "react";

export default function Loading() {
  return (
    <div className="text-center mt-30">
      <p className="text-xl mb-10 text-blue-300">Loading...</p>
      <span className="loading loading-spinner loading-xl text-blue-300"></span>
    </div>
  );
}
