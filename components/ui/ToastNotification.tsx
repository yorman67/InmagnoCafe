"use client"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"

export default function toast() {
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    )
}