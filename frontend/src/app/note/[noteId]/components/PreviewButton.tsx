"use client";

const PreviewButton = ({ fileLink }: { fileLink: string }) => {
  const handlePreview = () => {
    window.open(fileLink, "_blank");
  };
  return (
    <button
      onClick={handlePreview}
      className="bg-gray-900 dark:bg-gray-600 text-white py-2 px-8 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
    >
      Preview
    </button>
  );
};

export default PreviewButton;
