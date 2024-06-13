import { useState } from "react";
import { motion } from "framer-motion";
import Button from "./shared/Button";

function Disclaimer() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const handleClose = () => {
    setShowDisclaimer(false);
  };

  return (
    <>
      {showDisclaimer && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="backdrop-blur-sm fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-[9999]"
        >
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
            <p className="mb-4 text-lg">
              This project was made only for educational purposes.
            </p>
            <Button
              onButtonClick={handleClose}
              bgColor={"bg-primary"}
              textColor={"text-white"}
              rounded={"rounded-2xl"}
            >
              Close
            </Button>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default Disclaimer;
