import { motion } from "framer-motion";
import React from "react";

export default function FormWrapper({ img, title, subtitle, formComponent }) {
  return (
    <div className="form-section rounded-2xl overflow-hidden shadow">
      <div className="grid lg:grid-cols-2">
        <div className="img-wrapper flex items-center justify-center bg-teal-400/30">
          <motion.img
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            src={img}
            alt=""
            className="h-2/4"
          />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="form-wrapper p-8 lg:p-10 text-center bg-white flex flex-col items-center justify-center"
        >
          <h1 className="text-2xl lg:text-4xl text-teal-600 font-semibold">
            {title}
          </h1>
          <p className="mt-5 text-slate-900 text-lg">{subtitle}</p>
          {formComponent}
        </motion.div>
      </div>
    </div>
  );
}
