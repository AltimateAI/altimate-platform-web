import React from 'react';
import { getSdkAccessKey } from '../auth/actions/userAction';
import { StyledTitle, StyledButton, ButtonGroup, StyledSubTitle } from '../components/Styles';
import { useState, useEffect } from 'react';
import { colors } from '../components/Styles';
import { generateSdkAccessKey } from '../auth/actions/userAction';
import { FaKey } from 'react-icons/fa';
import { Formik, Form } from 'formik';
import { TextInput } from '../components/FormLib';

const Settings = () => {
  const [access_key, setaccess_key] = useState(false);

  useEffect(() => {
    getSdkAccessKey(setaccess_key);
  }, [getSdkAccessKey, setaccess_key]);

  return (
    <div>
      {!access_key && (
          <StyledTitle color={colors.light1} size={20}>
            <StyledSubTitle>
                You don't have an SDK access key !
            </StyledSubTitle>              
              Generate a new one to use Altimate ai library
              <ButtonGroup>
                <StyledButton to="#" onClick={() => generateSdkAccessKey(setaccess_key)}>Generate Key</StyledButton>
              </ButtonGroup>
          </StyledTitle>
      )}
      {access_key && (
          <Formik
          initialValues={{
              access_key: access_key
          }}          
          >
            <Form>
              <TextInput
                name="access_key"
                type="text"
                label="SDK Access Key"
                size="400"
                readOnly="true"
                color={colors.dark3}
                icon={<FaKey/>}
              />            
            </Form>
      </Formik>
      )}
   </div>
  )
}

export default Settings;
