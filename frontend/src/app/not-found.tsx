import GenericPage from "@/components/GenericPage";
import React from "react";

function NotFoundPage() {
  const description = `It looks like the page you’re looking for doesn’t exist or might
                have moved. Don’t worry, though – you can navigate back to Home
                page. Sorry for the inconvenience!`;

  const title = `Oops! Page Not Found`;

  const imgPath = "assets/images/green-404-concept.jpg";
  return <GenericPage imgPath={imgPath} title={title} desc={description} />;
}

export default NotFoundPage;
