import React, { useEffect, useState } from "react";
import moment from "moment";
import { StyledTable, StyledButton, ButtonGroup, TH, TD } from "../components/Styles";
import { ThreeDots } from "react-loader-spinner";
import { get_notebooks } from "../auth/actions/userAction";

const Template = () => {
  const [loaded, setLoaded] = useState(false);
  const [notebooks, setNotebooks] = useState(null);

  const getNotebooks = async () => {
    get_notebooks(setNotebooks, setLoaded);
  };

  useEffect(() => {
    getNotebooks();
  }, []);

  return (
    <>
      {loaded && notebooks && (
        <StyledTable>
          <thead>
            <tr>
              <TH>Name</TH>
              <TH>Creation date</TH>
              <TH>Description</TH>
              <TH>Actions</TH>
            </tr>
          </thead>
          <tbody>
            {notebooks.map((notebook) => (
              <tr key={notebook.id}>
                <TD>{notebook.name}</TD>
                <TD>{moment(notebook.creation_date).format("MMM Do YY")}</TD>
                <TD>{notebook.description}</TD>
                <TD>
                  <ButtonGroup>
                    <StyledButton
                      to="#"
                      backgroundcolor="orange"
                      width={150}
                    >
                      Open in colab
                    </StyledButton>
                    <StyledButton
                      to="#"
                      backgroundcolor="blue"
                      width={150}
                    >
                      Download
                    </StyledButton>
                  </ButtonGroup>                  
                </TD>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      )} 
      {!loaded && (
        <ThreeDots
          color="white"
          height={49}
          width={100}
        />
      )}
    </>
  );
};

export default Template;