import React from "react";
import Image from "next/image";
import PreviewButton from "./components/PreviewButton";

const singleNote = async ({ params }: { params: { noteId: string } }) => {
  let note = null;
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/notes/${params.noteId}`
    );
    if (!response.ok) {
      throw new Error("Error while fetching note.");
    }
    const { data } = await response.json();
    note = data;
  } catch (error) {
    throw new Error("Error fetching", error.message);
  }
  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg overflow-hidden mb-4 flex items-center justify-center">
              <Image
                src={note?.file}
                alt={note?.subtitle}
                width={800}
                height={460}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="flex justify-center mb-4">
              <PreviewButton fileLink={note?.file} />
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {note?.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4"></p>

            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                {note?.subtitle}
              </span>
            </div>
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Note Description:
              </span>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                {note?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default singleNote;
