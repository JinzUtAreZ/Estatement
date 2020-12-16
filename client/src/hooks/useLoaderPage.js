import React, { useState } from "react";
import FullPageLoader from "../components/Loading/LoaderPage";

const useLoaderPage = () => {
  const [loading, setLoading] = useState(false);

  return [
    loading ? <FullPageLoader /> : null,
    () => setLoading(true), //Show loader
    () => setLoading(false), //Hide Loader
  ];
};

export default useLoaderPage;
