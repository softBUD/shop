import axios from "axios";
import React from "react";
import { UPLOAD_PRODUCT } from "./types";

export function uploadProduct(dataToSubmit) {
    const request = axios.post('/api/product/upload',dataToSubmit) //데이터저장
    .then(response => response.data)
    return {
        type:UPLOAD_PRODUCT,
        payload: request
    }
}