import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function AlertMessage({variant='success',header,content}) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant={variant} onClose={() => setShow(false)} dismissible>
        {/* <Alert.Heading>{header}</Alert.Heading> */}
        
          {content}
      </Alert>
    );
  }
  return null
}

export default AlertMessage;