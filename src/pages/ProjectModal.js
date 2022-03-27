import React, { Component, useState } from "react";
import { get_project, update_project, add_project } from "../auth/actions/userAction";
import { StyledFormButton, StyledFormAread,
    StyledTitle, colors,
    ButtonGroup
} from "../components/Styles";
import * as Yup from 'yup'

import {Formik, Form} from 'formik'
import { TextInput } from "../components/FormLib";
import { FiFolder, FiFileText } from 'react-icons/fi';
import { ThreeDots } from 'react-loader-spinner';

const ProjectModal = ({ closeModal, id, project, setErrorMessage }) => {
  const [name, setName] = useState(project?.name != null ? project.name : "");
  const [description, setDescription] = useState(project?.description != null ? project.description : "");
  const [submitting, setSubmitting] = useState(false);

  return (
        <>
            <StyledFormAread>
            {id && (
                <StyledTitle color={colors.dark1} size={30}>
                    Update Project
                </StyledTitle>
            )}
            {!id && (
                <StyledTitle color={colors.dark1} size={30}>
                    Add Project
                </StyledTitle>
            )}
                <Formik
                    initialValues={{
                        name: name,
                        description: description,
                    }}
                    validationSchema={
                        Yup.object({
                            name: Yup.string()
                                .required("Name required")
                        })
                    }
                    onSubmit={(values, {setSubmitting, setFieldError}) => {
                        if (id){
                            update_project(id, values, setSubmitting, setFieldError, closeModal);
                        } else {
                            add_project(values, setSubmitting, setFieldError, closeModal)
                        }
                    }}
                >
                    {( {isSubmitting} ) => (
                        <Form>
                            <TextInput
                                name="name"
                                type="text"
                                label="Project Name"
                                icon={<FiFolder/>}
                            />
                            <TextInput
                                name="description"
                                type="text"
                                label="Description"
                                icon={<FiFileText/>}
                            />
                            <ButtonGroup>
                                {!isSubmitting && id && (
                                        <StyledFormButton type="submit">
                                            Update Project
                                        </StyledFormButton>
                                    ) 
                                }

                                {!isSubmitting && !id && (
                                        <StyledFormButton type="submit">
                                            Add Project
                                        </StyledFormButton>
                                    ) 
                                }

                                {isSubmitting && (
                                        <ThreeDots
                                            color={colors.dark2}
                                            height={49}
                                            width={100}
                                        />
                                    )
                                }
                            </ButtonGroup>
                        </Form>
                    )}
                </Formik>                
            </StyledFormAread>
        </>
    );
};

export default ProjectModal;