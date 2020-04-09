import React, { Component } from 'react';
 import { usePromiseTracker } from "react-promise-tracker";
 
export const LoadingSpinerComponent = (props) => {
 const { promiseInProgress } = usePromiseTracker();
 
  return (
    promiseInProgress && (
      <div className="spinner">
        <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
      </div>
    )
  )
};