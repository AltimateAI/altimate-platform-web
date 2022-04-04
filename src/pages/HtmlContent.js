import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { get_html_table } from "../auth/actions/userAction";
const HtmlContent = () => {  
  const [searchParams, setSearchParams] = useSearchParams();
  const public_id = searchParams.get("content");
  const [table, setTable] = useState(false)

  useEffect(() => {
    get_html_table(public_id, setTable)
  }, [get_html_table, public_id, setTable]);

  return (
    <>
      {table && (
        <div dangerouslySetInnerHTML={{__html: table}} />
      )}
    </>
  );
};

export default HtmlContent;