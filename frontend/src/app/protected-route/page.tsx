import GenericPage from "@/components/GenericPage";
import React from "react";

function page() {
  const description = `It looks like you donot have access to the page you’re looking for. Don’t worry, though – you can navigate back to Home
                page. Sorry for the inconvenience!`;
  const title = `Oops! Access Denied`;
  const imgPath = "assets/images/green-NoAccess-concept.jpg";

  return <GenericPage imgPath={imgPath} title={title} desc={description} />;
}

export default page;
