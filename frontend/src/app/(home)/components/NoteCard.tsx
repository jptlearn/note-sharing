"use client";
import { Note } from "@/types";
import Image from "next/image";
import React from "react";

const NoteCard = ({ notes }: { notes: Note[] }) => {
  return (
    <div className="grid grid-cols-1 gap-8 p-8 bg-gray-100 min-h-screen">
      {notes.map((note) => {
        return (
          <div
            className="bg-white rounded-lg shadow-lg overflow-hidden max-w-lg w-full mx-auto"
            key={note._id}
          >
            {/* <Image src={note.file} alt={note.title} width={400} height={200} /> */}
            <div className="relative w-full aspect-video flex justify-center items-center">
              <Image
                src={note.file}
                alt={note.title}
                width={400}
                height={200}
                className="object-contain"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {note.title}
              </h2>
              <p className="text-gray-700 leading-tight mb-4">
                {note.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-gray-800 font-semibold">Birendra</span>
                </div>
                <span className="text-gray-600"></span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NoteCard;
