import { React } from 'react';
import Toast from 'react-bootstrap/Toast';
import '../toastNotification/toastNotification.css';

/*
 * ToastNotification displays a react-bootstrap notification.
 * Props:
 * - show: boolean ( determines if the toast should be displayed or not )
 * - toggleShow: function
 * - title: String
 * - message: String
 */
function ToastNotification( props ) {
  return (
    <>
      <Toast show={ props.show } onClose={ props.toggleShow } animation={ false }
        style={ {
          position: 'absolute',
          bottom: 0,
          right: 0
        } }
      >
        <Toast.Header>
          <strong className="mr-auto"> { props.title } </strong>
        </Toast.Header>
        <Toast.Body> { props.message }</Toast.Body>
      </Toast>
    </>
  );
}

export default ToastNotification;