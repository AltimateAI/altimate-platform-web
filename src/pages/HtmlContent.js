import { Form, Formik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { add_comment, get_html_table } from "../auth/actions/userAction";
import { TextInput } from "../components/FormLib";
import * as Yup from 'yup'
import { ButtonGroup, colors, StyledFormButton, StyledContainer, StyledHtmlContent, StyledSubTitle, StyledTitle, StyledCommentBox } from "../components/Styles";
const HtmlContent = () => {  
  const [searchParams, setSearchParams] = useSearchParams();
  const public_id = searchParams.get("content");
  const [table, setTable] = useState(false)
  const [html_id, setHtml_id] = useState(false)
  const [comments, setComments] = useState(false)

  useEffect(() => {
    get_html_table(public_id, setTable, setHtml_id, setComments)
  }, [get_html_table, public_id, setTable, setHtml_id, setComments]);

  return (
    <div>
      {table && (
        <StyledHtmlContent dangerouslySetInnerHTML={{__html: table}} />
      )}
      {table && comments && html_id && (
        <>
          <StyledTitle align="left">
            Comments :
          </StyledTitle>
        {comments.map((comment) => (
          <>
          <StyledCommentBox>
            <StyledTitle size={10} color={colors.dark1}>
              Raouf Ghrissi - {moment(comment.creation_date).format("MMM Do YY")}
            </StyledTitle>
            <StyledSubTitle size={12} color={colors.dark2}>
              {comment.text}
            </StyledSubTitle>
          </StyledCommentBox>
          </>
        ))}
                <Formik
                    initialValues={{
                        html_id: html_id,
                        text: "",
                    }}
                    validationSchema={
                        Yup.object({
                          text: Yup.string()
                                .required("Comment required")
                        })
                    }
                    onSubmit={(values, {}) => {
                        add_comment(values, setComments);
                    }}
                >
                        <Form>
                            <TextInput
                                name="text"
                                type="textarea"
                                label="comment"
                            />
                            <ButtonGroup>                                
                                <StyledFormButton type="submit">
                                    Post
                                </StyledFormButton>
                            </ButtonGroup>
                        </Form>
                </Formik>
          </>
      )}
    </div>
  );
};

export default HtmlContent;