import Link from "next/link";
import NewProjectForm from "./NewProjectForm";

export default function NewProjectPage() {
  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>New Project</h1>
        <Link href="/admin/projects">Back</Link>
      </div>

      <NewProjectForm />
    </section>
  );
}
