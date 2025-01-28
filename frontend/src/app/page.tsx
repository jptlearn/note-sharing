import NoteCard from "./(home)/components/NoteCard";

export default async function Home() {
  const response = await fetch(`${process.env.BACKEND_URL}/notes`);
  if (!response.ok) {
    throw new Error("Error occur while fetching.");
  }
  const { data: notes } = await response.json();
  console.log(notes);

  return <NoteCard notes={notes} />;
}
