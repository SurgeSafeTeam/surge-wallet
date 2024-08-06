// Toast.tsx
import React from 'react';
import { Toast as ToastType } from './toastTypes';

const Toast: React.FC<ToastType> = ({ type, message }) => {
  let className = 'alert ';
  switch (type) {
    case 'info':
      className += 'alert-info';
      break;
    case 'success':
      className += 'alert-success';
      break;
    case 'warn':
      className += 'alert-warning';
      break;
    case 'error':
      className += 'alert-error';
      break;
    default:
      className += 'alert-info';
  }

  return (
    <div className={className}>
      <span>{message}</span>
    </div>
  );
};

export default Toast;
